export interface ServerConfig {
  name: string;
  port: number;
  weight: number;
  status: "OK" | "FAIL";
}

export const SERVERS: { [key: string]: ServerConfig } = {
  SERVER_1: { name: "Server 1", port: 3001, weight: 1, status: "OK" },
  SERVER_2: { name: "Server 2", port: 3002, weight: 1, status: "OK" },
  SERVER_3: { name: "Server 3", port: 3003, weight: 2, status: "OK" },
};

export const BALANCER_PORT = 3000;
