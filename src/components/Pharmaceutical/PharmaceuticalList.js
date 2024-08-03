import React, { useState } from 'react';
import {
    useGetPharmaceuticalDataTableQuery,
    usePharmaceuticalDeleteMutation
} from '../../features/medicine/pharmaceuticalApi';
import GlobalDataTable from '../DataTable/DataTable';
import CustomDropDownButtonMenu from '../DropDown/CustomDropDownButtonMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Typography } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ToastifyAlert from '../../helper/ToastifyAlert';
import {
    ALERT_TYPE_ERROR,
    ALERT_TYPE_SUCCESS
} from '../../utils/Constant/globalConstant';
const { confirm } = Modal;

function PharmaceuticalList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchKey, setSearchKey] = useState('');
    const navigate = useNavigate();

    const handleViewClick = (row) => {
        navigate('/pharmaceutical/details/' + row.id);
    };
    const handleEditClick = (row) => {
        navigate('/pharmaceutical/edit/' + row.id);
    };

    const { data, isLoading } = useGetPharmaceuticalDataTableQuery({
        page: page,
        limit: pageSize,
        search_key: searchKey
    });

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

    const [
        deleteData,
        { isLoading: deleteLoading, isSuccess: deleteSuccess }
    ] = usePharmaceuticalDeleteMutation();


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
                                color: 'action.active',
                                paddingRight: '10px',
                                width: '2rem !important'
                            }}
                        />
                        <Typography variant='body1' color='text.primary'>
                            View Details
                        </Typography>
                    </Box>
                ),
                handleClick: () => handleViewClick(row)
            },

            {
                name: (
                    <Box
                        sx={{ display: 'flex' }}
                    >
                        <DeleteIcon
                            sx={{
                                color: 'red',
                                paddingRight: '10px',
                                width: '2rem !important'
                            }}
                        />
                        <Typography variant='body1' color='red'>
                            Delete
                        </Typography>
                    </Box>
                ),
                handleClick: () => showDeleteConfirm(row)
            }
        ];
    };

    const columns = [
        { name: 'Name', selector: (row) => row.name, width: 20 },
        {
            name: 'Status',
            selector: (row) => {
                if (row?.status && row.status == 1) {
                    return (
                        <span className='bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900'>
                            Active
                        </span>
                    );
                } else {
                    return (
                        <span className='bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900'>
                            Inactive
                        </span>
                    );
                }
            },
            width: 10
        },
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

export default PharmaceuticalList;
