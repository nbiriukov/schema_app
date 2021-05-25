<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1>This is a table view for {{ $route.path }}</h1>

      <v-btn :to="`${$route.path}/_`">Add</v-btn>
    </div>

    <custom-table :items="data" :headers="headers" :id-prop="idProp" />
  </v-container>
</template>

<script>
import { getIdProp } from "@/services/schemaService";
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
        ...Object.entries(this.schema.properties || []).map(
          ([value, schema]) => ({
            text: schema.description,
            value: value,
            sortable: schema.sortable !== false,
            schema,
          })
        ),
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ];
    },
    idProp() {
      return getIdProp(this.schema);
    },
  },
};
</script>
