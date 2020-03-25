const conn = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index(req, res) {
    const { authorization: ong_id } = req.headers;
    const ongs = await conn("incidents")
      .select("*")
      .where("ong_id", ong_id);
    return res.json(ongs);
  }
};
