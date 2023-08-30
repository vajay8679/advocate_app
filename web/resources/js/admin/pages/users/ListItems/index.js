import React, {useCallback, useEffect, useState} from 'react';
import { makeStyles} from "@mui/styles";
import UserService from "../../../services/UserService";
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

const ListItems = ({refresh = 0, roleList}) => {
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
        UserService.deleteItem(item['uuid']).then(response => {
            handleRefreshGrid();
            dispatch(fetchSuccess());
            dispatch(showMessage(response.message));
            setDeleteDialog(false);
            setItem({});
        }).catch(error => {
            dispatch(fetchError(error));
        });
    }
    const changeUserStatus = (status) => {
        dispatch(fetchStart());
        UserService.updateItem(item['uuid'], {
            status_id: (status=='active') ? 1 : 2,
        }).then(response => {
            dispatch(fetchSuccess());
            dispatch(showMessage(response.message));
            setDeleteDialog(false);
            setItem({});
            setSuspendDialog(false);
            setActivateDialog(false);
        }).catch(error => {
            dispatch(fetchError(error));
            setSuspendDialog(false);
            setActivateDialog(false);
        })
    }
    const handleSendNewPassword = () => {
        dispatch(fetchStart());
        UserService.sendNewPassword(item.uuid).then(response => {
            dispatch(fetchSuccess());
            dispatch(showMessage(response.message));
        }).catch(error => {
            console.log(error);
            dispatch(fetchError(error));
        })
    }

    const handleUpdateStatusChange = (event, item)=>{
        const data = {
            //status: item.status_name === 'active' ? 'inactive' : 'active',
            status_id: item.status_name === 'active' ? 2 : 1,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
        }
        dispatch(fetchStart());
        UserService.updateItem(item.uuid, data).then(response => {
            dispatch(fetchSuccess());
            dispatch(showMessage(response.message));
            handleRefreshGrid()
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
        return UserService.listItem(reqData).then(response => {
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
            name: 'first_name',
            header: <b>Full Name</b>,
            defaultFlex: 1,
            enableColumnFilterContextMenu: false,
            render: ({ data }) => data.first_name + ' ' + data.last_name
        },
        {
            name: 'email',
            header: 'Email',
            defaultFlex: 1,
            enableColumnFilterContextMenu: false,
            render: ({ value }) => <a className={classes.emailLink} target="_blank" rel="noreferrer" href={`mailto:${value}`}>{value}</a>
        },
        {
            name: 'status_id',
            header: 'Status',
            textAlign: 'center',
            defaultFlex: 1,
            enableColumnFilterContextMenu: false,
            filterEditor: SelectFilter,
            filterEditorProps: {
                placeholder: 'All',
                dataSource: [
                    { label:'Active', id:1},
                    {label:'Inactive', id:2},
                    {label:'Blocked', id:3},
                ]
            },
            render: ({ data, value }) => {
                const statusName = data?.status_name || '';
                return <>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Inactive</Typography>
                        <Switch
                            checked={statusName==='active'}
                            onChange={(e)=> {handleUpdateStatusChange(e, data)}}
                            color='success'
                        />
                        <Typography>Active</Typography>
                    </Stack>
                    {/*{statusName === 'active' ? <Chip variant='outlined' label={statusName} color='success'/> :*/}
                    {/*  <Chip label={statusName}/>}*/}
                </>;
            },
        },
        {
            name: 'role',
            header: 'Role',
            textAlign: 'center',
            defaultFlex: 1,
            filterEditor: SelectFilter,
            enableColumnFilterContextMenu: false,
            filterEditorProps: {
                placeholder: 'All',
                dataSource: roleList.map(role => {
                    return {id: role.id, label: role.name}
                })
            },
            render: ({data}) => <Chip
                    label={data?.role || 'N/A'}
                    variant='outlined'
                    color="primary"
                />
        },
        {
            name: 'created_at',
            header: 'Registered On',
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
                        <MenuItem onClick={()=> {
                            handleSendNewPassword();
                            setMenuAnchorEl(null)
                        }} >
                            <LockResetIcon /> Reset Password
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
        { name: 'first_name', operator: 'startsWith', type: 'string', value: '' },
        { name: 'email', operator: 'startsWith', type: 'string', value: '' },
        { name: 'role', operator: 'eq', type: 'select', value: '' },
        { name: 'status_id', operator: 'eq', type: 'select', value: '' },
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
    <UpdateItem values={item} isOpen={updateItemModal} handleOpen={handleEditItemModal} roleList={roleList}/>
    <ItemDetails values={item} isOpen={itemInfoModal} handleOpen={handleItemInfoModal}/>
    </>);
}
export default ListItems;
