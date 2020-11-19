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
    },
    // beforeRouteEnter(to, from, next) {
    //     axios.get('https://hom.roit.ai/roit-people-analytics/api/v1/reports/closing-register/202008',

    //         {
    //             headers: {
    //                 Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJVMkZzZEdWa1gxOFA5YlMwcFFFSkNKSFk2V2ZCdUFUdmZBdVAwWjF2dUU2Vi9WNE5xRTlINmU0TGhtVlRYbjAzbHZQTWc5TVhYWm5VTDVWOElqUkZ5cDJ2ck10a0o5dnZ2SVZjWWx1ZStFQ3NkTWtjblJ5eEVkV1ZFWkkwVWRSWjNwQzA5K1NGZDlSa09pZkZqSlVMaUhEWGZHelZGRFpjRlZVTEFiVlN1UHFjQS9UUVdGQVJ6d3dOZjVMcTBMaVRhTFlIVTFNWXBQQXRYUFlEbExCL1ZDN2wxblJsV3hsMm80STFwM0JTOFVadGVjSjNJVVVlUjROK0xTWkJqZGplN3drNXZQdFpIbmQ1T1JjeGlVcEFZOFcwQ1JkOTVtSE0zZTdlV3FkU1U3ekU4aHl0OHdieFNNRW1ETEk2UlRMeWNLYnRveERNQWdGTFhLNHdvWG5KUU9BRUlSNG45YzhrVDRDMldINDBXOGNVemlrakZmUFFoT1oySGRFMkVKTWRjMTVtUG1BRHEzVFlGT2c1enpvbXh2TmxoTVhtVEZ3dFhDUVZ3SUZRZzBjSVhjZUZEcnp5Vmllc2J3aFIyci84MkVPWHE3WmFPS1hlbEpaZ3RVS2VveUYvZHlGWDcvT083TXJlV1dzZ3hGUWFHSXl6VG1YYy9yNzY0aGJCYUFoSSIsInByb3BhZ2F0ZUNhY2hlQ2xlYW51cCI6ZmFsc2V9LCJpYXQiOjE2MDI3MjgxNzAsImV4cCI6MTYwMjkwMDk3MH0.-kDW3fH0D_fm5rBaeYxejj6u77t0HfyV2FRB_f2BqAI',
    //                 CustomerId: 'fCdCRhpbsjgUYN5zSlaShwKFlQeqUaleqUal'
    //             }
    //         }).then(res => {
    //         let asd = res.data.data;
    //         console.log(asd);
    //         next()
    //         console.log('aaaaaaa');
    //     }).catch(err => {
    //         next('/login')
    //         console.log(err);
    //     })
    // }
};
</script>
