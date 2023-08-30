import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import UpdateItem from "../UpdateItem";
import { useDispatch } from "react-redux";
import { fetchError, fetchStart, fetchSuccess, showMessage } from "../../../redux/actions";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import AppConfirmDialog from "../../../@crema/core/AppConfirmDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDateTime, getRandomColor } from "../../../shared/Helper";
import Chip from '@mui/material/Chip';
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import CsDataTable from "../../../components/CsDataTable";
import ItemDetails from "../ItemDetails";
import CourtCaseService from "../../../services/CourtCaseService";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import AppGridContainer from "../../../@crema/core/AppGridContainer";
import { Button, Grid } from "@mui/material";
import AppDateFiled from "../../../@crema/core/AppFormComponents/AppDateFiled";
import { Form, Formik } from 'formik';
import CaseTypeService from '../../../services/CaseTypeService';



const useStyles = makeStyles(theme => ({
  emailLink: props => {
    return {
      // fontWeight: 'bold',
      textDecoration: 'none',
      color: theme['palette'].primary.main,
    };
  },
  hoverPointer: props => {
    return {
      cursor: 'pointer',
    }
  }
}));

const ListItems = ({ refresh = 0, caseTypesList, showDateFilterValue }) => {
  console.log(caseTypesList, 'ddddddd', refresh)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [refreshGrid, setRefreshGrid] = useState(refresh);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [item, setItem] = useState({});
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [suspendDialog, setSuspendDialog] = useState(false);
  const [activateDialog, setActivateDialog] = useState(false);
  const [updateItemModal, setUpdateItemModal] = useState(false);
  const [itemInfoModal, setItemInfoModal] = useState(false);

  const { messages } = useIntl();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [typeId, setTypeId] = useState('');


  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const open = Boolean(menuAnchorEl);
  const handleActionMenuClick = (event, str) => {
    setMenuAnchorEl(event.currentTarget);
    setItem(JSON.parse(str));
  };

  const handleEditItemModal = (reload = false) => {
    if (reload) {
      handleRefreshGrid();
    }
    setUpdateItemModal(!updateItemModal);
  }
  const handleItemInfoModal = () => {
    setItemInfoModal(!itemInfoModal);
  }
  const handleRefreshGrid = () => {
    setRefreshGrid(refreshGrid + 1);
  }
  const deleteItem = () => {
    dispatch(fetchStart());
    CourtCaseService.deleteItem(item['uuid']).then(response => {
      handleRefreshGrid();
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      setDeleteDialog(false);
      setItem({});
    }).catch(error => {
      dispatch(fetchError(error));
    });
  }
  /**
   * Fetch items list
   */
  const listItems = (props) => {
    console.log("on way", props);
    let _pageNo = pageNo;
    let sortBy = 'id';
    let sortOrder = 'asc';

    const { skip, limit, sortInfo, filterValue } = props;
    if (sortInfo) {
      sortBy = sortInfo.name;
      sortOrder = sortInfo.sort == '1' ? 'asc' : 'desc';
    }
    if (skip) {
      _pageNo = Math.ceil(skip / limit) + 1;
      setPageNo(pageNo);
    }
    if (limit) {
      setPageSize(limit);
    }
    const reqData = {
      // page_no: _pageNo,// + 1,
      page: _pageNo,// + 1,
      page_size: limit,
      sort_by: sortBy,
      case_type_id: 2,
      sort_order: sortOrder,
      searchQuery: filterValue,
      searchFilters: { "rules": filterValue },
      // searchQuery: JSON.stringify(filterValue),
      // searchFilters: JSON.stringify({"rules": filterValue}),
    }
    setLoading(true);
    if (caseTypesList.length != 0) {
      let data = caseTypesList;
      let count = caseTypesList.length;
      console.log("my log", data, count);
      return { data, count };
    } else {

      return CourtCaseService.listItem(reqData).then(response => {
        setLoading(false);
        let data = [];
        let count = 0;
        if (response.data && response.data.data) {
          //setData(response.data.items);
          data = response.data.data;
          count = response.data.total;
        }
        console.log(count, "sssssssssssssssssssssssssssssssss", data,);
        return { data, count };
      }).catch((error) => {
        setLoading(false);
        return { data: [], count: 0 }
      });
    }
  }

  const getUserAvatar = (user) => {
    if (user.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };
  const redirectToStage = () => {
    navigate(`/case-stages-motor/${item.uuid}`, { state: { message: "Failed to submit form" } }); // Pass optional second argument
  }

  const fetchSearchTypeList = () => {
    CaseTypeService.searchListItem({
      // page: 0,
      // page_no: 0,
      // page_size: 100,
      startDate: new Date(startDate).toISOString().split('T')[0],
      endDate: new Date(endDate).toISOString().split('T')[0],
      case_type_id: 2
    }).then(response => {
      const data = response?.data?.data || [];
      setCaseTypesList(data);
    }).catch(error => {
      setCaseTypesList([]);
    });
  }

  const columns = [

    {
      name: 'title',
      header: 'Title',
      defaultFlex: 1,
      enableColumnFilterContextMenu: false,
    },


    {
      name: 'full_name',
      header: 'Users',
      defaultFlex: 1,
      enableColumnFilterContextMenu: false,
    },

    {
      name: 'status_name',
      header: 'Status',
      defaultFlex: 1,
      enableColumnFilterContextMenu: false,
    },


    {
      name: 'court_name',
      header: 'Court Name',
      defaultFlex: 1,
      enableColumnFilterContextMenu: false,
    },

    {
      name: 'formatted_case_number',
      header: 'Case Number',
      defaultFlex: 1,
      enableColumnFilterContextMenu: false,
    },

    {
      name: 'company_advocate',
      header: 'Company Advocate',
      defaultFlex: 1,
      enableColumnFilterContextMenu: false,
    },
    {
      name: 'thana',
      header: 'Thana',
      defaultFlex: 1,
      enableColumnFilterContextMenu: false,
    },
    // {
    //   name: 'death',
    //   header: 'Death',
    //   defaultFlex: 1,
    //   filterEditor: DateFilter,
    //   filterEditorProps: {
    //     dateFormat: 'MM-DD-YYYY',
    //   },
    // render: ({value}) => formatDateTime(value)
    // },
    // {
    //   name: 'injury',
    //   header: 'Injury',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'company',
    //   header: 'Company',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'vehicle_number',
    //   header: 'Vehicle Number',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'fir_number',
    //   header: 'Fir Number',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },

    // {
    //   name: 'fir_delay',
    //   header: 'Fir Delay',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },

    // {
    //   name: 'cnr',
    //   header: 'CNR',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'filling_number',
    //   header: 'Filling Number',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'macc_number',
    //   header: 'MACC Number',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },

    // {
    //   name: 'date_of_filling',
    //   header: 'Date Of Filling',
    //   defaultFlex: 1,
    //   defaultFlex: 1,
    //   filterEditor: DateFilter,
    //   filterEditorProps: {
    //     dateFormat: 'MM-DD-YYYY',
    //   },
    // },
    // {
    //   name: 'next_date',
    //   header: 'Next Date',
    //   defaultFlex: 1,
    //   defaultFlex: 1,
    //   filterEditor: DateFilter,
    //   filterEditorProps: {
    //     dateFormat: 'MM-DD-YYYY',
    //   },
    // },
    // {
    //   name: 'case_stage',
    //   header: 'Case Stage',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },

    // {
    //   name: 'challan',
    //   header: 'Challan',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'remark',
    //   header: 'Remark',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'company_file_number',
    //   header: 'Company File Number',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'investigation',
    //   header: 'Investigation',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //   name: 'office_file_number',
    //   header: 'Office File Number',
    //   defaultFlex: 1,
    //   enableColumnFilterContextMenu: false,
    // },
    // {
    //     name: 'insurance_company',
    //     header: 'Insurance Company',
    //      defaultFlex: 1,
    //      enableColumnFilterContextMenu: false,
    //    },

    //    {
    //     name: 'vehicle_owner',
    //     header: 'Vehicle Owner',
    //      defaultFlex: 1,
    //      enableColumnFilterContextMenu: false,
    //    },
    //    {
    //     name: 'vehicle_driver',
    //     header: 'Vehicle Drive',
    //      defaultFlex: 1,
    //      enableColumnFilterContextMenu: false,
    //    },

    //    {
    //     name: 'date_of_disposal',
    //     header: 'Date Of Disposal',
    //      defaultFlex: 1,
    // filterEditor: DateFilter,
    // filterEditorProps: {
    //   dateFormat: 'MM-DD-YYYY',
    // },
    //    },
    {
      name: 'formatted_created_at',
      header: 'Created At',
      defaultFlex: 1,
      filterEditor: DateFilter,
      filterEditorProps: {
        dateFormat: 'MM-DD-YYYY',
      },
      // render: ({value}) => formatDateTime(value)
    },
    {
      name: 'uuid',
      header: 'Action',
      defaultFlex: 1,
      render: ({ data: item, rowIndex, value }) => {
        //const { data: item, rowIndex, value } = args;
        return <div key={`action-btn-${rowIndex}`}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls="long-menu"
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={(e) => handleActionMenuClick(e, JSON.stringify(item))}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={menuAnchorEl}
            open={open}
            onClose={() => setMenuAnchorEl(null)}
          >
            <MenuItem onClick={() => {
              setUpdateItemModal(true);
              setMenuAnchorEl(null)
            }}>
              <EditIcon /> Edit
            </MenuItem>
            {/*<MenuItem onClick={() => {*/}
            {/*  setItemInfoModal(true);*/}
            {/*  setMenuAnchorEl(null)*/}
            {/*}}>*/}
            {/*  <VisibilityIcon/> View Details*/}
            {/*</MenuItem>*/}
            <MenuItem onClick={() => {
              setMenuAnchorEl(null)
              redirectToStage();
            }}>
              <VisibilityIcon /> View Stages
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDeleteDialog(true);
                setMenuAnchorEl(null)
              }}
            >
              <DeleteIcon /> Delete
            </MenuItem>
          </Menu>
        </div>

      }
    },
  ];
  const filterValue = [
    { name: 'status_name', operator: 'startsWith', type: 'string', value: '' },
    { name: 'full_name', operator: 'startsWith', type: 'string', value: '' },
    { name: 'court_name', operator: 'startsWith', type: 'string', value: '' },
    { name: 'company_advocate', operator: 'startsWith', type: 'string', value: '' },
    { name: 'thana', operator: 'startsWith', type: 'string', value: '' },
    { name: 'title', operator: 'startsWith', type: 'string', value: '' },
    { name: 'formatted_case_number', operator: 'startsWith', type: 'string', value: '' },

  ];
  const dataSource = useCallback(listItems, [refresh]);

  console.log("refreshrefreshrefresh", refresh);
  useEffect(() => {
    handleRefreshGrid();
  }, [refresh]);


  return (<>

    <CsDataTable
      columns={columns}
      pagination={true}
      defaultLoading={true}
      loading={loading}
      dataSource={showDateFilterValue == true ? caseTypesList : dataSource}
      pageNo={pageNo}
      pageSize={pageSize}
      defaultFilterValue={filterValue}
      refresh={refreshGrid}
      rowSelection={{
        showCheckbox: false,
        selectBy: {
          isSelectedKey: 'isSelected'
        }
      }}
    />
    <AppConfirmDialog
      dialogTitle={<IntlMessages id="common.delete.confirmHeading" />}
      title={<IntlMessages id="common.delete.confirmMessage" />}
      open={deleteDialog}
      onDeny={() => {
        setItem({});
        setDeleteDialog(false);
      }}
      onConfirm={deleteItem}
    />,
    <AppConfirmDialog
      dialogTitle={<IntlMessages id="common.delete.confirmHeading" />}
      title='Once suspended use can no longer access system.'
      open={suspendDialog}
      onDeny={() => {
        setItem({});
        setSuspendDialog(false);
      }}
      onConfirm={() => changeUserStatus('inactive')}
    />
    <AppConfirmDialog
      dialogTitle={<IntlMessages id="common.delete.confirmHeading" />}
      title='Once you activate user will be able to use system.'
      open={activateDialog}
      onDeny={() => {
        setItem({});
        setActivateDialog(false);
      }}
      onConfirm={() => changeUserStatus('active')}
    />
    <UpdateItem values={item} isOpen={updateItemModal} handleOpen={handleEditItemModal} />
    <ItemDetails values={item} isOpen={itemInfoModal} handleOpen={handleItemInfoModal} />
  </>);
}
export default ListItems;
