const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const Applicatonmodel = require("../../models/applicationmodel");

router.get("/", auth, async (req, res) => {
  console.log("the value of request.body is " + req.body);
  try {
    // const age =
    //   new Date(Date.now()).getFullYear() -
    //   new Date(req.user.birthdate).getFullYear();

    // console.log("in the giveme age of the user is", age);

    const { year, semister } = req.query;
    console.log(
      "the value of year and semister in the back is " + year + "and" + semister
    );

    const students = await Applicatonmodel.find({
      Field: { $eq: req.user.Departmentname },
      Year: { $eq: year },
      Semister: { $eq: semister },
      Approved: { $eq: true }
    });

    if (!students) {
      res.status(400).json({ msg: "there is no students for this api" });
    }

    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
