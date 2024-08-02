/* eslint-disable react/destructuring-assignment */
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Checkbox,
    InputAdornment,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';

import TableLoader from './TableLoader';

function GlobalDataTable(props) {
    const [value, setValue] = React.useState();

    const customStyles = {
        table: {
            style: {
                border: '1px solid rgb(0 0 0 / 12%)'
            }
        },

        rows: {
            style: {
                minHeight: '44px' // override the row height
            }
        },
        headCells: {
            style: {
                // paddingLeft: '8px', // override the cell padding for head cells
                // paddingRight: '8px',
                // backgroundColor: theme.palette.action.selected
            }
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px'
                // backgroundColor: theme.palette.background.paper
            }
        },
        pagination: {
            style: {
                border: 'none'
            }
        }
    };

    const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

    let select_props = {};

    // selectableRows = Boolean, selectableRowsData = {}
    if (
        typeof props.selectableRows !== 'undefined' &&
        props.selectableRows &&
        typeof props.selectableRowsData !== 'undefined'
    ) {
        const data = props.selectableRowsData;
        // following are the props index

        select_props = {
            selectableRowsComponent: Checkbox,
            onSelectedRowsChange: props.handleRowChange,
            selectableRowsComponentProps: selectProps,
            selectableRowsHighlight: true,
            selectableRowsVisibleOnly: false,
            selectableRowsSingle: false,
            selectableRowsNoSelectAll: true
        };
        select_props = { ...select_props, ...data };

        if (typeof data.selectableRowSelected !== 'undefined') {
            // selectableRowSelected={row => row.isSelected}
            select_props.selectableRowSelected = data.selectableRowSelected;
        }

        if (typeof data.selectableRowDisabled !== 'undefined') {
            // selectableRowDisabled={row => row.isDisabled}
            select_props.selectableRowDisabled = data.selectableRowDisabled;
        }
    }

    const handleRowClicked = () => {
        return false;
    };

    const header_props = {
        actions: [
            // <button type="button" key="custom_table_button_1">
            //     Button 1
            // </button>,
            // <button type="button" key="custom_table_button_2">
            //     Button 2
            // </button>,
        ],
        fixedHeader: true,
        noContextMenu: false,
        contextMessage: {
            singular: 'item',
            plural: 'items',
            message: 'selected'
        },
        contextActions: props.headerActionButtons
    };

    return (
        <div
            key={props.table_unique_id}
            id={props.table_unique_id}
            className={
                props.className !== undefined && props.className != null
                    ? props.className
                    : ''
            }
        >
            {/* <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    gridGap: '4px'
                }}
            >
                <Box sx={{ width: '12rem' }} className='filter__area__wrapper'>
                    {props.customButtonLeft !== undefined &&
                        props.customButtonLeft()}

                    {props.otherFilter ? props.otherFilter() : ''}

                    <TextField
                        id={`search_on_custom_datatable_${props.table_unique_id}`}
                        type='text'
                        placeholder={
                            props.filterName === undefined
                                ? 'Search'
                                : props.filterName
                        }
                        aria-label='Search Input'
                        onChange={(e) => props.handleFilter(e.target.value)}
                        color='info'
                        sx={{
                            width: '292px',
                            mb: '15px',
                            backgroundColor: 'action.focus'
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon sx={{ color: 'info.main' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            </Box> */}

            <div>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                        <svg
                            aria-hidden='true'
                            className='w-5 h-5 text-gray-500 dark:text-gray-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                            ></path>
                        </svg>
                    </div>
                    <input
                        type='search'
                        id='default-search'
                        className='block w-50 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-blue-500 focus:outline-none mb-3'
                        placeholder='Search by Name'
                        onChange={(e) => props.handleFilter(e.target.value)}
                    />
                </div>
            </div>

            <DataTable
                // theme={theme.palette.mode}
                data={props.data}
                columns={props.columns}
                // table setting-> className , style not working
                keyField={props.keyField || 'id'}
                disabled={props.disabled || false}
                responsive
                striped={props.striped || false}
                highlightOnHover={props.highlightOnHover || false}
                pointerOnHover={props.pointerOnHover || false}
                onRowClicked={props.onRowClicked || handleRowClicked}
                persistTableHead={props.persistTableHead || true} // Show the table head (columns) even when progressPending is true.
                noDataComponent={props.noDataComponent || 'no data found'}
                // for check box
                selectableRows={props.selectableRows || false}
                clearSelectedRows={props.clearSelectedRows || false}
                {...select_props}
                // for pagination
                paginationServer={props.paginationServer}
                pagination={props.pagination || true}
                paginationTotalRows={props.paginationTotalRows}
                paginationRowsPerPageOptions={
                    props.paginationRowsPerPageOptions || [
                        5, 10, 15, 20, 25, 30
                    ]
                }
                // for data progress
                progressPending={props.progressPending || false}
                noHeader={props.noHeader || true}
                progressComponent={<TableLoader />}
                onChangePage={props.onChangePage}
                onChangeRowsPerPage={props.onChangeRowsPerPage}
                customStyles={customStyles}
                // selectableRowSelected={props.selectableRowSelected || []}
                {...header_props}
                {...props}
            />
        </div>
    );
}
export default GlobalDataTable;
