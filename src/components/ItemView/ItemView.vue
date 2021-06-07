<script>
import { VOverlay, VProgressCircular } from "vuetify/lib";
import { getItem } from "@/api/api";
import FormView from "./FormView";

export default {
  name: "ItemView",

  props: {
    model: { type: String, required: true },
    id: { type: String, default: null },
  },

  data: () => ({
    data: {},
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

    return h(FormView, {
      props: { data: this.data, schema: this.schema },
    });
  },

  created() {
    if (this.id === "_") {
      this.createEmptyData();
    } else {
      this.loadData();
    }
  },

  methods: {
    async loadData() {
      this.loading = true;
      this.data = await getItem(this.model, this.fields, this.id);
      this.loading = false;
    },
    createEmptyData() {
      this.data = {};
    },
  },
};
</script>
