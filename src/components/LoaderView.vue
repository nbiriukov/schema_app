<script>
import { VOverlay, VProgressCircular } from "vuetify/lib";
import { getData } from "@/api/api";
import FormView from "./FormView";
import TableView from "./TableView";

export default {
  name: "LoaderView",

  components: {
    FormView,
    TableView,
  },

  data: () => ({
    data: [],
    schema: {},
    loading: false,
  }),

  render(h) {
    if (this.loading)
      return h(VOverlay, [
        h(VProgressCircular, { props: { indeterminate: true, size: 64 } }),
      ]);

    const component = Array.isArray(this.data) ? TableView : FormView;
    return h(component, { props: { data: this.data, schema: this.schema } });
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      this.loading = true;
      const { data, schema } = await getData(this.$route.path);
      this.data = data;
      this.schema = schema;
      this.loading = false;
    },
  },
};
</script>
