import React from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  AccountCircle,
  Dashboard,
  LibraryBooks,
  Logout,
} from "@mui/icons-material";
import { UserAuth } from "../../../context/AuthContext";

const NavBar = ({ name, imageUrls }) => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <List
      sx={{
        width: 0.16,
        m: 0,
        bgcolor: "primary.main",
      }}
    >
      <ListItem disablePadding>
        <ListItemButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: 1,
            }}
          >
            <Avatar src={imageUrls[0]} />
            <ListItemText
              primary={name}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            />
          </Box>
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("")}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("syllabus")}>
          <ListItemIcon>
            <LibraryBooks />
          </ListItemIcon>
          <ListItemText
            primary="Syllabus"
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("account")}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText
            primary="Account"
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default NavBar;
