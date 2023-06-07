import "./table.css";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const List = ({ data, columns }) => {
  return (
    <TableContainer className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} className="tableCell">
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id || index}>
              {columns.map((column) => (
                <TableCell key={column.field} className="tableCell">
                  {column.field === "id" ? (
                    <Link to={`/ads/${row[column.field]}`} className="linkCell">
                      {row[column.field]}
                    </Link>
                  ) : column.field === "uid" ? (
                    <Link to={`/users/${row[column.field]}`} className="linkCell">
                      {row[column.field]}
                    </Link>
                  ) : (
                    row[column.field]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
