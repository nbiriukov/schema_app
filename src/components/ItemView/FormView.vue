<template>
  <v-container>
    <h1>This is a form view for {{ $route.path }}</h1>

    <FormGroup
      v-for="field in schema.fields"
      :key="field.name"
      :validator="$v.form[field.name]"
    >
      <template v-slot="{ attrs }">
        <FormInput
          v-model="form[field.name]"
          v-bind="attrs"
          :schema="field"
          @input="$v.form[field.name].$touch()"
        />
      </template>
    </FormGroup>

    <v-btn @click="submit">Save</v-btn>

    <div>{{ data }}</div>
    <div>{{ form }}</div>
  </v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import FormGroup from "../FormGroup";
import FormInput from "./FormInput";

export default {
  name: "FormView",

  components: {
    FormGroup,
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

  validations() {
    return {
      form: {
        ...this.schema.fields.reduce((validations, field) => {
          const fieldValidation = {};
          validations[field.name] = fieldValidation;

          if (field.required) {
            fieldValidation.required = required;
          }

          return validations;
        }, {}),
      },
    };
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.$emit("submit", this.form);
    },
  },
};
</script>
