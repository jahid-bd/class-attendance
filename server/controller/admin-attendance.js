const AdiminAttendance = require("../models/AdiminAttendance");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const getEnable = async (req, res, next) => {
  try {
    const running = await AdiminAttendance.findOne({ status: "RUNNING" });

    if (running) throw error("Already Running", 400);

    const attendance = new AdiminAttendance({});
    await attendance.save();

    return res.status(201).json({ message: "Success", attendance });
  } catch (e) {
    next(e);
  }
};

const getDisable = async (req, res, next) => {
  try {
    const running = await AdiminAttendance.findOne({ status: "RUNNING" });

    if (!running) throw error("Not Running", 400);

    running.status = "COMPLETED";
    await running.save();

    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getDisable,
  getEnable,
};
