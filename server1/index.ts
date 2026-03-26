import { SERVERS } from "../ports";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server 1!");
});

app.get("/health", (req, res) => {
  res.json(Math.random() < 0.5 ? "OK" : "FAIL");
});

app.listen(SERVERS.SERVER_1.port, () => {
  console.log(`Server 1 is running on port ${SERVERS.SERVER_1.port}`);
});
