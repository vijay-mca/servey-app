const db = require("../db/connection");
let total_user_answer_count = 0;
// @desc get all question
// @route GET /api/v1/servey
// @access Public
exports.serveyGetMethod = (req, res) => {
  const { action } = req.body;

  switch (action) {
    case "Get Question & Answer":
      try {
        db.query("SELECT * FROM tbl_question", (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ status: "error", message: err.message });
          } else {
            return res.status(200).json({ result: result });
          }
        });
      } catch (error) {
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      }
      break;

    default:
      break;
  }
};

// @desc save question
// @route POST /api/v1/servey
// @access Public
exports.serveyPostMethod = (req, res, done) => {
  const { action } = req.body;

  switch (action) {
    case "Get Question & Answer":
      try {
        var quesAnsOpt = [];

        db.query(
          "SELECT tq.ques_id, tq.question, tq.answer, tqo.ques_opt_id, tqo.options FROM tbl_question tq JOIN tbl_question_options tqo on (tq.ques_id = tqo.ques_id) WHERE status = 'Y'",
          (quesErr, quesRes) => {
            if (quesErr) {
              return res
                .status(500)
                .json({ status: "error", message: quesErr.message });
            } else {
              let q;
              for (let i = 0; i < quesRes.length; i++) {
                quesAnsOpt[i] = {
                  questions: quesRes[i],
                  options: quesRes[i].options.split(","),
                };
              }

              return res.status(200).json({ quesAnsOpt });
            }
          }
        );
      } catch (error) {
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      }
      break;

    case "Create Question":
      const {
        question,
        correctAnswer,
        option1,
        option2,
        option3,
        option4,
      } = req.body;

      const options = option1 + "," + option2 + "," + option3 + "," + option4;

      let d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      const date = [year, month, day].join("-");
      const time = [hour, minutes, seconds].join(":");
      const date_time = `${date} ${time}`;
      try {
        db.query(
          "INSERT INTO tbl_question set question = ?, answer = ?, created = ?",
          [question, correctAnswer, date_time],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ status: "error", message: err.sqlMessage });
            }
            db.query(
              "INSERT INTO tbl_question_options set ques_id = ?, options = ?",
              [result.insertId, options],
              (optErr, optRes) => {
                if (optErr) {
                  return res
                    .status(500)
                    .json({ status: "error", message: optErr.sqlMessage });
                }
              }
            );

            return res
              .status(200)
              .json({ status: "success", message: "Question Created" });
          }
        );
      } catch (error) {
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      }
      break;
    case "Save Answer":
      try {
        const { ques_id, ques_opt, ipAddress } = req.body;

        checkIp(ques_id, ipAddress, (result) => {
          if (result.error) {
            return res.status(500).json({
              status: "error",
              message: result.message,
            });
          } else {
            if (result.ipAddress !== "" && result.ipAddress === ipAddress) {
              return res.status(500).json({
                status: "answerd",
                message: "You already answer the question",
              });
            } else {
              db.query(
                `INSERT INTO tbl_question_answer set ques_id = ?, user_answer = ?, ip_address = ?`,
                [ques_id, ques_opt, ipAddress],
                (err, result) => {
                  if (err) {
                    return res
                      .status(500)
                      .json({ status: "error", message: err.sqlMessage });
                  } else {
                    return res.status(200).json({
                      status: "success",
                      message: "Thank you for your feedback",
                    });
                  }
                }
              );
            }
          }
        });
      } catch (error) {
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      }

      break;

    case "View Questions":
      try {
        db.query("SELECT * FROM tbl_question", (quesErr, quesRes) => {
          if (quesErr) {
            return res
              .status(500)
              .json({ status: "error", message: quesErr.message });
          } else {
            return res
              .status(200)
              .json({ status: "success", questions: quesRes });
          }
        });
      } catch (error) {
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      }
      break;

    case "View Result":
      try {
        const { ques_id } = req.body;
        db.query(
          "SELECT ques_id, options FROM tbl_question_options where ques_id = ?",
          [ques_id],
          (resOptErr, resOptRes) => {
            if (resOptErr) {
              return res
                .status(500)
                .json({ status: "error", message: resOptErr.message });
            }

            const options = resOptRes[0].options.split(",");
            for (let i = 0; i < options.length; i++) {
              db.query(
                "SELECT COUNT(user_answer) answer_count, user_answer  FROM tbl_question_answer where ques_id = ? AND user_answer = ?",
                [resOptRes[0].ques_id, options[i]],
                (resErr, resRes) => {
                  if (resErr) {
                    return res
                      .status(500)
                      .json({ status: "error", message: resErr.message });
                  }
                  value(
                    res,
                    resRes[0].answer_count,
                    resRes[0].user_answer,
                    options.length,
                    i
                  );
                  if (options.length === i + 1) {
                    total_user_answer_count = 0;
                  }
                }
              );
            }
          }
        );
      } catch (error) {
        return res
          .status(500)
          .json({ status: "error", message: error.message });
      }
      break;
    case "Edit Question":
      try {
        const { ques_id } = req.body;
        db.query(
          "SELECT *  FROM tbl_question where ques_id = ?",
          ques_id,
          (resErr, resRes) => {
            if (resErr) {
              return res
                .status(500)
                .json({ status: "error", message: resErr.message });
            }
            return res
              .status(200)
              .json({ status: "success", result: resRes });
          }
        );
      } catch (error) {}
      break;
    default:
      break;
  }
};

let data = [];
function value(res, user_answer_count, user_answer, length, currentLength) {
  total_user_answer_count = total_user_answer_count + user_answer_count;
  data[currentLength] = {
    user_answer,
    user_answer_count,
  };

  if (length === currentLength + 1) {
    return res.status(200).json({
      status: "success",
      message: "success",
      result: data,
      total_user_answer_count,
    });
  }
}

checkIp = (ques_id, ipAddress, callback) => {
  db.query(
    "SELECT ip_address FROM tbl_question_answer where ques_id = ? AND ip_address = ?",
    [ques_id, ipAddress],
    (err, extRes) => {
      if (err) {
        return callback({ error: true, message: err.sqlMessage });
      } else {
        if (extRes.length > 0) {
          return callback({ error: false, ipAddress: extRes[0].ip_address });
        } else {
          return callback({ error: false, ipAddress: "" });
        }
      }
    }
  );
};
