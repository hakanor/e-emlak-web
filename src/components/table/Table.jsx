import "./table.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  where
} from "firebase/firestore";
import { db } from "../../firebase";

const List = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "ads"), where("uid", "==", "il8EDi5fBWOrVpYQAAobna5NJAW2"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const rows = data;
  return (
    <TableContainer className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">uid</TableCell>
            <TableCell className="tableCell">location</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id || index}>
              <TableCell className="tableCell">{row.uid}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.images} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.uid}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.floorNumber}</TableCell>
              <TableCell className="tableCell">{row.heating}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;