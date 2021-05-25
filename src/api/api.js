import delay from "delay";
import { getIdProp } from "@/services/schemaService";
import dc from "./dc.json";
import hub from "./hub.json";
import partner from "./partner.json";
import routes from "./routes.json";
import shift from "./shift.json";
import settings from "./settings.json";

const mock = {
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
  const routeArray = route.split("/").filter(String);
  await delay(1000);

  const response = mock[routeArray[0]];

  if (routeArray.length === 2) {
    const id = routeArray[1];
    const idProp = getIdProp(response.schema);
    const item = response.data.find((item) => String(item[idProp]) === id);
    return { data: item, schema: response.schema };
  }
  return response;
};
