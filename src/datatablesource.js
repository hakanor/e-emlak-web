export const userColumns = [
  { field: "id", headerName: "ID", width: 350 },
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

export const adColumns = [
  { field: "adId", headerName: "Ad ID", width: 350 },
  {
    field: "uid",
    headerName: "User ID",
    width: 300,
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "price",
    headerName: "Price",
    width: 250,
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
    width: 150,
  },
];
