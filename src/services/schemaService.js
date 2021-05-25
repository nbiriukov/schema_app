export const getIdProp = (schema) => {
  const prop = Object.entries(schema.properties).find(([, { id }]) => id);
  return prop ? prop[0] : null;
};
