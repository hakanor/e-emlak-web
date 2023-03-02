import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, adColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";

const Datatable = ({ data, dataType }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  console.log(data);
  console.log(dataType);

  const filteredData = data.filter((item) => {
    const searchKeywords = searchQuery.toLowerCase().split(" ");
    switch (dataType) {
      case "ad":
        return searchKeywords.every((keyword) =>
          ["id", "uid", "title", "price", "location", "estateType"]
            .some((fieldName) => item[fieldName]?.toLowerCase().includes(keyword))
        );
      case "user":
        return searchKeywords.every((keyword) =>
          ["id", "name", "email", "surname"]
            .some((fieldName) => item[fieldName]?.toLowerCase().includes(keyword))
        );
      default:
        console.log("default");
        break;
    }
  });

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${dataType}s/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  let title, newLinkText, totalCountText;
  let columns = [];

  switch (dataType) {
    case "user":
      title = "Add New User";
      newLinkText = "Add New";
      totalCountText = "Total number of Users";
      columns = userColumns.concat(actionColumn);
      break;
    case "ad":
      title = "Add New Ad";
      newLinkText = "Add New";
      totalCountText = "Total number of Ads";
      columns = adColumns.concat(actionColumn);
      break;
    default:
      title = "Add New X";
      newLinkText = "Add New";
      totalCountText = "Total number of X";
      columns = userColumns.concat(actionColumn);
  }

  const handleDelete = (id) => {
    //setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link to={`/${dataType}s/new`} className="link">
          {newLinkText}
        </Link>
      </div>
      <br />
      <div className="searchContainer">
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearch}
          size= "small"
          sx={{paddingBottom: "10px"}}
        />
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <div className="datatableCount">
        {totalCountText}: {data.length}
      </div>
    </div>
  );
};

export default Datatable;