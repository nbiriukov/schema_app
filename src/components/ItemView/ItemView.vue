<script>
import { VOverlay, VProgressCircular } from "vuetify/lib";
import { getItem, createItem } from "@/api/api";
import { extractTableRoute } from "@/services/routeService";
import FormView from "./FormView";

export default {
  name: "ItemView",

  props: {
    model: { type: String, required: true },
    id: { type: String, default: null },
  },

  data: () => ({
    item: {},
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
      props: { data: this.item, schema: this.schema },
      on: { submit: this.submit },
    });
  },

  created() {
    if (this.id === "_") {
      this.createEmptyItem();
    } else {
      this.loadItem();
    }
  },

  methods: {
    async loadItem() {
      this.loading = true;
      this.item = await getItem(this.model, this.fields, this.id);
      this.loading = false;
    },
    createEmptyItem() {
      this.item = {};
    },
    async submit(item) {
      console.log("submit", item);

      await createItem(this.model, this.fields, item);
      /*if (isNewRoute(formPath)) {
        this.$emit("submit");
        postData(tablePath, this.form);
      } else {
        putData(formPath, this.form);
      }*/

      const tablePath = extractTableRoute(this.$route.path);
      this.$router.push(tablePath);
    },
  },
};
</script>
