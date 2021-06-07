import axios from "axios";
import delay from "delay";
import { upperCaseFirst } from "upper-case-first";
import { splitRoute } from "@/services/routeService";
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

const stringifyParams = (params) => {
  if (!params) return "";
  const paramsStr = Object.entries(params)
    .reduce((result, [prop, value]) => [...result, `${prop}: ${value}`], [])
    .join(", ");
  console.log(paramsStr);
  return `(${paramsStr})`;
};

const formatValue = (value) =>
  typeof value === "string" ? `"${value}"` : value;

const formatInput = (item) =>
  Object.entries(item)
    .map(([key, value]) => `${key}: ${formatValue(value)}`)
    .join(" ");

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
};

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

export const getList = (model, fields) => {
  return getData(model, fields);
};

export const getItem = async (model, fields, id) => {
  const params = id ? { id } : null;

  const list = await getData(model, fields, params);
  return list[0];
};

export const createItem = async (model, item) => {
  const query = `
    mutation createItem {
      create${upperCaseFirst(model)}(
        input: {
          ${formatInput(item)}
        }
      ) {
        id
      }
    }`;

  const {
    data: { data },
  } = await request(query);

  return data[model];
};

export const updateItem = async (model, id, item) => {
  const query = `
    mutation updateItem {
      update${upperCaseFirst(model)}(
        id: ${formatValue(id)}
        input: {
          ${formatInput(item)}
        }
      ) {
        id
      }
    }`;

  const {
    data: { data },
  } = await request(query);

  return data[model];
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
  const idProp = "id";
  mock.data = mock.data.map((item) =>
    String(item[idProp]) === id ? form : item
  );
};

export const deleteData = async (route) => {
  await delay(1000);

  const routeArray = splitRoute(route);
  const mock = mocks[routeArray[0]];

  const id = routeArray[1];
  const idProp = "id";
  mock.data = mock.data.filter((item) => String(item[idProp]) !== id);
};
