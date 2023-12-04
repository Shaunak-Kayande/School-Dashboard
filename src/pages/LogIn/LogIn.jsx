import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/user");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    }
  };
  return (
    <div className="login">
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          height: 0.7,
          width: {
            xs: 1,
            sm: 0.7,
            md: 0.5,
            lg: 0.3,
          },
        }}
      >
        <Typography variant="h4">Log in</Typography>
        <TextField
          label="Username"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: 0.7 }}
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: 0.7 }}
          type="password"
        />
        <Button onClick={handleSubmit} variant="contained" sx={{ width: 0.7 }}>
          Log In
        </Button>
        <Alert
          severity="error"
          sx={{
            display: success ? "flex" : "none",
          }}
          key={success}
        >
          Username and password do not match
        </Alert>
      </Paper>
    </div>
  );
};

export default LogIn;
