import axios from "axios";
import delay from "delay";
import { splitRoute } from "@/services/routeService";
import { getIdProp } from "@/services/schemaService";
import dc from "./dc.json";
import hub from "./hub.json";
import partner from "./partner.json";
import shift from "./shift.json";
import settings from "./settings.json";

const mocks = {
  dc,
  hub,
  partner,
  shift,
  settings,
};

const request = (query) =>
  axios.post("http://localhost:8080/query/us", { query });

export const getSchema = async () => {
  const query = `
    query getSchema {
      schema
    }`;

  const {
    data: {
      data: { schema },
    },
  } = await request(query);

  return schema;
};

const stringifyParams = (params) => {
  if (!params) return "";
  const paramsStr = Object.entries(params)
    .reduce((result, [prop, value]) => [...result, `${prop}: ${value}`], [])
    .join(", ");
  console.log(paramsStr);
  return `(${paramsStr})`;
};

const getData = async (model, fields, params) => {
  const query = `
    query getData {
      ${model}${stringifyParams(params)} {
        ${fields.join(" ")}
      }
    }`;

  const {
    data: { data },
  } = await request(query);

  return data[model];

  /*const routeArray = splitRoute(route);
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

  return mock;*/
};

export const getList = (model, fields) => {
  return getData(model, fields);
};

export const getItem = async (model, fields, id) => {
  const params = id ? { id } : null;

  const list = await getData(model, fields, params);
  return list[0];
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
