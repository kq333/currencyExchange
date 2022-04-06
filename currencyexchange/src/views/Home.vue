<template>
  <div class="home">
    <header>
      <h1>Buy a Currency</h1>
    </header>
    <main class="container">
      <section class="items">
        <div class="items__section-one">
          <p>My Currency</p>
          <optionSelectComponent
            :data="tableA"
            @optionSelectComponentValue="optionSelectComponentOne"
          />
        </div>
        <div class="items__section-two">
          <p>Buy a Currency</p>
          <optionSelectComponent
            :data="tableB"
            @optionSelectComponentValue="optionSelectComponentTwo"
          />
        </div>
        <div class="items__section-tree">
          <p>Pick a amount of money</p>
          <optionSelectNumberComponent
            :data="selectNumbers"
            @pickedNumValue="pickedNumValue"
          />
        </div>
        <div class="items__totalPrice">Total: {{ calculator }} PLN</div>
      </section>
    </main>
  </div>
</template>

<script>
import optionSelectComponent from "@/components/optionSelectComponent.vue";
import optionSelectNumberComponent from "@/components/optionSelectNumberComponent.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    optionSelectComponent,
    optionSelectNumberComponent,
  },

  setup() {
    onMounted(() => {
      store.dispatch("fetchTableA");
      store.dispatch("fetchTableB");
    });

    const store = useStore();
    const tableA = computed(() => store.state.tableA);
    const tableB = computed(() => store.state.tableB);
    const selectNumbers = computed(() => store.state.numbers);
    const calculator = computed(() => store.getters.calculator);

    function optionSelectComponentOne(payload) {
      store.dispatch("currencyOne", payload);
    }

    function optionSelectComponentTwo(payload) {
      store.dispatch("currencyTwo", payload);
    }

    function pickedNumValue(payload) {
      store.dispatch("pickedNumValue", payload);
    }

    return {
      store,
      tableA,
      tableB,
      selectNumbers,
      optionSelectComponentOne,
      optionSelectComponentTwo,
      pickedNumValue,
      calculator,
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

    .items {
      background-color: #f0f8ff;
      padding: 20px;
      border-radius: 8px;

      &__section-one {
        margin-left: 35%;
      }
      &__section-two {
        margin-left: 35%;
        margin-top: 40px;
      }
      &__section-tree {
        margin-left: 35%;
        margin-top: 30px;
      }
      &__totalPrice {
        margin-top: 30px;
        text-align: center;
        font-weight: 700;
      }

      p {
        margin-left: 15%;
        font-weight: 700;
      }
    }
  }
}
</style>
