<template>
  <label></label>
  <select
    class="inputs-form"
    id="currency"
    @change="SelectOptionValue"
    v-model="selectValue"
  >
    <option selected disabled hidden>{{ defaultSelected }}</option>
    <option v-for="item in data" :key="item">{{ item.code }}</option>
  </select>
</template>

<script>
import { ref } from "vue";
export default {
  name: "optionSelectComponent",

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

  setup(props, { emit }) {
    const selectValue = ref(props.defaultSelected);

    function SelectOptionValue(item) {
      emit("optionSelectComponentValue", item.target.value);
    }

    return { SelectOptionValue, selectValue };
  },
};
</script>

<style scoped lang="scss">
.inputs-form {
  height: 49px;
  max-width: 317px;
  width:100%;
  color: black;
  border-radius: 8px;
  border: 1px solid black;

  padding: 10px;

  *:focus {
    outline: none;
  }
}
</style>
