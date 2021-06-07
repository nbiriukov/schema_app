export const extractTableRoute = (route) =>
  route
    .split("/")
    .filter((_, i, arr) => i !== arr.length - 1)
    .join("/");

export const newRouteId = "_";
