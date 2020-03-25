const conn = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await conn("incidents").count();

    const incidents = await conn("incidents")
      .select("*")
      .limit(5)
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .offset((page - 1) * 5);

    res.header("X-Total-Count", count["count(*)"]);

    return res.json(incidents);
  },

  async create(req, res) {
    const { authorization: ong_id } = req.headers;
    const { title, description, value } = req.body;

    const [id] = await conn("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { authorization: ong_id } = req.headers;
    const { id } = req.params;

    const incident = await conn("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(403).json({ error: "Operation not permitted." });
    }

    await conn("incidents")
      .where("id", id)
      .del();

    return res.status(204).send();
  }
};
