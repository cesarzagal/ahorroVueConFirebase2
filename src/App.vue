<template>
  <v-app>
    <v-row class="mt-2">
      <v-col cols="4">
        <AgregarMonto></AgregarMonto>
      </v-col>
      <v-col cols="8">
        <Home></Home>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Home from './components/Home';
import AgregarMonto from "./components/AgregarMonto";
export default {
  name: 'App',
  components: {
    Home,
    AgregarMonto
  },
  methods:{

  },
  data: () => ({
    //
  }),
};
</script>
