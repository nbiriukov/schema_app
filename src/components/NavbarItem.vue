<template>
  <v-list-group v-if="item.items" :value="true" link>
    <template v-slot:activator>
      <v-list-item-title>{{ item.title }} </v-list-item-title>
    </template>

    <v-list dense nav>
      <navbar-item v-for="(item, i) in item.items" :key="i" :item="item" />
    </v-list>
  </v-list-group>

  <v-list-item v-else :to="item.route" link>
    <v-list-item-title>{{ item.title }} </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: "NavbarItem",

  props: {
    item: { type: Object, required: true },
  },
};
</script>
