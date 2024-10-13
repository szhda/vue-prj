<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) return
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      if (this.value >= 99) return
      this.$emit('input', this.value + 1)
    },
    // change事件，只有在失去焦点或者回车的时候触发
    handleChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num <= 0 || num % 1 !== 0) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
