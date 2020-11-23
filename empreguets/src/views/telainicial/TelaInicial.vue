<template>
<div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1 style="color: #ff00c8; text-align: center; padding-top: 300px">SEU TOKEN FOI VALIDADO E OS DADOS SERÃO CARREGADOS AQUI</h1>
    <h3>{{data}}</h3>
    <button @click="getcadastro()">Requisição</button>
</div>
</template>

<script>
import Vue from "vue";
import telainicial from "./telainicial.js";
import api from "./telainicial";
import axios from 'axios';
export default {
    data() {
        return {
            oi: 1,
            data: ''
        };
    },
    methods: {
        getcadastro() {
            api
                .findPermissionModules()
                .then((resposta) => {
                    if (resposta) {} else {}
                })
                .catch((erro) => {});
        },
    }
};
</script>
