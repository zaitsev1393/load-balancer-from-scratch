import { BASE_API_URL } from "../config/base-api";
import { SERVERS } from "../ports";

const HEALTH_CHECK_INTERVAL = 5000;

export const startHealthcheck = (): void => {
  setInterval(() => {
    const urls = Object.values(SERVERS)
      .map(({ port }) => port)
      .map((port) => `${BASE_API_URL}:${port}`);

    urls.forEach((url, i) => {
      const curentServerConfig = SERVERS[Object.keys(SERVERS)[i]];
      fetch(url + "/health")
        .then(async (resp) => {
          try {
            const status = await resp.json();

            curentServerConfig.status = status;
          } catch (e) {
            console.error("error: ", e);
          }
        })
        .catch((err) => {
          curentServerConfig.status = "FAIL";
        });
    });
  }, HEALTH_CHECK_INTERVAL);
};
