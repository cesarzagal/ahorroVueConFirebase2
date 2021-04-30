<template>
  <v-form @submit.prevent="agregarMonto"
  >
    <v-container fluid>
      <v-card>
        <v-card-title>Monto</v-card-title>
        <v-card-text>
          <v-date-picker
              v-model="data.fecha"
              first-day-of-week="1"
              locale="es_CL"
              min="2000"
              :max="today"
          ></v-date-picker>
        </v-card-text>
        <v-card-text>
          <v-text-field
            type="number"
            v-model="data.monto"
          >
            Ingrese Monto
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
              :disabled="!formIsValid"
              text
              color="primary"
              type="submit"
          >
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>
<script>

import { mapActions } from 'vuex'
export default {
  name: "AgregarMonto",
  data(){
    return {
      today: new Date().toISOString().toLocaleString("es-CL", {timeZone: "America/Santiago"}).substr(0, 10),
      data: {
        fecha: new Date().toISOString().toLocaleString("es-CL", {timeZone: "America/Santiago"}).substr(0, 10),
        monto:0,
      }
    }
  },
  methods:{
    ...mapActions({addItem: 'storeItem', ordenar: 'ordenar'}),
    agregarMonto(){
        if(this.formIsValid){
          this.addItem(this.data)
        }
        else{
          //console.log("no")
        }
    }
  },
  computed: {
    formIsValid () {
      return (
          this.data.fecha &&
          this.data.monto
      )
    },
  },


}
</script>