import { ServerConfig, SERVERS } from "../ports";
import { nextHealthy } from "./next-healthy";

export function* roundRobin(): Generator<ServerConfig | { error: boolean }> {
  let index = 0;

  while (true) {
    const servers = Object.values(SERVERS);
    console.log(
      `Balancer is forwarding request to: ${servers[index].name} (Port: ${servers[index].port})`,
    );

    if (servers[index].status === "FAIL") {
      const nextHealthyData = nextHealthy(Object.values(SERVERS), index + 1);
      if (!nextHealthyData) {
        yield { error: true };
        continue;
      } else {
        index = nextHealthyData.id;
        continue;
      }
    }

    let left = servers[index].weight;

    while (left > 0) {
      yield servers[index];
      left--;
    }

    index = (index + 1) % servers.length;
  }
}
