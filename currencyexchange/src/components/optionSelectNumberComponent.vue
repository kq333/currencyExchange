<template>
  <input
    type="number"
    min="0"
    @input="(e) => $emit('update:num-value', e.target.value)"
    :value="numValue"
    class="inputs-form"
  />
</template>

<script>
export default {
  name: "OptionSelectNumberComponent",

  props: {
    numValue: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.inputs-form {
  height: 30px;
  max-width: 293px;
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
