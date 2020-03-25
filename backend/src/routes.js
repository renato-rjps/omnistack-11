const express = require("express");

const OngController = require("./services/OngController");
const IncidentController = require("./services/IncidentController");
const ProfileController = require("./services/ProfileController");
const SessionController = require("./services/SessionController");

const routes = express.Router();

routes.post("/auth", SessionController.auth);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/profile", ProfileController.index);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;
