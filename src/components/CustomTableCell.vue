<script>
import { VBadge } from "vuetify/lib";

export default {
  name: "CustomTableCell",

  props: {
    value: { type: [Number, String, Boolean, Object, Array], required: true },
    schema: { type: Object, required: true },
  },

  render(h) {
    if (this.schema.type === "boolean") {
      return h(VBadge, {
        props: { color: this.value ? "green" : "red", dot: true },
      });
    }
    return h("span", { class: this.schema.cssClass }, this.value);
  },
};
</script>
