import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import DropDown from "./components/DropDown";
import SyllabusMenu from "./components/SyllabusMenu";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";

const Syllabus = () => {
  const tempObj = {
    id: "",
    board: "",
    class: "",
    subject: "",
    description: "",
    year: "",
    topicsArr: [
      {
        description: "",
        name: "",
        subtopics: [{ description: "", name: "" }],
      },
    ],
  };
  // Object which has all the syllabus data
  const [SyllabusObj, setSyllabusObj] = useState(tempObj);

  // Getting the boards, classes, subjects and years for dropdown menu
  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState([]);
  const subjects = [
    "Maths",
    "English",
    "Hindi",
    "Science",
    "Geography",
    "History",
  ];
  const years = ["2019-20", "2020-21", "2021-22", "2022-23", "2023-24"];

  const getBoards = async () => {
    const querySnapshot = await getDocs(collection(db, "dashboard"));
    let uniqueBoards = [];
    querySnapshot.docs.forEach((doc) => {
      const board = doc.data().board;
      if (!uniqueBoards.includes(board)) {
        uniqueBoards.push(board);
      }
    });
    setBoards(uniqueBoards);
  };

  const getClasses = async () => {
    const querySnapshot = await getDocs(collection(db, "dashboard"));
    let uniqueClasses = [];
    querySnapshot.docs.forEach((doc) => {
      const classItem = doc.data().className;
      if (!uniqueClasses.includes(classItem)) {
        uniqueClasses.push(classItem);
      }
    });
    setClasses(uniqueClasses);
  };

  useEffect(() => {
    getBoards();
    getClasses();
  }, []);

  // Fetching the syllabus data from database
  const [currBoard, setCurrBoard] = useState("");
  const [currClass, setCurrClass] = useState("");
  const [currSubject, setCurrSubject] = useState("");
  const [currYear, setCurrYear] = useState("");

  const getSyllabusData = async () => {
    if (
      currBoard != "" &&
      currClass != "" &&
      currSubject != "" &&
      currYear != ""
    ) {
      try {
        const syllabusRef = collection(db, "syllabus");
        const querySnapshot = await getDocs(
          query(
            syllabusRef,
            where("board", "==", currBoard),
            where("class", "==", currClass),
            where("subject", "==", currSubject),
            where("year", "==", currYear)
          )
        );
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        fetchedData[0].id = querySnapshot.docs[0].id;
        if (fetchedData[0]) setSyllabusObj(fetchedData[0]);
        // console.log(fetchedData[0]);
        // console.log(SyllabusObj);
      } catch (error) {
        console.error("Error getting syllabus document:", error);
        // Handle the error here (throw, return an error object, etc.)
        throw new Error("Failed to fetch syllabus document");
      }
    }
  };

  useEffect(() => {
    getSyllabusData();
  }, [currBoard, currClass, currSubject, currYear]);

  // Updating/ Adding data to firebase
  const handleSubmit = async () => {
    // console.log(SyllabusObj);
    if (!(currBoard && currClass && currSubject && currYear)) return;
    if (SyllabusObj.board) {
      try {
        await setDoc(doc(db, "syllabus", SyllabusObj.id), {
          ...SyllabusObj,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      SyllabusObj.board = currBoard;
      SyllabusObj.subject = currSubject;
      SyllabusObj.class = currClass;
      SyllabusObj.year = currYear;
      try {
        await addDoc(collection(db, "syllabus"), {
          ...SyllabusObj,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      sx={{
        width: {
          xs: 1,
          md: 0.6,
        },
        gap: 4,
        display: "flex",
        flexDirection: "column",
        p: {
          xs: 2,
          md: 7,
        },
      }}
    >
      <Box>
        <Typography variant="h3">Syllabus</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <DropDown label={"Board"} values={boards} setValue={setCurrBoard} />
          <DropDown label={"Class"} values={classes} setValue={setCurrClass} />
          <DropDown
            label={"Subject"}
            values={subjects}
            setValue={setCurrSubject}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <TextField
            label={"Syllabus Description"}
            sx={{ width: 0.6 }}
            onChange={(e) => (SyllabusObj.description = e.target.value)}
            defaultValue={SyllabusObj.description}
            key={SyllabusObj.id}
          />
          <DropDown
            label={"Academic Year"}
            values={years}
            setValue={setCurrYear}
          />
        </Box>
        <Box>
          <SyllabusMenu SyllabusObj={SyllabusObj} />
        </Box>
        <Button
          variant="contained"
          sx={{ width: 5, mb: 5 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Syllabus;
