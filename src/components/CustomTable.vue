<script>
import { VDataTable, VIcon } from "vuetify/lib";
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
      if (header === "actions") {
        return ({ item }) => {
          const path = `${this.$route.path}/${item[this.idProp]}`;
          const icon = h(VIcon, { props: { small: true } }, ["mdi-pencil"]);

          return h("router-link", { props: { to: path } }, [icon]);
        };
      }
      return (props) =>
        h(CustomTableCell, { props: { value: props.item[header], schema } });
    },
  },
};
</script>
