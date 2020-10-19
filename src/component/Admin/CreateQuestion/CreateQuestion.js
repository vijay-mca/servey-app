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

import { createQuestion } from "../../../redux/action/questionActions";

const CreateQuestion = ({
  createNewQuestion,
  question: { errorType, errorMessage },
}) => {
  const [createQuestion, setCreateQuestion] = useState({
    action: "Create Question",
    question: "",
    correctAnswer: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const [error, setError] = useState({
    question: false,
    correctAnswer: false,
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const [disable, setDisable] = useState({
    question: true,
    correctAnswer: true,
    option1: true,
    option2: true,
    option3: true,
    option4: true,
  });

  const handleOnChange = (prop) => (e) => {
    setCreateQuestion({ ...createQuestion, [prop]: e.target.value });
  };

  const handleValidation = (prop) => (e) => {
    if (
      createQuestion[prop].trim().length === 0 ||
      createQuestion[prop].trim() === "" ||
      createQuestion[prop] === undefined
    ) {
      setError({ ...error, [prop]: true });
      setDisable({ ...disable, [prop]: true });
    } else {
      setError({ ...error, [prop]: false });
      setDisable({ ...disable, [prop]: false });
    }
  };

  const handleSubmit = async () => {
    createNewQuestion(createQuestion);
  };

  return (
    <Fragment>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" color="primary" align="center">
              Create Question
            </Typography>
          </Grid>
          {errorType === "error" && (
            <Grid item lg={2} style={{ width: "100%" }}>
              <Alert severity="error">
                <AlertTitle>ERROR</AlertTitle>
                {errorMessage} — <strong>Sorry!</strong>
              </Alert>
            </Grid>
          )}
          {errorType === "success" && (
            <Grid item lg={6} style={{ width: "100%" }}>
              <Alert severity="success">
                <AlertTitle>SUCCESS MESSAGE</AlertTitle>
                {errorMessage} — <strong>check it out!</strong>
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Question"
              multiline
              rows={5}
              rowsMax={5}
              fullWidth
              value={createQuestion.question}
              error={error.question}
              helperText={error.question ? "Please enter Question" : ""}
              onChange={handleOnChange("question")}
              onKeyUp={handleValidation("question")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Correct Answer"
              fullWidth
              value={createQuestion.correctAnswer}
              error={error.correctAnswer}
              helperText={
                error.correctAnswer ? "Please enter Correct Answer" : ""
              }
              onChange={handleOnChange("correctAnswer")}
              onKeyUp={handleValidation("correctAnswer")}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="Option 1"
                  fullWidth
                  value={createQuestion.option1}
                  error={error.option1}
                  helperText={error.option1 ? "Please enter Option1" : ""}
                  onChange={handleOnChange("option1")}
                  onKeyUp={handleValidation("option1")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="Option 2"
                  fullWidth
                  value={createQuestion.option2}
                  error={error.option2}
                  helperText={error.option2 ? "Please enter Option2" : ""}
                  onChange={handleOnChange("option2")}
                  onKeyUp={handleValidation("option2")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="Option 3"
                  fullWidth
                  value={createQuestion.option3}
                  error={error.option3}
                  helperText={error.option3 ? "Please enter Option3" : ""}
                  onChange={handleOnChange("option3")}
                  onKeyUp={handleValidation("option3")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="Option 4"
                  fullWidth
                  value={createQuestion.option4}
                  error={error.option4}
                  helperText={error.option4 ? "Please enter Option4" : ""}
                  onChange={handleOnChange("option4")}
                  onKeyUp={handleValidation("option4")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={
                    disable.question ||
                    disable.correctAnswer ||
                    disable.option1 ||
                    disable.option2 ||
                    disable.option3 ||
                    disable.option4
                  }
                  onClick={handleSubmit}
                >
                  Create Question
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
  question: state.question,
});

const mapDispatchToProps = (dispatch) => ({
  createNewQuestion: (payload) => dispatch(createQuestion(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
