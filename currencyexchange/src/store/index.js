import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    tableA: [],
    tableB: [],
    currencyFrom: "",
    currencyTo: "",
    pickedNum: "",
  },

  getters: {
    getFilterCurrency: () => (arr, param) => {
      if (param == 0) {
        return null;
      } else {
        const filterData = arr.find((item) => item.code == param);
        return new Array(filterData).map((item) => item.mid);
      }
    },

    getCalculator: (state, getters) => {
      if (state.currencyFrom && state.currencyTo && state.pickedNum) {
        return (
          (getters.getFilterCurrency(state.tableA, state.currencyFrom) /
            getters.getFilterCurrency(state.tableB, state.currencyTo)) *
          state.pickedNum
        ).toFixed(2);
      } else {
        return null;
      }
    },
  },

  mutations: {
    FETCHED_DATA(state, payload) {
      state.tableA = payload;
      state.tableB = payload;
    },

    CURRENCY_ONE(state, payload) {
      state.currencyFrom = payload;
    },

    CURRENCY_TWO(state, payload) {
      state.currencyTo = payload;
    },

    PICKED_NUM_VALUE(state, payload) {
      state.pickedNum = payload;
    },
  },
  actions: {
    async fetchCurrencyTable({ commit }) {
      try {
        const dataTableA = await axios.get(
          "http://api.nbp.pl/api/exchangerates/tables/a/"
        );
        commit("FETCHED_DATA", dataTableA.data[0].rates);
      } catch (error) {
        console.log(error);
      }
    },

    pickedCurrencyFrom({ commit }, payload) {
      commit("CURRENCY_ONE", payload);
    },

    pickedCurrencyTo({ commit }, payload) {
      commit("CURRENCY_TWO", payload);
    },

    pickedNumValue({ commit }, payload) {
      commit("PICKED_NUM_VALUE", payload);
    },
  },
  modules: {},
});
