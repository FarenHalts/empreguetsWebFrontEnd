<template>
<div id="cadastro">
    <div class="container-flui">

        <div class="boxCadastro">
            <div class="headerLogin">
                Empreguets
            </div>
            <div class="tipoLogin">
                <h3 class="loginTextType">Como deseja realizar seu cadastro?</h3>
                <el-radio-group v-model="tipoCadastro">
                    <el-radio-button label="Prestador"></el-radio-button>
                    <el-radio-button label="Solicitador"></el-radio-button>
                </el-radio-group>
                <h3 class="loginTextType">Preencha seus dados</h3>
            </div>
            <div class="container" style="padding-top: 15px;" v-if="this.tipoCadastro == 'Prestador'">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm form-row">
                    <el-form-item class="col-12 col-sm-8 col-md-6 col-lg-7 col-xl-8" label="Nome Completo" prop="nome">
                        <el-input type="text" v-model="ruleForm.nome"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-6 col-lg-5 col-xl-4" label="CPF" prop="cpf">
                        <el-input v-mask="'###.###.###-##'" v-model="ruleForm.cpf"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-4 col-lg-6 col-xl-4" label="RG" prop="rg">
                        <el-input v-model="ruleForm.rg"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-4 col-lg-6 col-xl-4" label="Telefone" prop="telefone">
                        <el-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="ruleForm.telefone"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-4 col-lg-6 col-xl-4" label="Nascimento" prop="datanascimento">
                        <el-input v-mask="'##/##/####'" v-model="ruleForm.datanascimento"></el-input>
                    </el-form-item>
                    <el-form-item class="col-4 col-sm-6 col-md-3 col-lg-6 col-xl-4" label="CEP" prop="cep">
                        <el-input v-mask="'#####-###'" v-model="ruleForm.cep" @input="searchCEPPJ"></el-input>
                    </el-form-item>
                    <el-form-item class="col-8 col-sm-8 col-md-6 col-lg-8 col-xl-6" label="Endereço" prop="endereco">
                        <el-input v-model="ruleForm.endereco"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-2" label="Número" prop="numeroEndereco">
                        <el-input v-model="ruleForm.numeroEndereco"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4" label="Cidade" prop="cidade">
                        <el-input v-model="ruleForm.cidade"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4" label="Bairro" prop="bairro">
                        <el-input v-model="ruleForm.bairro"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4" label="Complemento" prop="complemento">
                        <el-input v-model="ruleForm.complemento"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-6" label="Valor diária" prop="valor">
                        <el-input v-mask="'R$###.##'" v-model="ruleForm.valor"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-6" label="Raio Atendimento" prop="raio">
                        <el-input v-mask="'##Km'" v-model="ruleForm.raio"></el-input>
                    </el-form-item>
                    <!-- <div class="el-avatar"></div> -->
                    <div class="container">
                        <div class="row form-row" style="justify-content: center;">
                            <!-- <div class="col-3"> -->
                            <div class="roundedAvatar">
                                <img src="https://i.pinimg.com/736x/05/85/58/058558945fea564ab0a75106bee2b99e.jpg" height="100" width="100">

                            </div>
                            <!-- </div> -->
                            <div class="col-12 col-sm-6 col-md-5 col-xl-5">
                                <div class="row">
                                    <el-form-item class="col-12 col-sm-12 col-md-12 col-xl-12" label="Email" prop="email">
                                        <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item class="col-sm-12 col-md-12 col-xl-12" label="Senha" prop="senha">
                                        <el-input v-model="ruleForm.senha"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="row justify-content-center" style="padding-top: 20px;">
                    <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-5">
                        <div class="infosLogin">
                            <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">Cadastrar<i class="el-icon-right" style="padding-left: 10px;"></i></el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container" style="padding-top: 15px;" v-if="this.tipoCadastro == 'Solicitador'">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm form-row">
                    <el-form-item class="col-xl-8" label="Nome Completo" prop="nome">
                        <el-input type="text" v-model="ruleFormPJ.nome"></el-input>
                    </el-form-item>
                    <el-form-item class="col-xl-4" label="CPF/CNPJ" prop="documento">
                        <el-input v-mask="['###.###.###-##', '##.###.###/####-##']" v-model="ruleFormPJ.documento"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-4 col-lg-6 col-xl-3" label="Telefone" prop="telefone">
                        <el-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="ruleFormPJ.telefone"></el-input>
                    </el-form-item>
                   <el-form-item class="col-4 col-sm-6 col-md-3 col-lg-6 col-xl-4" label="CEP" prop="cep">
                        <el-input v-mask="'#####-###'" v-model="ruleFormPJ.cep" @input="searchCEP"></el-input>
                    </el-form-item>
                    <el-form-item class="col-8 col-sm-8 col-md-6 col-lg-8 col-xl-5" label="Endereço" prop="endereco">
                        <el-input v-model="ruleFormPJ.endereco"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3" label="Número" prop="numeroEndereco">
                        <el-input v-model="ruleFormPJ.numeroEndereco"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4" label="Complemento" prop="complemento">
                        <el-input v-model="ruleFormPJ.complemento"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-5" label="Bairro" prop="bairro">
                        <el-input v-model="ruleFormPJ.bairro"></el-input>
                    </el-form-item>
                    <div class="container">
                        <div class="row form-row" style="justify-content: center;">
                            <!-- <div class="col-3"> -->
                            <div class="roundedAvatar">
                                <img src="https://i.pinimg.com/736x/05/85/58/058558945fea564ab0a75106bee2b99e.jpg" height="100" width="100">

                            </div>
                            <!-- </div> -->
                            <div class="col-12 col-sm-6 col-md-5 col-xl-5">
                                <div class="row">
                                    <el-form-item class="col-12 col-sm-12 col-md-12 col-xl-12" label="Email" prop="email">
                                        <el-input v-model="ruleFormPJ.email"></el-input>
                                    </el-form-item>
                                    <el-form-item class="col-sm-12 col-md-12 col-xl-12" label="Senha" prop="senha">
                                        <el-input v-model="ruleFormPJ.senha"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="row justify-content-center" style="padding-top: 10px;">
                    <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-5">
                        <div class="infosLogin">
                            <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">Cadastrar<i class="el-icon-right" style="padding-left: 10px;"></i></el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Api from './cadastroService'
export default {
    data() {
        return {
            tipoCadastro: "Prestador",
            loading: false,
            ruleForm: {
                nome: '',
                cpf: '',
                email: '',
                rg: '',
                datanascimento: '',
                telefone: '',
                cep: '',
                endereco: '',
                numeroEndereco: '',
                complemento: '',
                cidade: '',
                bairro: '',
                valor: '',
                raio: '',
            },
            ruleFormPJ: {
                nome: '',
                documento: '',
                telefone: '',
                cep: '',
                endereco: '',
                numeroEndereco: '',
                complemento: '',
                bairro: '',
                email: '',
                senha: '',
            },
            // rules: {
            //     nome: [{
            //         required: true,
            //         message: 'Nome inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     cpf: [{
            //         required: true,
            //         message: 'CPF inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     email: [{
            //         required: true,
            //         message: 'E-mail inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     rg: [{
            //         required: true,
            //         message: 'RG inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     datanascimento: [{
            //         required: true,
            //         message: 'Data de Nascimento inválida.',
            //         trigger: 'blur'
            //     }, ],
            //     telefone: [{
            //         required: true,
            //         message: 'Número inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     cep: [{
            //         required: true,
            //         message: 'CEP inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     endereco: [{
            //         required: true,
            //         message: 'Endereço inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     numeroEndereco: [{
            //         required: true,
            //         message: 'Número inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     complemento: [{
            //         required: false,
            //         message: 'Número inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     cidade: [{
            //         required: true,
            //         message: 'Cidade inválida.',
            //         trigger: 'blur'
            //     }, ],
            //     bairro: [{
            //         required: true,
            //         message: 'Bairro inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     valor: [{
            //         required: true,
            //         message: 'Valor inválido.',
            //         trigger: 'blur'
            //     }, ],
            //     raio: [{
            //         required: true,
            //         message: 'Raio inválido.',
            //         trigger: 'blur'
            //     }, ],
            // }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$router.push('/login')
                    console.log('to funfando');
                    // this.setLogged()
                } else {
                    return false;
                }
            });
        },
        searchCEP() {
            if (/\d{5}\-\d{3}/.test(this.ruleForm.cep)) {
                Api.getCEP(this.ruleForm.cep).then((data) => {
                    this.ruleForm.endereco = data.logradouro;
                    this.ruleForm.cidade = data.localidade;
                    this.ruleForm.bairro = data.bairro;
                });
            }
        },
        searchCEPPJ() {
            if (/\d{5}\-\d{3}/.test(this.ruleForm.cep)) {
                Api.getCEP(this.ruleForm.cep).then((data) => {
                    this.ruleFormPJ.endereco = data.logradouro;
                    this.ruleFormPJ.cidade = data.localidade;
                    this.ruleFormPJ.bairro = data.bairro;
                });
            }
        },
    }
}
</script>

<style scoped>
@media (min-width: 500px) {
    .boxCadastro {
        width: 78% !important;
        height: 860px !important;
    }
}

@media (min-width: 1000px) {
    .boxCadastro {
        width: 60% !important;
        height: 930px !important;
    }
}

@media (min-width: 1200px) {
    .boxCadastro {
        width: 55% !important;
        height: 860px !important;
    }
}

@media (min-width: 1400px) {
    .boxCadastro {
        width: 50% !important;
        height: 860px !important;
    }
}

@media (min-width: 1600px) {
    .boxCadastro {
        width: 35% !important;
        height: 860px !important;
    }
}

@media (min-width: 500px) {
    .boxCadastro {
        height: 1125px !important;
        bottom: unset !important;
        top: 40px !important;
    }
}

@media (min-width: 576px) {
    .boxCadastro {
        height: 1000px !important;
        bottom: unset !important;
        top: unset !important;
    }
}

@media (min-width: 578px) {
    .boxCadastro {
        height: 950px !important;
        top: 140px !important;
        bottom: 0 !important;
    }
}

@media (min-width: 768px) {
    .boxCadastro {
        height: 850px !important;
        top: 50px !important;
        bottom: 0 !important;
    }
}

@media (min-width: 990px) {
    .boxCadastro {
        height: 950px !important;
        top: 140px !important;
        bottom: 0 !important;
    }
}

@media (min-width: 1200px) {
    .boxCadastro {
        height: 850px !important;
        top: 0 !important;
        bottom: 0 !important;
    }
}
</style>
