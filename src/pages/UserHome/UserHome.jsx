import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { UserAuth } from "../../context/AuthContext";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserHome = () => {
  const imagesListRef = ref(storage, "images/");
  const { user, logout } = UserAuth();
  const [name, setName] = useState("");
  if (!user) {
    // <Redirect to="/" />;
  }

  const [imageUrls, setImageUrls] = useState([]);
  const getProfileImg = () => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  };

  const getName = async () => {
    const accountRef = collection(db, "user");
    const querySnapshot = await getDocs(
      query(accountRef, where("email", "==", "example@abc.com"))
    );
    const obj = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
    setName(obj.name);
  };

  useEffect(() => {
    getName();
    getProfileImg();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        p: 0,
        m: 0,
        justifyContent: "flex-start",
        width: 1,
        height: "100vh",
        color: "#000",
      }}
    >
      <NavBar name={name} imageUrls={imageUrls} />
      <Outlet />
    </Box>
  );
};

export default UserHome;
