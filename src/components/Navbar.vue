<template>
  <v-navigation-drawer permanent app>
    <v-list dense nav>
      <navbar-item v-for="(item, i) in menu" :key="i" :item="item" />

      <v-list-item to="/about" link>
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import NavbarItem from "./NavbarItem";

export default {
  name: "Navbar",

  components: {
    NavbarItem,
  },

  computed: {
    ...mapGetters(["menu"]),
  },
};
</script>
