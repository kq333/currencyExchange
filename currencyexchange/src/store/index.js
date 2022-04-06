import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    tableA: [],
    tableB: [],
    numbers: [
      10, 20, 30, 40, 50, 60, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800,
      900, 1000,
    ],
    currency1: "",
    currency2: "",
    pickedNum: "",
  },

  getters: {
    filterCurrency: () => (arr, param) => {
      if (param == 0) {
        return null;
      } else {
        const filterData = arr.find((item) => item.code === param);
        return new Array(filterData).map((item) => item.mid);
      }
    },

    calculator: (state, getters) => {
      if (
        state.currency1.length &&
        state.currency2.length &&
        state.pickedNum.length
      ) {
        return (
          (getters.filterCurrency(state.tableA, state.currency1) /
            getters.filterCurrency(state.tableB, state.currency2)) *
          state.pickedNum
        ).toFixed(2);
      } else {
        return null;
      }
    },
  },

  mutations: {
    FETCHED_DATA_A(state, payload) {
      state.tableA = payload;
    },

    FETCHED_DATA_B(state, payload) {
      state.tableB = payload;
    },

    CURRENCY_ONE(state, payload) {
      state.currency1 = payload;
    },

    CURRENCY_TWO(state, payload) {
      state.currency2 = payload;
    },

    PICKED_NUM_VALUE(state, payload) {
      state.pickedNum = payload;
    },
  },
  actions: {
    async fetchTableA({ commit }) {
      try {
        const dataTableA = await axios.get(
          "http://api.nbp.pl/api/exchangerates/tables/a/"
        );
        commit("FETCHED_DATA_A", dataTableA.data[0].rates);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchTableB({ commit }) {
      try {
        const dataTableB = await axios.get(
          "http://api.nbp.pl/api/exchangerates/tables/b/"
        );

        commit("FETCHED_DATA_B", dataTableB.data[0].rates.slice(0, 34));
      } catch (error) {
        console.log(error);
      }
    },

    currencyOne({ commit }, payload) {
      commit("CURRENCY_ONE", payload);
    },

    currencyTwo({ commit }, payload) {
      commit("CURRENCY_TWO", payload);
    },

    pickedNumValue({ commit }, payload) {
      commit("PICKED_NUM_VALUE", payload);
    },
  },
  modules: {},
});
