import { ServerConfig } from "../ports";

export const nextHealthy = (
  list: ServerConfig[],
  initId: number | undefined = 0,
): { server: ServerConfig; id: number } | null => {
  const before = list.slice(0, initId);
  const after = list.slice(initId, list.length);
  const isOK = ({ status }: ServerConfig) => status === "OK";

  console.log("before: ", before);
  console.log("after: ", after);

  const afterId = after.findIndex(isOK);
  console.log("afterId: ", afterId);
  if (afterId > -1) {
    return { server: list[afterId], id: afterId + initId };
  }

  const beforeId = before.findIndex(isOK);
  console.log("beforeId: ", beforeId);
  if (beforeId > -1) {
    return { server: list[beforeId], id: beforeId };
  }

  return null;
};
