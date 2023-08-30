import React, {useCallback, useEffect, useState} from 'react';
import { makeStyles} from "@mui/styles";
import BankService from "../../../services/BankService";
import UpdateItem from "../UpdateItem";
import {useDispatch} from "react-redux";
import {fetchError, fetchStart, fetchSuccess, showMessage} from "../../../redux/actions";
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
import {formatDateTime, getRandomColor} from "../../../shared/Helper";
import Chip from '@mui/material/Chip';
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import CsDataTable from "../../../components/CsDataTable";
import ItemDetails from "../ItemDetails";
import {Stack, Typography, Switch} from "@mui/material";

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

const ListItems = ({refresh = 0}) => {
    const dispatch = useDispatch();
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
    const handleRefreshGrid =()=>{
        setRefreshGrid(refreshGrid+1);
    }
    const deleteItem = () => {
        dispatch(fetchStart());
      BankService.deleteItem(item['uuid']).then(response => {
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
        let _pageNo = pageNo;
        let sortBy= 'id';
        let sortOrder = 'asc';

        const {skip, limit, sortInfo, filterValue} = props;
        if(sortInfo) {
            sortBy = sortInfo.name;
            sortOrder = sortInfo.sort == '1' ? 'asc':'desc';
        }
        if(skip) {
            _pageNo = Math.ceil(skip / limit) + 1;
            setPageNo(pageNo);
        }
        if(limit) {
            setPageSize(limit);
        }
        const reqData = {
            page_no: _pageNo,// + 1,
            page: _pageNo,// + 1,
            page_size: limit,
            sort_by: sortBy,
            sort_order: sortOrder,
            searchQuery: JSON.stringify(filterValue),
            searchFilters: JSON.stringify({"rules": filterValue}),
        }
        setLoading(true);
        return BankService.listItem(reqData).then(response => {
            setLoading(false);
            let data = [];
            let count = 0;
            if (response.data && response.data.data) {
                //setData(response.data.items);
                data=response.data.data;
                count= response.data.total;
            }
            return {data, count};
        }).catch((error) => {
            setLoading(false);
            return {data:[], count: 0}
        });
    }
    const getUserAvatar = (user) => {
        if (user.firstName) {
            return user.firstName.charAt(0).toUpperCase();
        }
        if (user.email) {
            return user.email.charAt(0).toUpperCase();
        }
    };
    const columns = [
        {
            name: 'bank_name',
            header: <b>Bank Name</b>,
            defaultFlex: 1,
            enableColumnFilterContextMenu: false,
        },
        {
            name: 'bank_headquarter',
            header: 'Bank Headquarter',
            defaultFlex: 1,
            enableColumnFilterContextMenu: false,
        },
        {
            name: 'created_at',
            header: 'Updated On',
            defaultFlex: 1,
            filterEditor: DateFilter,
            filterEditorProps: {
                dateFormat: 'MM-DD-YYYY',
            },
            render: ({ value }) => formatDateTime(value)
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
                        onClick={(e)=>handleActionMenuClick(e, JSON.stringify(item))}
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
                        onClose={()=>setMenuAnchorEl(null)}
                    >
                        <MenuItem onClick={()=> {
                            setUpdateItemModal(true);
                            setMenuAnchorEl(null)
                        }} >
                            <EditIcon/> Edit
                        </MenuItem>
                        <MenuItem onClick={()=> {
                            setItemInfoModal(true);
                            setMenuAnchorEl(null)
                        }} >
                            <VisibilityIcon /> View Details
                        </MenuItem>
                        <MenuItem
                            onClick={ () => {
                                setDeleteDialog(true);
                                setMenuAnchorEl(null)
                            }}
                        >
                            <DeleteIcon/> Delete
                        </MenuItem>
                    </Menu>
                </div>
            }
        },
    ];
    const filterValue = [
        { name: 'bank_name', operator: 'startsWith', type: 'string', value: '' },
        { name: 'bank_headquarter', operator: 'startsWith', type: 'string', value: '' },
        // { name: 'status_id', operator: 'eq', type: 'select', value: '' },
    ];
    const dataSource = useCallback(listItems, [refresh]);
    useEffect(()=>{handleRefreshGrid();}, [refresh]);
    return (<>
    <CsDataTable
        columns={columns}
        pagination={true}
        defaultLoading={true}
        loading={loading}
        dataSource={dataSource}
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
        dialogTitle={<IntlMessages id="common.delete.confirmHeading"/>}
        title={<IntlMessages id="common.delete.confirmMessage"/>}
        open={deleteDialog}
        onDeny={() => {
            setItem({});
            setDeleteDialog(false);
        }}
        onConfirm={deleteItem}
    />,
        <AppConfirmDialog
            dialogTitle={<IntlMessages id="common.delete.confirmHeading"/>}
            title='Once suspended use can no longer access system.'
            open={suspendDialog}
            onDeny={() => {
                setItem({});
                setSuspendDialog(false);
            }}
            onConfirm={()=>changeUserStatus('inactive')}
        />
    <AppConfirmDialog
        dialogTitle={<IntlMessages id="common.delete.confirmHeading"/>}
        title='Once you activate user will be able to use system.'
        open={activateDialog}
        onDeny={() => {
            setItem({});
            setActivateDialog(false);
        }}
        onConfirm={()=>changeUserStatus('active')}
    />
    <UpdateItem values={item} isOpen={updateItemModal} handleOpen={handleEditItemModal} />
    <ItemDetails values={item} isOpen={itemInfoModal} handleOpen={handleItemInfoModal}/>
    </>);
}
export default ListItems;
