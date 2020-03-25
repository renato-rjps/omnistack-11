const conn = require("../database/connection");

module.exports = {
  async auth(req, res, next) {
    try {
      const { id } = req.body;
      const ong = await conn("ongs")
        .select("name")
        .where("id", id)
        .first();

      if (!ong) {
        return res.status(403).json({ error: "No ong found with this id." });
      }

      return res.json({ name: ong.name });
    } catch (err) {
      next(err);
    }
  }
};
