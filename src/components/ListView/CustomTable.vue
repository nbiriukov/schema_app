<script>
import { VDataTable } from "vuetify/lib";
import CustomTableActions from "./CustomTableActions";
import CustomTableCell from "./CustomTableCell";

export default {
  name: "CustomTable",

  props: {
    items: { type: Array, required: true },
    headers: { type: Array, required: true },
    idProp: { type: String, deault: "" },
  },

  render(h) {
    const scopedSlots = this.headers.reduce(
      (slots, { value: header, schema }) => {
        slots[`item.${header}`] = this.createCell(h, header, schema);
        return slots;
      },
      {}
    );

    return h(VDataTable, {
      props: { items: this.items, headers: this.headers },
      scopedSlots,
    });
  },

  methods: {
    createCell(h, header, schema) {
      return ({ item }) => {
        const id = item[this.idProp];

        return header === "actions"
          ? h(CustomTableActions, {
              props: { id },
              on: { delete: () => this.$emit("delete", id) },
            })
          : h(CustomTableCell, { props: { value: item[header], schema } });
      };
    },
  },
};
</script>
