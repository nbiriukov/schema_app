<script>
import { VOverlay, VProgressCircular } from "vuetify/lib";
import { getItem, createItem, updateItem } from "@/api/api";
import { extractTableRoute, newRouteId } from "@/services/routeService";
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
    isNew() {
      return this.id === newRouteId;
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
    if (this.isNew) {
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
      const enabledValues = Object.fromEntries(
        Object.entries(item).filter((_, i) => {
          return !this.schema.fields[i].disabled;
        })
      );

      if (this.isNew) {
        await createItem(this.model, enabledValues);
      } else {
        await updateItem(this.model, item.id, enabledValues);
      }

      const tablePath = extractTableRoute(this.$route.path);
      this.$router.push(tablePath);
    },
  },
};
</script>
