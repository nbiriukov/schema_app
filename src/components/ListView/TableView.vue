<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1>This is a table view for {{ $route.path }}</h1>

      <v-btn :to="`${$route.path}/${newRouteId}`">Add</v-btn>
    </div>

    <custom-table
      :items="data"
      :headers="headers"
      :id-prop="idProp"
      @delete="$emit('delete', $event)"
    />
  </v-container>
</template>

<script>
import { newRouteId } from "@/services/routeService";
import CustomTable from "./CustomTable";

export default {
  name: "TableView",

  components: {
    CustomTable,
  },

  props: {
    data: { type: Array, required: true },
    schema: { type: Object, required: true },
  },

  computed: {
    headers() {
      return [
        ...this.schema.fields.map((field) => ({
          text: field.description,
          value: field.name,
          sortable: field.sortable !== false,
          schema: field,
        })),
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ];
    },
    idProp() {
      return this.$store.getters.idProp(this.schema);
    },
    newRouteId() {
      return newRouteId;
    },
  },
};
</script>
