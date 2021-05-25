<template>
  <v-container>
    <h1>This is a form view for {{ $route.path }}</h1>
    <FormInput
      v-for="(schema, prop) in schema.properties"
      :key="prop"
      :schema="schema"
      v-model="form[prop]"
    />

    <div>{{ data }}</div>
    <div>{{ form }}</div>
  </v-container>
</template>

<script>
import FormInput from "./FormInput";

export default {
  name: "FormView",

  components: {
    FormInput,
  },

  props: {
    data: { type: Object, required: true },
    schema: { type: Object, required: true },
  },

  data() {
    return {
      form: { ...this.data },
    };
  },
};
</script>
