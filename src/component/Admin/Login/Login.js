import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { login } from "../../../redux/action/authAction";

const Login = ({ auth: { invalidAuth }, authenticateUser, history }) => {
  const [login, setLogin] = useState({
    action: "Login",
    userName: "",
    password: "",
  });

  const [error, setError] = useState({
    userName: false,
    password: false,
  });

  const [disable, setDisable] = useState({
    userName: true,
    password: true,
  });

  const handleLogin = () => {
    const { userName, password } = login;
    authenticateUser(userName, password, history);
  };

  const handleOnChange = (prop) => (e) => {
    setLogin({ ...login, [prop]: e.target.value });
  };

  const handleValidation = (prop) => (e) => {
    if (
      login[prop].trim().length === 0 ||
      login[prop].trim() === "" ||
      login[prop] === undefined
    ) {
      setError({ ...error, [prop]: true });
      setDisable({ ...disable, [prop]: true });
    } else {
      setError({ ...error, [prop]: false });
      setDisable({ ...disable, [prop]: false });
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid
          container
          justify="center"
          direction="column"
          style={{ minHeight: "100vh" }}
          spacing={5}
        >
          <Grid item lg={12}>
            <Typography variant="h3" color="primary" align="center">
              Admin Login
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Grid container alignItems="center" direction="column" spacing={5}>
              {invalidAuth && (
                <Grid item lg={6} style={{ width: "100%" }}>
                  <Alert severity="error">
                    <AlertTitle>Authentication Error</AlertTitle>
                    {invalidAuth} — <strong>check it out!</strong>
                  </Alert>
                </Grid>
              )}
              <Grid item lg={6} style={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="Username"
                  fullWidth
                  value={login.userName}
                  error={error.userName}
                  helperText={error.userName ? "Please enter Username" : ""}
                  onChange={handleOnChange("userName")}
                  onKeyUp={handleValidation("userName")}
                />
              </Grid>
              <Grid item lg={6} style={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="Password"
                  fullWidth
                  value={login.password}
                  error={error.password}
                  helperText={error.password ? "Please enter Password" : ""}
                  onChange={handleOnChange("password")}
                  onKeyUp={handleValidation("password")}
                />
              </Grid>
              <Grid item xs={4} style={{ width: "100%" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={disable.userName || disable.password}
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (userName, password, history) =>
    dispatch(login(userName, password, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
