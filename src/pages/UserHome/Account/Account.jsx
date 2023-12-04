import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { db, storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { UserAuth } from "../../../context/AuthContext";
import {
  Query,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const Account = () => {
  const [imageUpload, setImageUpload] = useState(null);

  const { user, logout } = UserAuth();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [profileDetails, setProfileDetails] = useState({});
  const [success, setSuccess] = useState(false);

  const getUserDetails = async () => {
    const accountRef = collection(db, "user");
    const querySnapshot = await getDocs(
      query(accountRef, where("email", "==", "example@abc.com"))
    );
    const obj = {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
    setProfileDetails(obj);
    setName(profileDetails.name);
    setMobile(profileDetails.mobile);
    setUserName(profileDetails.userName);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/profile.jpg`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  const editUserDetails = async () => {
    // console.log(user.email, name, mobile, userName);
    uploadFile();
    let obj = {
      name: name,
      userName: userName,
      email: user.email,
      mobile: mobile,
    };
    if (!(name && userName && mobile)) return;

    try {
      await setDoc(doc(db, "user", profileDetails.id), {
        ...obj,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      console.log(error);
    }
  };

  const [valid, isValid] = useState(true);
  const formValidation = () => {
    // const format = /^[a-zA-Z0-9.-_]+$/;
    // if (userName.charAt(0).toUpperCase() != userName.charAt(0).toLowerCase)
    //   isValid(false);
    // else if (userName.length < 4 || userName.length > 30) isValid(false);
    // else if (!format.test(userName)) isValid(false);
    // else isValid(true);
  };

  return (
    <Box
      sx={{
        width: 0.6,
        gap: 4,
        display: "flex",
        flexDirection: "column",
        p: {
          xs: 2,
          md: 7,
        },
        position: "relative",
      }}
    >
      <Box>
        <Typography variant="h3">Account</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 5,
        }}
      >
        <Box sx={{ width: { xs: 1, md: 0.3 } }}>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 5,
            }}
          >
            <TextField
              defaultValue={profileDetails && profileDetails.name}
              label={"Name"}
              onChange={(e) => setName(e.target.value)}
              key={profileDetails && profileDetails.name}
            />
            <TextField
              defaultValue={profileDetails && profileDetails.email}
              label={"Email"}
              onChange={(e) => setEmail(e.target.value)}
              key={profileDetails && profileDetails.email}
              disabled
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 5,
            }}
          >
            <TextField
              defaultValue={profileDetails && profileDetails.mobile}
              label={"Mobile"}
              onChange={(e) => setMobile(e.target.value)}
              key={profileDetails && profileDetails.mobile}
            />
            <TextField
              error={valid}
              defaultValue={profileDetails && profileDetails.userName}
              label={"UserName"}
              onChange={(e) => {
                setUserName(e.target.value);
                formValidation();
              }}
              helperText="start/end with alphabet, length 4-30, allowed special characters: {.-_}"
              key={valid && profileDetails && profileDetails.userName}
            />
          </Box>
        </Box>
      </Box>
      <Button variant="contained" sx={{ width: 0.1 }} onClick={editUserDetails}>
        Submit
      </Button>
      <Alert
        severity="success"
        sx={{
          position: "absolute",
          top: 25,
          left: "30%",
          display: success ? "flex" : "none",
        }}
        key={success}
      >
        Profile updated
      </Alert>
    </Box>
  );
};

export default Account;
