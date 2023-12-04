import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  const [newSchool, setNewSchool] = useState("");
  const [newBoard, setNewBoard] = useState("");
  const [newMedium, setNewMedium] = useState("");
  const [newClass, setNewClass] = useState("");

  const [deleteList, setDeleteList] = useState([]);

  const [editedName, setEditedName] = useState("");
  const [editedBoard, setEditedBoard] = useState("");
  const [editedMedium, setEditedMedium] = useState("");
  const [editedClass, setEditedClass] = useState("");
  const [success, setSuccess] = useState(false);

  // To Fetch Dashboard Data
  const getDashboardData = async () => {
    const querySnapshot = await getDocs(collection(db, "dashboard"));
    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDashboardData(fetchedData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // To Add a new Row (Document) to Dashboard
  function createData(schoolName, board, medium, className) {
    return { schoolName, board, medium, className };
  }

  const handleAdd = async () => {
    if (!(newSchool && newBoard && newMedium && newClass)) return;
    const newRow = createData(newSchool, newBoard, newMedium, newClass);
    //dashboardData.push(newRow);
    // console.log(newRow);
    try {
      await addDoc(collection(db, "dashboard"), {
        ...newRow,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      console.log(error);
    }
    setDashboardData([...dashboardData, newRow]);
    getDashboardData();
  };

  // To Delete selected data from Dashboard
  const handleDelete = () => {
    console.log(deleteList);
    for (let i = 0; i < deleteList.length; i++) {
      deleteDoc(doc(db, "dashboard", deleteList[i]));
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 6000);
    getDashboardData();
  };

  const removeId = (id) => {
    if (deleteList.includes(id)) deleteList.splice(deleteList.indexOf(id), 1);
  };

  // To Edit selected data from Dashboard
  const handleEdit = async (e) => {
    // console.log(e.target.name);
    const index = e.target.name;
    const editedRow = createData(
      editedName ? editedName : dashboardData[index].schoolName,
      editedBoard ? editedBoard : dashboardData[index].board,
      editedMedium ? editedName : dashboardData[index].medium,
      editedClass ? editedClass : dashboardData[index].className
    );
    try {
      await setDoc(doc(db, "dashboard", dashboardData[index].id), {
        ...editedRow,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      console.log(error);
    }
    getDashboardData();
  };

  const sortData = () => {
    let arr = [...dashboardData];
    arr.sort((a, b) => a.schoolName.localeCompare(b.schoolName));
    setDashboardData(arr);
    // console.log(dashboardData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: 0.7,
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: {
            xs: 0.9,
            md: 0.8,
            lg: 0.7,
          },
        }}
      >
        <Table sx={{ width: 1, minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>School Name</TableCell>
              <TableCell>Board</TableCell>
              <TableCell>Medium</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right" component="th" scope="row">
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={(e) => setNewSchool(e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={(e) => setNewBoard(e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={(e) => setNewMedium(e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  size="small"
                  variant="outlined"
                  onChange={(e) => setNewClass(e.target.value)}
                />
              </TableCell>
              <TableCell align="right">
                <Button onClick={sortData}>Sort</Button>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            {dashboardData.map((row, index) => (
              <TableRow key={row.id} sx={{ border: 0 }}>
                <TableCell>
                  <input
                    type="checkbox"
                    id={row.id}
                    style={{ padding: "5px" }}
                    onChange={(e) => {
                      e.target.checked
                        ? setDeleteList([...deleteList, row.id])
                        : removeId(row.id);
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    size="small"
                    defaultValue={row.schoolName}
                    variant="standard"
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    size="small"
                    defaultValue={row.board}
                    variant="standard"
                    onChange={(e) => setEditedBoard(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    size="small"
                    defaultValue={row.medium}
                    variant="standard"
                    onChange={(e) => setEditedMedium(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    size="small"
                    variant="standard"
                    defaultValue={row.className}
                    onChange={(e) => setEditedClass(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" name={index} onClick={handleEdit}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Alert
        severity="success"
        sx={{
          position: "absolute",
          top: 15,
          left: "20%",
          display: success ? "flex" : "none",
        }}
        key={success}
      >
        Done
      </Alert>
    </Box>
  );
};

export default Dashboard;
