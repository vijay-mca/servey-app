import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { openResultModal } from "../../../../redux/action/questionActions";
import Spinner from "../../../ui/Spinner";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ViewResult = ({
  resultModal,
  question: { openResultModal, questionResult, totalCount, loading },
}) => {
  if (loading) {
    return <Spinner />;
  }

  const handleClose = () => {
    resultModal(false);
  };

  return (
    <Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openResultModal}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Result
        </DialogTitle>
        <DialogContent dividers>
          {questionResult.length > 0 &&
            questionResult.map((qr, key) => (
              <Fragment key={key}>
                <Typography gutterBottom>
                  {qr.user_answer} - {((qr.user_answer_count * 100) / totalCount).toFixed()}
                  %
                </Typography>
              </Fragment>
            ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  question: state.question,
});
const mapDispatchToProps = (dispatch) => ({
  resultModal: (paylod) => dispatch(openResultModal(paylod)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewResult);
