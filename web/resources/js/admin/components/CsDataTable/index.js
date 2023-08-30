import React, {useEffect, useState} from 'react';
import '@inovua/reactdatagrid-community/index.css';
import ReactDataGrid from "@inovua/reactdatagrid-community";

const CsDataTable = (props) => {
    console.log("CsDataTable",props);
    const {
        columns,
        pagination=true,
        loading=false,
        pageSize = 10,
        pageNo = 0,
        refresh = 0,
    } = props;
    const gridStyle = {minHeight: 550};
    const [gridRef, setGridRef] = useState(null)
    const reloadTable = () => {
        // @ts-ignore
        gridRef.current.reload();
    }
    useEffect(() =>{
        if(refresh>1){
            reloadTable();
        }
    }, [refresh]);
    return <>
        <div style={{minHeight: '500px', height: 'auto', width: '100%'}}>
            <ReactDataGrid
                onReady={setGridRef}
                style={gridStyle}
                idProperty="uniqueId"
                {...props}
                columns={columns}
                //dataSource={data}
                pagination={pagination}
                loading={loading}
                defaultLimit={pageSize}
                defaultSkip={pageNo}
                pageSizes={[5, 10, 20, 50, 100]}
                // onLimitChange={handleLimitChange}
                // onSkipChange={handleSkipChange}
                // onSortInfoChange={handleSortChange}
            />
        </div>
    </>
}
export default CsDataTable;
