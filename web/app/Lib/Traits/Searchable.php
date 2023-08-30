<?php

namespace App\Lib\Traits;

use App\Models\Status;
use DB;
use Illuminate\Database\Eloquent\Builder;

trait Searchable
{
    /**
     * @param Builder $query
     * @param $data
     * @param string $table
     * @param array $columnMap
     * @return array
     */
    private function getData(Builder $query, $data, $table = '', $columnMap=[], $toArray = true)
    {

        $pageSize = isset($data['pageSize']) ? $data['pageSize'] : 10;
        $sortBy = isset($data['sortBy']) ? $data['sortBy'] : 'id';
        $sortOrder = isset($data['sortOrder']) ? $data['sortOrder'] : 'desc';

        if($sortBy == 'id') {
            $sortBy = $table .'.'.$sortBy;
        }

        //add sort logic
        $query->orderBy($sortBy, $sortOrder);

        if (isset($data['searchFilters']) && isset($data['searchFilters']['combinator']) && isset($data['searchFilters']['rules']) && !empty($data['searchFilters']['rules'])) {
            $this->addCriteria($query, $data, $table, $columnMap);
        }
        $records = $query->paginate($pageSize);

//        echo $query->toSql();die;
        //$result = $query->get();
        // dd($result->toArray());
        if ($records && $toArray) {
            return $records->toArray();
        }
        if ($records) {
            return $records;
        }
        return [];
    }

    /**
     * @param $query
     * @param $data
     * @param $table
     * @param $columnMap
     */
    private function addCriteria($query, $data, $table, $columnMap)
    {
        $self = $this;
        $query->where(function ($query) use ($data, $self, $table, $columnMap) {
            $searchFilters = $data['searchFilters'];
            $rules = $searchFilters['rules'];
            $andOr = $searchFilters['combinator'];
            $first = TRUE;
            foreach ($rules as $rule) {
                if (!array_key_exists($rule['name'], $columnMap) || empty($rule['value'])) {
                    continue;
                }
                list($where, $column, $operator, $value) = $self->formatCondition($rule, $andOr, $first, $table, $columnMap);

                if (empty($column)) {
                    continue;
                }
                if (stripos($where, 'wherein') !== FALSE) {
                    $query->$where($column, $value);
                } elseif (($operator == "=" || $operator == "eq") && $where == 'orWhere') {
                    $query->orWhereRaw("`$column` = '" . strtoupper($value) . "'");
                } elseif (($operator == "=" || $operator == "eq") && $where == 'where') {
                    $query->whereRaw("`$column` = '" . strtoupper($value) . "'");
                } else {
                    $query->$where($column, $operator, $value);
                }
                $first = false;
            }
        });
    }

    /**
     * @param $rule
     * @param $andOr
     * @param $first
     * @param $table
     * @param $columnMap
     * @return array
     */
    private function formatCondition($rule, $andOr, $first, $table, $columnMap)
    {
        //$column   = isset($columnMap[$rule['field']]) ? $columnMap[$rule['field']] : $rule['field'];
        $column   = isset($columnMap[$rule['name']]) ? $columnMap[$rule['name']] : $rule['name'];
        $where = $first ? 'where' : (($andOr == 'or') ? 'orWhere' : 'where');
        $operator = $rule['operator'];
        $value = '';
        switch ($operator):
            case 'contains';
                $operator = 'like';
                $value = '%' . trim($rule['value']) . '%';
                break;
            case 'startsWith';
                $value = trim($rule['value']) . '%';
                $operator = 'like';
                break;
            case 'endsWith';
                $value = '%' . trim($rule['value']);
                $operator = 'like';
                break;
            case 'in';
                $value = is_array($rule['value']) ? $rule['value'] : [$rule['value']];
                $where = $first ? 'whereIn' : (($andOr == 'or') ? 'orWhereIn' : 'whereIn');
                break;
            default:
                $value = trim($rule['value']);
                break;
        endswitch;
        if (
            $rule['name'] == 'start_date' ||
            $rule['name'] == 'end_date' ||
            $rule['name'] == 'due_date' ||
            $rule['name'] == 'created_at' ||
            $rule['name'] == 'updated_at'
        ) {
            $column = DB::raw('DATE(' . $column . ')');
        }

        if ($rule['name'] == 'status') {
            $value = strtolower($value);
            $column = DB::getTablePrefix() . $table . '.status_id';
            $value = Status::$statusValList[$value];
        }
        if ($rule['name'] == 'priority' && $value == 'all') {
            $value = '';
            $column = '';
        }
        return [$where, $column, $operator, $value];
    }
}
