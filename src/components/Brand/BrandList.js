import React, { useState } from "react";
import { useGetBrandDataTableQuery } from "../../features/medicine/brandApi";
import GlobalDataTable from "../DataTable/DataTable";
import CustomDropDownButtonMenu from "../DropDown/CustomDropDownButtonMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function BrandList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const handleViewEditClick = (row) => {
    navigate("/brand-edit/" + row.id);
  };

  const renderActionOptions = (row) => {
    return [
      {
        name: (
          <Box sx={{ display: "flex" }}>
            <EditIcon
              sx={{
                color: "#e0d100",
                paddingRight: "10px",
                width: "2rem !important",
              }}
            />
            <Typography variant="body1" color="text.primary">
              Edit
            </Typography>
          </Box>
        ),
        handleClick: () => handleViewEditClick(row),
      },
    ];
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, width: 20 },
    {
      name: "Quantity",
      selector: (row) => (row?.quantity ? row.quantity : 0),
      width: 10,
    },
    {
      name: "Unit Price",
      selector: (row) => (row?.unit_price ? row.unit_price : 0),
      width: 10,
    },
  ];

  const { data, isLoading } = useGetBrandDataTableQuery({
    page: page,
    limit: pageSize,
    search_key: searchKey,
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

export default BrandList;
