<script>
import { VOverlay, VProgressCircular } from "vuetify/lib";
import { deleteItem, getList } from "@/api/api";
import TableView from "./TableView";

export default {
  name: "ListView",

  props: {
    model: { type: String, required: true },
  },

  data: () => ({
    data: [],
    loading: false,
  }),

  computed: {
    schema() {
      return this.$store.getters.schema(this.model);
    },
    fields() {
      return this.$store.getters.fields(this.model);
    },
  },

  render(h) {
    if (this.loading)
      return h(VOverlay, [
        h(VProgressCircular, { props: { indeterminate: true, size: 64 } }),
      ]);

    return h(TableView, {
      props: { data: this.data, schema: this.schema },
      on: { delete: this.delete },
    });
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      this.loading = true;
      this.data = await getList(this.model, this.fields);
      this.loading = false;
    },

    async delete(id) {
      this.loading = true;
      await deleteItem(this.model, id);
      await this.loadData();
      this.loading = false;
    },
  },
};
</script>
