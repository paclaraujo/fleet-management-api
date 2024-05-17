const { getPagination } = require("../utils/pagination");
const taxisService = require("../services/taxis")

module.exports = {
  getTaxis: async (req, res) => {
    const pagination = getPagination(req.query.page);

    try {
      const taxis = await taxisService.getTaxis(pagination);
      return res.json(taxis);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getTaxisByIdAndTrajectoriesDate: async (req, res) => {
    const pagination = getPagination(req.query.page);
    const taxiId = parseInt(req.params.id);
    const date = new Date(req.params.date);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1)

    try {
      const taxiTrajectories = await taxisService.getTaxisByIdAndTrajectoriesDate(taxiId, date, nextDay, pagination);
      return res.json(taxiTrajectories);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
  getTaxisLastTrajectorie: async (req, res) => {
    const pagination = getPagination(req.query.page);

    try {
      const taxisLastTrajectories = await taxisService.getTaxisLastTrajectorie(pagination);
      return res.json(taxisLastTrajectories);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
