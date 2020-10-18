<template>
  <div id="app">
    <div style="background-color: #383838; height: 55px;">
      <div class="header">Empreguets
    </div>
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
