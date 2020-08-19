<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1 style="color: #ff00c8">EMPREGUETS PORRA</h1>
    <button @click="getcadastro()">Requisição</button>
  </div>
</template>
<script>
import Vue from "vue";
import telainicial from "./telainicial.js";
import api from "./telainicial";
export default {
  data() {
    return {
      oi: 1,
    };
  },
  methods: {
    getcadastro() {
        api
          .findPermissionModules()
          .then((resposta) => {
            if (resposta) {
            } else {
            }
          })
          .catch((erro) => {});
      },
  },
};
</script>
