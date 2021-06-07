<script>
import { VCheckbox, VSelect, VTextField } from "vuetify/lib";

export default {
  name: "FormInput",

  props: {
    value: { type: [Number, String, Boolean, Object, Array], default: null },
    schema: { type: Object, required: true },
  },

  render(h) {
    const { type, description: label, disabled, enum: items } = this.schema;
    const value = this.value;

    const fixFormat = (value) => {
      if (type === "number") return Number(value);
      if (type === "boolean") return Boolean(value);
      return String(value);
    };
    const input = (value) => this.$emit("input", fixFormat(value));

    if (type === "boolean")
      return h(VCheckbox, {
        props: { inputValue: value, label, disabled },
        on: { change: input },
      });
    if (type === "string" && items) {
      return h(VSelect, {
        props: { value, label, disabled, items },
        on: { input },
      });
    }

    return h(VTextField, { props: { value, label, disabled }, on: { input } });
  },
};
</script>
