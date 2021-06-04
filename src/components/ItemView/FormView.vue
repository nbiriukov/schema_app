<template>
  <v-container>
    <h1>This is a form view for {{ $route.path }}</h1>
    <FormInput
      v-for="(schema, prop) in schema.properties"
      :key="prop"
      :schema="schema"
      v-model="form[prop]"
    />

    <v-btn @click="save">Save</v-btn>

    <div>{{ data }}</div>
    <div>{{ form }}</div>
  </v-container>
</template>

<script>
import { postData, putData } from "@/api/api";
import { extractTableRoute, isNewRoute } from "@/services/routeService";
import FormInput from "./FormInput";

export default {
  name: "FormView",

  components: {
    FormInput,
  },

  props: {
    data: { type: Object, default: () => ({}) },
    schema: { type: Object, required: true },
  },

  data() {
    return {
      form: { ...this.data },
    };
  },

  methods: {
    save() {
      const formPath = this.$route.path;
      const tablePath = extractTableRoute(formPath);

      if (isNewRoute(formPath)) {
        postData(tablePath, this.form);
      } else {
        putData(formPath, this.form);
      }

      this.$router.push(tablePath);
    },
  },
};
</script>
