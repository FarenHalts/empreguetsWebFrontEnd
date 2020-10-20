<template>
<div id="app">
    <div style="background-color: #383838; height: 55px;">
        <div class="row" style="justify-content: space-between; width: 100%;">
            <div style="display: flex; cursor: pointer" @click="$router.push('/home')">
                <img src="./assets/styles/icons/broom.svg" alt="" style="width: 40px; margin: 5px -5px 0px 22px;">
                <div class="header">Empreguets
                </div>
            </div>
            <div style="margin-top: 6px;">
                <img src="https://i.pinimg.com/736x/05/85/58/058558945fea564ab0a75106bee2b99e.jpg" alt="" width="45" style="border-radius: 50px; border: 1px solid #f0f0f0;">
            </div>

        </div>
    </div>
    <router-view />
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
