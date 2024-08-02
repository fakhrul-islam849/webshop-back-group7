import React, { useState } from 'react';
import { useGetNewsLetterDataTableQuery } from '../../features/frontElement/newsLetterApi';
import GlobalDataTable from '../DataTable/DataTable';

function NewsLetterList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchKey, setSearchKey] = useState('');

    const columns = [
        { name: 'Name', selector: (row) => row.name, width: 20 },
        {
            name: 'Quantity',
            selector: (row) => (row?.quantity ? row.quantity : 0),
            width: 10
        },
    ];

    const { data, isLoading } = useGetNewsLetterDataTableQuery({
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

export default NewsLetterList;
