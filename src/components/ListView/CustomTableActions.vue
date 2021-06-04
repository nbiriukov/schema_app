<template>
  <div>
    <v-btn :to="itemPath" icon>
      <v-icon small>mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon @click="$emit('delete')">
      <v-icon small>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "CustomTableActions",

  props: {
    id: { type: [Number, String], required: true },
  },

  computed: {
    itemPath() {
      return `${this.$route.path}/${this.id}`;
    },
  },
};
</script>
