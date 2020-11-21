<template>
<div class="boxLogin invisibleInputs">
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
import Api from './loginService'
import ApiProfile from '../../services/appService'
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            tipoLogin: 'Prestador',
            ruleForm: {
                name: '',
                senha: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: 'Por favor, insira um nome de usuário válido.',
                    trigger: 'blur'
                }, ],
                senha: [{
                    required: true,
                    message: 'Por favor, insira uma senha válida.',
                    trigger: 'blur'
                }, ],
            }
        }

    },
    created() {
        if (this.$store.getters.authenticated == false) {
            this.$message({
                message: 'Token inválido ou usuário sem permissão!',
                type: "error",
            });
            this.$store.commit('SET_AUTHENTICATED', true)
        }
    },
    methods: {
        ...mapMutations({
            renderApp: 'SET_RENDER_APP'
        }),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login(this.ruleForm)
                    // this.requestLogin()
                    // this.setLogged()
                } else {
                    return false;
                }
            });
        },
        //   requestLogin() {
        //       let obj = {
        //           email: this.ruleForm.name,
        //           password: this.ruleForm.senha
        //       }
        //     api.checkLogin(obj)
        //       .then((resposta) => {
        //         if (resposta) {
        //             localStorage.setItem('token', resposta)
        //             let token = localStorage.getItem("token")
        //             this.$store.commit("SET_LOGGED", true);
        //             this.$router.push({
        //             path: "/home"
        //         });
        //         }
        //       })
        //       .catch((erro) => {});
        //   },
        login(form) {
            let data = {
                email: form.name,
                senha: form.senha,
            }
            Api.login(data).then(response => {
                if (response.data.status == 'SUCCESS') {
                    const token = response.data.data;
                    localStorage.setItem('token', token);
                    this.$store.commit("SET_TOKEN", token);
                    ApiProfile.getProfile(token).then(response => {
                        if (response.status == 200) {
                            this.renderApp(true);
                            this.$router.push('/home');
                            this.$store.commit("SET_USER_DATA", response.data.data[0]);
                        }
                    })
                }
            }).catch(err => {
                this.$message({
                    message: err.response.data.message,
                    type: "error",
                });
            })
        }
    },

}
</script>
