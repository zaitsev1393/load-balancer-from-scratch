# load-balancer-from-scratch

A naive HTTP load balancer built from scratch in TypeScript — for learning purposes. The goal was to understand how load balancing works internally before using production tools like nginx.

## What's implemented

- **Weighted round robin** — requests are distributed across servers in order, with configurable weights per server
- **Health checks** — balancer pings each server's `/health` endpoint every 5 seconds and removes unhealthy servers from rotation
- **Failover** — if the current server is down, the balancer finds the next healthy one automatically

## Details

- **Server fail logic** - currently set to be random with 50/50 probability of failing

## Structure

```
balancer/       — load balancer (port 3000)
server1/        — upstream server (port 3001, weight 1)
server2/        — upstream server (port 3002, weight 1)
server3/        — upstream server (port 3003, weight 2)
helpers/        — round robin logic, health check, failover
config/         — shared constants
ports.ts        — server registry with weights and status
```

## Run

```bash
npm install
npm start
```

Then hit `http://localhost:3000` multiple times — responses will cycle between servers according to their weights.
