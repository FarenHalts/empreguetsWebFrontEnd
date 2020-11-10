<template>
<div class="boxLogin">
    <div class="headerLogin">Empreguets
    </div>

    <div class="tipoLogin">
        <h3 class="loginTextType">Como deseja realizar seu login?</h3>
        <el-radio-group v-model="tipoLogin">
            <el-radio-button label="Prestador"></el-radio-button>
            <el-radio-button label="Solicitador"></el-radio-button>
        </el-radio-group>
    </div>

    <div class="container" style="padding-top: 15px;">
        <div class="row justify-content-center">
            <div class="col-10 col-sm-8 col-md-8 col-lg-8 col-xl-7">
                <div class="infosLogin">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                        <el-form-item label="Usuário" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Senha" prop="senha">
                            <el-input type="password" v-model="ruleForm.senha"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="row justify-content-center" style="padding-top: 10px;">
            <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-5">
                <div class="infosLogin">
                    <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">Login<i class="el-icon-right" style="padding-left: 10px;"></i></el-button>
                </div>
            </div>
        </div>
        <div style="text-align: center; padding-top: 15px;">
            <h3 class="infosAbaixoLogin">Ainda não possui um cadastro?</h3>
            <h3 class="infosAbaixoLogin">Esqueci a senha</h3>
        </div>

        
    </div>
</div>
    
</template>

<style>

</style>

<script>
import api from './loginService'
import axios from 'axios'
export default {
    data(){
        return{
            tipoLogin: 'Prestador',
            ruleForm: {
                name: '',
                senha: ''
            },
             rules: {
            name: [
                { required: true, message: 'Por favor, insira um nome de usuário válido.', trigger: 'blur' },
            ],
            senha: [
                { required: true, message: 'Por favor, insira uma senha válida.', trigger: 'blur' },
            ],
            }
        }
        
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$router.push('/home')
              this.loginzinho();
            // this.requestLogin()
            // this.setLogged()
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      requestLogin() {
          let obj = {
              email: this.ruleForm.name,
              password: this.ruleForm.senha
          }
        api.checkLogin(obj)
          .then((resposta) => {
            if (resposta) {
                localStorage.setItem('token', resposta)
                let token = localStorage.getItem("token")
                this.$store.commit("SET_LOGGED", true);
                this.$router.push({
                path: "/home"
            });
            }
          })
          .catch((erro) => {});
      },
      loginzinho() {
        axios.get('https://hom.roit.ai/roit-people-analytics/api/v1/reports/closing-register/202008',

            {
                headers: {
                    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJVMkZzZEdWa1gxOFA5YlMwcFFFSkNKSFk2V2ZCdUFUdmZBdVAwWjF2dUU2Vi9WNE5xRTlINmU0TGhtVlRYbjAzbHZQTWc5TVhYWm5VTDVWOElqUkZ5cDJ2ck10a0o5dnZ2SVZjWWx1ZStFQ3NkTWtjblJ5eEVkV1ZFWkkwVWRSWjNwQzA5K1NGZDlSa09pZkZqSlVMaUhEWGZHelZGRFpjRlZVTEFiVlN1UHFjQS9UUVdGQVJ6d3dOZjVMcTBMaVRhTFlIVTFNWXBQQXRYUFlEbExCL1ZDN2wxblJsV3hsMm80STFwM0JTOFVadGVjSjNJVVVlUjROK0xTWkJqZGplN3drNXZQdFpIbmQ1T1JjeGlVcEFZOFcwQ1JkOTVtSE0zZTdlV3FkU1U3ekU4aHl0OHdieFNNRW1ETEk2UlRMeWNLYnRveERNQWdGTFhLNHdvWG5KUU9BRUlSNG45YzhrVDRDMldINDBXOGNVemlrakZmUFFoT1oySGRFMkVKTWRjMTVtUG1BRHEzVFlGT2c1enpvbXh2TmxoTVhtVEZ3dFhDUVZ3SUZRZzBjSVhjZUZEcnp5Vmllc2J3aFIyci84MkVPWHE3WmFPS1hlbEpaZ3RVS2VveUYvZHlGWDcvT083TXJlV1dzZ3hGUWFHSXl6VG1YYy9yNzY0aGJCYUFoSSIsInByb3BhZ2F0ZUNhY2hlQ2xlYW51cCI6ZmFsc2V9LCJpYXQiOjE2MDI3MjgxNzAsImV4cCI6MTYwMjkwMDk3MH0.-kDW3fH0D_fm5rBaeYxejj6u77t0HfyV2FRB_f2BqAI',
                    CustomerId: 'fCdCRhpbsjgUYN5zSlaShwKFlQeqUaleqUal'
                }
            }).then(res => {
            let asd = res.data.data;
            this.$router.push('/home')
            console.log(asd);
            console.log('aaaaaaa');
        }).catch(err => {
        })
    }
    //   setLogged(){
    //       this.$store.commit("SET_LOGGED", true);
    //       console.log(this.$store.getters.logged);
    //   }
    },
    mounted() {
        console.log(this.$store.getters.logged);
    },
    
    
}
</script>