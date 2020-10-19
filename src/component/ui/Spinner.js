import React from "react";
import { CircularProgress } from "@material-ui/core";

const Spinner = () => {
  return (
    <div style={styles.container}>
      <CircularProgress color="primary" style={styles.image} />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
  },
  image: {
    width: "8em",
    height: "8em",
    position: "absolute",
    left: "50%",
    top: "50%",
  },
};

export default Spinner;
