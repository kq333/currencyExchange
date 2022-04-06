<template>
  <label></label>
  <select
    class="inputs-form"
    id="numbers"
    @change="SelectOptionValue"
    v-model="selectValue"
  >
    <option selected disabled hidden>{{ num }}</option>
    <option v-for="item in data" :key="item">{{ item }}</option>
  </select>
</template>

<script>
import { ref } from "vue";
export default {
  name: "optionSelectNumberComponent",

  props: {
    data: {
      type: Array,
      required: true,
    },
    num: {
      type: String,
      default: "Num",
    },
  },

  setup(props, { emit }) {
    const selectValue = ref(props.num);

    function SelectOptionValue(item) {
      emit("pickedNumValue", item.target.value);
    }

    return { SelectOptionValue, selectValue };
  },
};
</script>

<style scoped lang="scss">
.inputs-form {
  height: 49px;
  width: 317px;
  color: black;
  border-radius: 8px;
  border: 1px solid black;
  padding: 10px;

  *:focus {
    outline: none;
  }
}
</style>
