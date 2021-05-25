import delay from "delay";
import { splitRoute } from "@/services/routeService";
import { getIdProp } from "@/services/schemaService";
import dc from "./dc.json";
import hub from "./hub.json";
import partner from "./partner.json";
import routes from "./routes.json";
import shift from "./shift.json";
import settings from "./settings.json";

const mocks = {
  dc,
  hub,
  partner,
  shift,
  settings,
};

export const getRoutes = async () => {
  await delay(1000);
  return routes;
};

export const getData = async (route) => {
  await delay(1000);

  const routeArray = splitRoute(route);
  const mock = mocks[routeArray[0]];

  if (routeArray.length === 2) {
    const id = routeArray[1];

    if (id === "_") {
      return { schema: mock.schema };
    }

    const idProp = getIdProp(mock.schema);
    const item = mock.data.find((item) => String(item[idProp]) === id);
    return { data: item, schema: mock.schema };
  }

  return mock;
};

export const postData = async (route, form) => {
  await delay(1000);

  const routeArray = splitRoute(route);
  const mock = mocks[routeArray[0]];

  mock.data.push(form);
};

export const putData = async (route, form) => {
  await delay(1000);

  const routeArray = splitRoute(route);
  const mock = mocks[routeArray[0]];

  const id = routeArray[1];
  const idProp = getIdProp(mock.schema);
  mock.data = mock.data.map((item) =>
    String(item[idProp]) === id ? form : item
  );
};

export const deleteData = async (route) => {
  await delay(1000);

  const routeArray = splitRoute(route);
  const mock = mocks[routeArray[0]];

  const id = routeArray[1];
  const idProp = getIdProp(mock.schema);
  mock.data = mock.data.filter((item) => String(item[idProp]) !== id);
};
