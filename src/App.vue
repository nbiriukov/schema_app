<template>
  <v-app>
    <navbar :routes="routes" />

    <v-app-bar app>
      <v-toolbar-title>Schema App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
import { getRoutes } from "@/api/api";
import Navbar from "@/components/Navbar";
import LoaderView from "@/components/LoaderView";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    routes: [],
  }),

  created() {
    this.loadRoutes();
  },

  methods: {
    async loadRoutes() {
      this.routes = await getRoutes();
      this.addRoutes(this.routes);
    },
    addRoutes(routes) {
      routes.forEach(({ route, items, single }) => {
        if (items) {
          this.addRoutes(items);
        }
        if (!route) return;
        this.$router.addRoute({
          path: route,
          component: LoaderView,
        });
        if (single) return;
        this.$router.addRoute({
          path: `${route}/:id`,
          component: LoaderView,
        });
      });
    },
  },
};
</script>
