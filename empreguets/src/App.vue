<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){

  },
  created(){
    this.checkLogged();
  },
  mounted(){
    this.checkLoggedMounted();
  },
  methods:{
    checkLogged(){
        console.log('chamando o app pelo created');
      },
    checkLoggedMounted(){
        console.log('chamando o app pelo mounted');
      },
    }
  }
</script>
<style>
</style>
