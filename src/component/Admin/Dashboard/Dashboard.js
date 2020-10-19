import React, { Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../../ui/Spinner";

const Dashboard = ({ question: { loading } }) => {
  //   if (props.counts === null) {
  //     return (
  //       <Fragment>
  // <Spinner />
  //       </Fragment>
  //     );
  //   }
  if (loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      {/* <h1>OPTION1 :{props.counts.option1_count} </h1>
      <h1>OPTION2 :{props.counts.option2_count} </h1>
      <h1>OPTION3 :{props.counts.option3_count} </h1>
      <h1>OPTION4 :{props.counts.option4_count} </h1> */}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  question: state.question,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
