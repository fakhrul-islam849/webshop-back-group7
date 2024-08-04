import React, { useState } from 'react';
import { useGetDiagnosticTestDataTableQuery, useDiagnosticTestDeleteMutation } from '../../../features/diagnostic/diagnosticTestApi';
import GlobalDataTable from '../../DataTable/DataTable';
import CustomDropDownButtonMenu from "../../DropDown/CustomDropDownButtonMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ExclamationCircleFilled} from "@ant-design/icons";
import ToastifyAlert from "../../../helper/ToastifyAlert";
import {ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS} from "../../../utils/Constant/globalConstant";
import {Box, Typography} from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DeleteIcon from "@mui/icons-material/Delete";
import {Modal} from "antd";
import {useNavigate} from "react-router-dom";

function DiagnosticGroupList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchKey, setSearchKey] = useState('');
    const { confirm } = Modal;
    const navigate = useNavigate();

    const { data, isLoading } = useGetDiagnosticTestDataTableQuery({
        page: page,
        limit: pageSize,
        search_key: searchKey
    });

    const handleViewEditClick = (row) => {
        navigate('/order-details/' + row.id);
    };

    const [
        deleteData,
        { isLoading: deleteLoading, isSuccess: deleteSuccess }
    ] = useDiagnosticTestDeleteMutation();
    const showDeleteConfirm = (row) => {
        confirm({
            title: 'Are you sure delete this data?',
            icon: <ExclamationCircleFilled />,
            content: `${row.name} will be erase forever`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteData(row.id)
                    .unwrap()
                    .then((response) => {
                        if (response.status) {
                            ToastifyAlert(response.message, ALERT_TYPE_SUCCESS);
                        } else {
                            ToastifyAlert(response.message, ALERT_TYPE_ERROR);
                        }
                    })
                    .catch((error) => {
                        ToastifyAlert(
                            error.data.message || 'Sorry API Error',
                            ALERT_TYPE_ERROR
                        );
                    });
            },
        });
    };
    const renderActionOptions = (row) => {
        return [
            {
                name: (
                    <Box sx={{ display: 'flex' }}>
                        <HistoryEduIcon
                            sx={{
                                color: '#e0d100',
                                paddingRight: '10px',
                                width: '2rem !important'
                            }}
                        />
                        <Typography variant='body1' color='text.primary'>
                            Details
                        </Typography>
                    </Box>
                ),
                handleClick: () => handleViewEditClick(row)
            }
        ];
    };

    const columns = [
        { name: 'Order ID', selector: (row) => row.id, width: 20 },
        { name: 'Price', selector: (row) => row.total, width: 20 },
        { name: 'Payment', selector: (row) => row.payment, width: 20 },
        {
            name: 'Action',
            selector: (row) => {
                return (
                    <CustomDropDownButtonMenu
                        buttonContent={<MoreVertIcon />}
                        disabledStatus={false}
                        options={renderActionOptions(row)}
                    />
                );
            },
            width: 10
        }
    ];

    const handleFilter = async (searchKey) => {
        setPage(0);
        setSearchKey(searchKey);
    };
    const onChangePage = (pageNumber) => {
        setPage(pageNumber - 1);
    };
    const onChangeRowsPerPage = (limit) => {
        setPage(0);
        setPageSize(limit);
    };
    return (
        <div>
            {!isLoading && (
                <GlobalDataTable
                    data={data?.data ? data.data : []}
                    columns={columns}
                    handleFilter={handleFilter}
                    progressPending={isLoading}
                    paginationServer
                    paginationTotalRows={data?.totalItems ? data.totalItems : 0}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                />
            )}
        </div>
    );
}

export default DiagnosticGroupList;
