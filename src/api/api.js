import axios from "axios";
import { upperCaseFirst } from "upper-case-first";

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

export const deleteItem = async (model, id) => {
  const query = `
    mutation deleteItem {
      delete${upperCaseFirst(model)}(
        id: ${formatValue(id)}
      )
    }`;

  await request(query);
};
