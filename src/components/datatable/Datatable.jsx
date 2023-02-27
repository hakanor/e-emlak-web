import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, adColumns } from "../../datatablesource";
import { Link } from "react-router-dom";

const Datatable = ({data, dataType}) => {

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
      <DataGrid
        className="datagrid"
        rows={data}
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