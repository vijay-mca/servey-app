import React, { Fragment, useState, } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { logout, login } from "../../redux/action/authAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ auth: { authenticate }, logout }) => {
  const [value, setValue] = useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const styles = useStyles();

  const beforeAuth = (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="simple tabs example"
    >
      <Tab label="Take Servey" component={Link} to="/" />
      <Tab label="Login" component={Link} to="/login" />
    </Tabs>
  );

  const afterAuth = (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="simple tabs example"
    >
      <Tab label="Create Question" component={Link} to="/createquestion" />
      <Tab label="View Question" component={Link} to="/viewquestion" />
      <Tab
        label="Logout"
        onClick={() => {
          handleLogout();
        }}
      />
    </Tabs>
  );
  return (
    <Fragment>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={styles.title}>
            Servey
          </Typography>

          {authenticate ? afterAuth : beforeAuth}
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "5em" }} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  login: (userName, password, redirect) =>
    dispatch(login(userName, password, redirect)),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
