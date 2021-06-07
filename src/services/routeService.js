export const splitRoute = (route) => route.split("/").filter(String);

export const extractTableRoute = (route) =>
  route
    .split("/")
    .filter((_, i, arr) => i !== arr.length - 1)
    .join("/");

export const newRouteId = "_";

export const isNewRoute = (route) => route.split("/").pop() === newRouteId;
