import express from "express";
import { BASE_API_URL } from "../config/base-api";
import { ErrorMessages } from "../config/errors";
import { roundRobin } from "../helpers/round-robin";
import { startHealthcheck } from "../helpers/start-healthcheck";
import { BALANCER_PORT } from "../ports";

const app = express();

startHealthcheck();

const sendTo = roundRobin();

app.get("/", (req, res) => {
  const serverConfig = sendTo.next().value;

  if (serverConfig && serverConfig["error"]) {
    res.status(503).send(ErrorMessages.ServiceUnavailable);
    return;
  }

  const serverUrl = `${BASE_API_URL}:${serverConfig.port}`;

  fetch(serverUrl)
    .then((response) => response.text())
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      res.status(502).send(ErrorMessages.BadGateway);
    });
});

app.listen(BALANCER_PORT, () => {
  console.log(`Balancer is running on port ${BALANCER_PORT}`);
});
