<template>
  <select
    class="inputs-form"
    @change="
      (e) => $emit('update:option-select-component-value', e.target.value)
    "
  >
      <option value="" selected disabled>Currency</option>
    <option  v-for="item in data" :key="item.value" :value="item.value">
      {{ item.code }}
    </option>

  </select>
</template>

<script>
export default {
  name: "OptionSelect",

  props: {
    data: {
      type: Array,
      required: true,
    },
    defaultSelected: {
      type: String,
      default: "Currency",
    },
  },
};
</script>

<style scoped lang="scss">
.inputs-form {
  height: 49px;
  max-width: 317px;
  width: 100%;
  color: black;
  border-radius: 8px;
  border: 1px solid black;
  padding: 10px;

  *:focus {
    outline: none;
  }
}
</style>
