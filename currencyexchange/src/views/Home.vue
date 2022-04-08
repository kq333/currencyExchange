<template>
  <div class="home">
    <header>
      <h1>Buy a Currency</h1>
    </header>
    <main class="container">
      <section class="items">
        <div class="items__section">
          <p>My Currency</p>
          <OptionSelectComponent
            :data="tableA"
            v-model:option-select-component-value="optionSelectComponentOne"
          />
        </div>
        <div class="items__section">
          <p>Pick a amount of money</p>
          <OptionSelectNumberComponent v-model:num-value="pickedNumValus" />
        </div>
        <div class="items__section">
          <p>Buy a Currency</p>
          <OptionSelectComponent
            :data="tableB"
            v-model:option-select-component-value="optionSelectComponentTwo"
          />
        </div>
        <div class="items__total-price">
          Total: {{ calculator }} {{ currencyName }}
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import OptionSelectComponent from "@/components/OptionSelectComponent.vue";
import OptionSelectNumberComponent from "@/components/OptionSelectNumberComponent.vue";
import { onMounted, computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    OptionSelectComponent,
    OptionSelectNumberComponent,
  },

  setup() {
    onMounted(() => {
      store.dispatch("fetchCurrencyTable");
    });

    const store = useStore();
    const tableA = computed(() => store.state.tableA);
    const tableB = computed(() => store.state.tableB);
    const calculator = computed(() => store.getters.getCalculator);
    const currencyName = computed(() => store.state.currencyTo);
    const pickedNumValus = ref(null);
    const optionSelectComponentOne = ref(null);
    const optionSelectComponentTwo = ref(null);

    watch(
      [pickedNumValus, optionSelectComponentOne, optionSelectComponentTwo],
      (num, currencyFrom, currencyTo) => {
        if ((num, currencyFrom, currencyTo)) {
          store.dispatch("pickedNumValue", pickedNumValus.value);
          store.dispatch("pickedCurrencyFrom", optionSelectComponentOne.value);
          store.dispatch("pickedCurrencyTo", optionSelectComponentTwo.value);
        }
      }
    );

    return {
      tableA,
      tableB,
      optionSelectComponentOne,
      optionSelectComponentTwo,
      pickedNumValus,
      calculator,
      currencyName,
      store,
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  max-width: 1000px;
  height: 100vh;
  margin: auto;

  h1 {
    color: #d8d8c5;
    display: flex;
    justify-content: center;
  }

  .container {
    margin-top: 50px;
    padding: 10px;

    .items {
      background-color: #f0f8ff;
      padding: 20px;
      border-radius: 8px;
      text-align: center;

      &__total-price {
        margin-top: 30px;
        text-align: center;
        font-weight: 700;
      }

      p {
        font-weight: 700;
      }
    }
  }
}
</style>
