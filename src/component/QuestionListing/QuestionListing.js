import React, { Fragment, useEffect, useState } from "react";
// redux
import { connect } from "react-redux";

import {
  Container,
  FormLabel,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

// ui
import Spinner from "../ui/Spinner";
// reduc actions
import {
  getQuestions,
  saveQuestionAnswer,
} from "../../redux/action/questionActions";

const QuestionListing = ({
  ipAddress,
  getQuestions,
  question: { loading, questionList, errorType, errorMessage },
  saveQuestionAnswer,
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    getQuestions();
  }, [getQuestions]);
  const handleOptionChange = (ques_id, correctAnswer) => async (e) => {
    try {
      e.preventDefault();

      saveQuestionAnswer(ques_id, correctAnswer, e.target.value, ipAddress);
      
      setSelectedValue(e.target.value);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Container>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item lg={12}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={5}
              style={{ minHeight: "100vh" }}
            >
              {errorType === "answerd" && (
                <Grid item lg={6} style={{ width: "100%" }}>
                  <Alert severity="error">
                    <AlertTitle>Duplicate Entry</AlertTitle>
                    {errorMessage} — <strong>Sorry!</strong>
                  </Alert>
                </Grid>
              )}
              {errorType === "error" && (
                <Grid item lg={6} style={{ width: "100%" }}>
                  <Alert severity="error">
                    <AlertTitle>Duplicate Entry</AlertTitle>
                    {errorMessage} — <strong>Sorry!</strong>
                  </Alert>
                </Grid>
              )}
              {errorType === "success" && (
                <Grid item lg={6} style={{ width: "100%" }}>
                  <Alert severity="success">
                    <AlertTitle>Feedback</AlertTitle>
                    {errorMessage} — <strong>Thank you!</strong>
                  </Alert>
                </Grid>
              )}
              {questionList.length > 0 &&
                questionList.map((ql, qlKey) => (
                  <Fragment key={qlKey}>
                    <Grid item lg={12} xs={12}>
                      <FormLabel component="legend">
                        {ql.questions.question}
                      </FormLabel>
                      {ql.options.map((qlo, qloKey) => (
                        <Fragment key={qloKey}>
                          <FormControlLabel
                            control={<Radio />}
                            checked={selectedValue === qlo.toString()}
                            onChange={handleOptionChange(
                              ql.questions.ques_id,
                              ql.questions.answer
                            )}
                            value={qlo.toString()}
                            name="ques_option"
                            label={qlo.toString()}
                          />
                        </Fragment>
                      ))}
                    </Grid>
                  </Fragment>
                ))}

              <Grid item lg={12} xs={12}>
                <Typography variant="h3">Disclaimer</Typography>
                <Typography variant="subtitle1">
                  A disclaimer is generally any statement intended to specify or
                  delimit the scope of rights and obligations that may be
                  exercised and enforced by parties in a legally recognized
                  relationship.
                </Typography>
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
  getQuestions: () => dispatch(getQuestions()),
  saveQuestionAnswer: (ques_id, correctAnswer, ques_opt_id, ipAddress) =>
    dispatch(
      saveQuestionAnswer(ques_id, correctAnswer, ques_opt_id, ipAddress)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListing);
