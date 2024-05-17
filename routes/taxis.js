const express = require("express");
const router = express.Router();
const {
  getTaxis,
  getTaxisByIdAndTrajectoriesDate,
  getTaxisLastTrajectorie,
} = require("../controllers/taxis.js");

router.get("/taxis", getTaxis);
router.get("/taxis/:id/trajectories/:date", getTaxisByIdAndTrajectoriesDate);
router.get("/taxis/trajectories/last", getTaxisLastTrajectorie);

module.exports = router;
