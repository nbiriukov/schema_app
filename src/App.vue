<template>
  <v-app>
    <navbar />

    <v-app-bar app>
      <v-toolbar-title>Schema App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import { getSchema } from "@/api/api";
import Navbar from "@/components/Navbar";
import ItemView from "@/components/ItemView/ItemView";
import ListView from "@/components/ListView/ListView";

export default {
  name: "App",

  components: {
    Navbar,
  },

  created() {
    this.loadRoutes();
  },

  methods: {
    ...mapMutations(["setSchema"]),
    async loadRoutes() {
      const schema = await getSchema();
      this.setSchema(schema);
      this.addRoutes(schema.menu);
    },
    addRoutes(menu) {
      menu.forEach(({ model, items, single }) => {
        if (items) {
          this.addRoutes(items);
        }

        if (!model) return;

        if (single) {
          this.addItemRoute(model, `/${model}`);
        } else {
          this.addListRoute(model);
          this.addItemRoute(model, `/${model}/:id`);
        }
      });
    },
    addListRoute(model) {
      this.$router.addRoute({
        path: `/${model}`,
        component: ListView,
        props: { model },
      });
    },
    addItemRoute(model, path) {
      this.$router.addRoute({
        path,
        component: ItemView,
        props: (route) => ({
          id: route.params.id,
          model,
        }),
      });
    },
  },
};
</script>
