import { Link } from "react-router-dom";

export const userColumns = [
  { field: "id", 
    headerName: "ID", 
    width: 350 ,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="linkCell">
        {params.value}
      </Link>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },
  {
    field: "name",
    headerName: "name",
    width: 250,
  },
  {
    field: "surname",
    headerName: "surname",
    width: 250,
  },
  {
    field: "imageUrl",
    headerName: "imageUrl",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.imageUrl} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
];

export const userReportColumns = [
  { field: "id", 
    headerName: "Rapor Id'si", 
    width: 350 
  },
  {
    field: "reportCategory",
    headerName: "Rapor Kategorisi",
    width: 300,
  },
  {
    field: "reporterId",
    headerName: "Rapor Gönderen Kullanıcı",
    width: 290,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="linkCell">
        {params.value}
      </Link>
    ),
  },
  {
    field: "userId",
    headerName: "Raporlanan Kullanıcı ",
    width: 290,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="linkCell">
        {params.value}
      </Link>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 75,
  },
];

export const adColumns = [
  { field: "id", 
    headerName: "Ad ID",
    width: 350,
    renderCell: (params) => {
      console.log(params.value); // İd değerini konsolda kontrol edin
      return (
        <Link to={`/ads/${params.value}`} className="linkCell">
          {params.value}
        </Link>
      );
    },
  },
  {
    field: "uid",
    headerName: "User ID",
    width: 300,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="linkCell">
        {params.value}
      </Link>
    ),
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
  },
  {
    field: "estateType",
    headerName: "Estate Type",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 75,
  },
];


export const adReportColumns = [
  { field: "adId", 
    headerName: "İlan ID'si", 
    width: 350 ,
    renderCell: (params) => (
      <Link to={`/ads/${params.value}`} className="linkCell">
        {params.value}
      </Link>
    ),
  },
  {
    field: "reportCategory",
    headerName: "Rapor Kategorisi",
    width: 250,
  },
  {
    field: "userId",
    headerName: "User ID",
    width: 300,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="linkCell">
        {params.value}
      </Link>
    ),
  },
  {
    field: "reporterId",
    headerName: "Raporlayan Id",
    width: 310,
    renderCell: (params) => (
      <Link to={`/users/${params.value}`} className="linkCell">
        {params.value}
      </Link>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 75,
  },
];

export const basicColumns = [
  { field: "field", headerName: "Field", width: 350 },
  {
    field: "value",
    headerName: "Value",
    width: 300,
  },
];