<template>
  <div
    class="category-title"
    @click="$emit('handelafter')"
  >
    <span class="title">
      <i
        v-if="showpre"
        class="pre"
      ></i>
      {{title}}
    </span>
    <div class="more">
      <i
        class="icon icon-suo"
        v-if="showsuo"
      ></i>
      {{after}}
      <i
        class="icon"
        :class="{arrows:showicon}"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "category-title",
  props: {
    title: {
      type: String,
      required: true
    },
    after: {
      type: [String, Number],
      required: true
    },
    showpre: {
      type: Boolean,
      default: true
    },
    showicon: {
      type: Boolean,
      default: true
    },
    showsuo: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handelClick() {}
  }
};
</script>

<style lang="less">
@import url("./category-title.less");
</style>
