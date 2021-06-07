<template>
  <v-container>
    <h1>This is a form view for {{ $route.path }}</h1>
    <FormInput
      v-for="field in schema.fields"
      :key="field.name"
      :schema="field"
      v-model="form[field.name]"
    />

    <v-btn @click="$emit('submit', form)">Save</v-btn>

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
    data: { type: Object, default: () => ({}) },
    schema: { type: Object, required: true },
  },

  data() {
    return {
      form: { ...this.data },
    };
  },
};
</script>
