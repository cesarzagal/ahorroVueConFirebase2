import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../main'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lista:[],
    estado: false,
  },
  getters:{
    lista(state){
      return state.lista;
    },
    estado(state){
      return state.estado
    }
  },
  mutations: {
    Set_Lista(state, payload){
      state.lista = payload
    },
    Add_Item(state, payload){
      state.estado = false;
      state.lista.push(payload);
    },
    Sort_Items(state, sortKey){
      const jobs = state.lista;
      jobs.sort((a, b) => {
        let compare = 0;
        if (a[sortKey] > b[sortKey]) {
          compare = 1;
        } else if (b[sortKey] > a[sortKey]) {
          compare = -1;
        }
        return compare;
      });
      state.estado=true;
      state.lista=jobs;
    },

  },
  actions: {
    async fetchList({commit}){
      try {
        const snapshot = await db.collection('ahorro').orderBy('fecha').get();
        snapshot.forEach(doc=> {
          let dataTemp= doc.data();
          commit('Add_Item', {
            date : dataTemp.fecha,
            value: dataTemp.monto
          })
        });
      }
      catch (e) {
        //console.log(e)
      }
    },
    async storeItem({commit}, payload){
      try {
        await db.collection('ahorro').add({
          fecha: payload.fecha,
          monto: payload.monto,
        });
        commit('Add_Item', {
          date : payload.fecha,
          value: payload.monto
        });
        commit('Sort_Items', 'date')
      }
      catch (e) {
        //console.log(e)
      }
    },
  },
  modules: {
  }
})
