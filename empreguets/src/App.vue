<template>
<div id="app">
    <div class="container-fluid">
        <div class="row" v-if="this.$router.history.current.fullPath != '/login' && this.$router.history.current.fullPath != '/cadastro'" style="justify-content: space-between; background-color: #383838; height: 55px;">
            <div style="display: flex; cursor: pointer" @click="$router.push('/home')">
                <img src="./assets/styles/icons/broom.svg" alt="" style="width: 35px; margin: 0px -5px 0px 10px;">
                <div class="header">Empreguets
                </div>
            </div>
            <div style="margin: 6px 10px 0px 0px;">
                <img src="https://i.pinimg.com/736x/05/85/58/058558945fea564ab0a75106bee2b99e.jpg" alt="" width="45" style="border-radius: 50px; border: 1px solid #f0f0f0;">
            </div>
        </div>
        <router-view />
    </div>
</div>
</template>

<script>
export default {
    data() {

    },
    created() {
        this.checkLogged();
    },
    mounted() {
        this.checkLoggedMounted();
    },
    methods: {
        checkLogged() {
          // console.log(this.$router.history.current.fullPath);
            console.log('chamando o app pelo created');
        },
        checkLoggedMounted() {
            console.log('chamando o app pelo mounted');
        },
    }
}
</script>

<style>

</style>
