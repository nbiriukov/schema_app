import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    schema: {},
  },

  getters: {
    menu: (state) => state.schema.menu,
    schema: (state) => (model) => state.schema[model],
    fields:
      (_, { schema }) =>
      (model) =>
        Object.keys(schema(model)?.properties),
  },

  mutations: {
    setSchema(state, schema) {
      state.schema = schema;
    },
  },
});
