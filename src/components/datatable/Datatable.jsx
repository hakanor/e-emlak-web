import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, adColumns, userReportColumns, adReportColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField, Select, MenuItem } from "@mui/material";

const Datatable = ({ data, dataType }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [extraFilter, setExtraFilter] = useState("");

  const filterOptionsUserReport = [
    "Üye dolandırmaya çalışıyor.",
    "Üye profil fotoğrafı uygunsuz.",
    "Üye isim-soyisim uygunsuz.",
    "Üye beni rahatsız ediyor."
  ];

  const filterOptionsAdReport = [
    "Hizmet satılmış ya da kiralanmış.",
    "İlan kategorisi hatalı.",
    "İlan bilgileri hatalı veya yanlış.",
    "İlan birden fazla kere yayımlanmış.",
    "Diğer"
  ];

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleExtraFilter = (event) => {
    setExtraFilter(event.target.value);
  };

  let filterFields = [];

  switch (dataType) {
    case "user":
      filterFields = ["id", "name", "email", "surname"];
      break;
    case "ad":
      filterFields = ["id", "uid", "title", "price", "location", "estateType", "status"];
      break;
    case "adReport":
      filterFields = ["adId", "reportCategory", "reporterId", "userId", "status"];
      break;
    case "userReport":
      filterFields = ["id", "reportCategory", "reporterId", "userId", "status"];
      break;
    default:
      filterFields = ["id", "name", "email", "surname"];
  }

  const filteredData = data.filter((item) => {
    const searchKeywords = searchQuery.toLowerCase().split(" ");
    const searchFilter = searchKeywords.every((keyword) =>
      filterFields.some((fieldName) =>
        item[fieldName]?.toString().toLowerCase().includes(keyword)
      )
    );

    const extraFilterCondition =
      extraFilter === "" || item["reportCategory"] === extraFilter;

    return searchFilter && extraFilterCondition;
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
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  let title, newLinkText, totalCountText;
  let columns = [];
  let showNewLinkButton = false;

  switch (dataType) {
    case "user":
      title = "Kullanıcılar";
      showNewLinkButton = true;
      newLinkText = "Yeni Ekle";
      totalCountText = "Toplam kullanıcı sayısı: ";
      columns = userColumns.concat(actionColumn);
      break;
    case "ad":
      title = "İlanlar";
      newLinkText = "Yeni Ekle";
      totalCountText = "Toplam ilan sayısı: ";
      columns = adColumns.concat(actionColumn);
      break;
    case "adReport":
      title = "İlan Şikayetleri";
      newLinkText = "Yeni Ekle";
      totalCountText = "Toplam ilan şikayeti sayısı: ";
      columns = adReportColumns.concat(actionColumn);
      break;
    case "userReport":
      title = "Kullanıcı Şikayetleri";
      newLinkText = "Yeni Ekle";
      totalCountText = "Toplam kullanıcı şikayeti sayısı: ";
      columns = userReportColumns.concat(actionColumn);
      break;
    default:
      title = "Add New X";
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
        {showNewLinkButton && (
          <Link to={`/${dataType}s/new`} className="link">
            {newLinkText}
          </Link>
        )}
      </div>
      <br />
      <div className="searchContainer">
        <TextField
          label="Ara"
          value={searchQuery}
          onChange={handleSearch}
          size="small"
          sx={{ paddingBottom: "10px" }}
        />
        {dataType === "userReport" && (
          <Select
            value={extraFilter}
            onChange={handleExtraFilter}
            size="small"
            sx={{ marginLeft: "10px" }}
          >
            <MenuItem value="">Tümü</MenuItem>
            {filterOptionsUserReport.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
        {dataType === "adReport" && (
          <Select
            value={extraFilter}
            onChange={handleExtraFilter}
            size="small"
            sx={{ marginLeft: "10px" }}
          >
            <MenuItem value="">Tümü</MenuItem>
            {filterOptionsAdReport.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
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
