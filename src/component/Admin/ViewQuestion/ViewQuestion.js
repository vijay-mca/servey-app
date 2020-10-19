import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  TableSortLabel,
  TablePagination,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";

import {
  viewQuestions,
  openResultModal,
  viewResult,
  editQuestion,
} from "../../../redux/action/questionActions";
import ViewResult from "./ViewResult";
import Spinner from "../../ui/Spinner";

const useStyles = makeStyles((theme) => ({
  s: {
    color: "black",
  },
}));

const ViewQuestion = ({
  viewQuestions,
  resultModal,
  viewResult,
  editQuestion,
  question: { questions, openResultModal, loading },
}) => {
  const headCells = [
    { numeric: false, disablePadding: false, label: "Question" },
    { numeric: false, disablePadding: false, label: "Answer" },
    { numeric: false, disablePadding: false, label: "Created-At" },
    {
      numeric: false,
      disablePadding: false,
      label: "Updated-At",
    },
    {
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  useEffect(() => {
    viewQuestions();
  }, [viewQuestions]);

  const styles = useStyles();

  const handleResultModal = (ques_id) => {
    resultModal(true);
    viewResult(ques_id);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <ViewResult openResultModal={openResultModal} />
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              {headCells.map((headCell, key) => (
                <TableCell
                  key={key}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "default"}
                >
                  <TableSortLabel>{headCell.label}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.length > 0 ? (
              questions.map((row, key) => (
                <TableRow key={key}>
                  <TableCell padding="checkbox" className={styles.s}>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.question}</TableCell>
                  <TableCell>{row.answer}</TableCell>
                  <TableCell>
                    {moment(row.created).format("MM-DD-YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {row.updated &&
                      moment(row.updated).format("MM-DD-YYYY HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Grid container direction="row" spacing={2}>
                      <Grid item lg={3}>
                        <Button variant="contained" color="primary">
                          View
                        </Button>
                      </Grid>
                      <Grid item lg={3}>
                        <Button variant="contained" color="primary" onClick={()=>{editQuestion(row.ques_id)}}>
                          Edit
                        </Button>
                      </Grid>
                      <Grid item lg={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleResultModal(row.ques_id);
                          }}
                        >
                          Result
                        </Button>
                      </Grid>
                      <Grid item lg={3}>
                        <Button variant="contained" color="secondary">
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No record
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={questions.length}
          rowsPerPage={5}
          page={0}
        />
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  question: state.question,
});

const mapDispatchToProps = (dispatch) => ({
  viewQuestions: () => dispatch(viewQuestions()),
  resultModal: (payload) => dispatch(openResultModal(payload)),
  viewResult: (paylod) => dispatch(viewResult(paylod)),
  editQuestion: (payload) => dispatch(editQuestion(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewQuestion);
