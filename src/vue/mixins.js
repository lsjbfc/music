export const loading = {
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("changeLoadStatus", true);
    next();
  },
  data() {
    return {
      isinit: false
    };
  },
  methods: {
    loaded() {
      this.$nextTick(() => {
        this.$store.dispatch("changeLoadStatus", false);
      });
    },
    allloaded(ary) {
      // console.log("aa");
      Promise.all(ary)
        .then(() => {
          this.isinit = true;
          this.loaded();
        })
        .catch(() => {
          this.isinit = true;
          this.loaded();
        });
    }
  }
};
