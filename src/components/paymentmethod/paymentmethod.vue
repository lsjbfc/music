<template>
  <div class="mask-paymentmethod" style="z-index:30">
    <!-- 付款方式弹窗 -->
    <div class="box">
      <div class="top">
        <i class="icon icon-close" @click="$emit('close')"></i>
        <span>选择付款方式</span>
      </div>
      <div class="methods-list">
        <div
          v-for="(item,index) in data"
          :key="index"
          @click="select(item.Type.Value,item.Amount)"
          :class="{noselect:item.Amount<limit}"
        >
          <i class="icon" :class="item.Type.Value==='1'?'icon-xianjinbao':'icon-touzibao'"></i>
          <div>
            <span>{{item.Type.Text}}</span>
            <span>可用余额{{item.AmountStr }}</span>
          </div>
          <i class="icon" :class="{checked:value===item.Type.Value}"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "paymentmethod",
  props: {
    data: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    limit: { type: [String, Number], required: true }
  },
  methods: {
    select(val, amount) {
      if (amount >= this.limit) {
        this.$emit("input", val);
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="less">
@import url("./paymentmethod.less");
</style>
