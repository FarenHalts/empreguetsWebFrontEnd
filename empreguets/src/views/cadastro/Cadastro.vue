<template>
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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm row">
            <el-form-item class="col-xl-6" label="Nome Completo" prop="nome">
                <el-input type="text" v-model="ruleForm.nome"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-3" label="CPF" prop="cpf">
                <el-input v-mask="'###.###.###-##'" v-model="ruleForm.cpf"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-3" label="RG" prop="rg">
                <el-input v-model="ruleForm.rg"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-3" label="CEP" prop="cep">
                <el-input v-mask="'#####-###'" v-model="ruleForm.cep" @input="searchCEP"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-6" label="Endereço" prop="endereco">
                <el-input v-model="ruleForm.endereco"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-3" label="Numero da Residência" prop="numeroEndereco">
                <el-input v-model="ruleForm.numeroEndereco"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-4" label="Cidade" prop="cidade">
                <el-input v-model="ruleForm.cidade"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-4" label="Bairro" prop="bairro">
                <el-input v-model="ruleForm.bairro"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-4" label="Complemento" prop="complemento">
                <el-input v-model="ruleForm.complemento"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-4" label="Telefone" prop="telefone">
                <el-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="ruleForm.telefone"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-3" label="Data de Nascimento" prop="datanascimento">
                <el-input v-mask="'##/##/####'" v-model="ruleForm.datanascimento"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-2" label="Valor diária" prop="valor">
                <el-input v-mask="'R$###.##'" v-model="ruleForm.valor"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-3" label="Raio Atendimento" prop="raio">
                <el-input v-mask="'##Km'" v-model="ruleForm.raio"></el-input>
            </el-form-item>
            <div>
                <div class="el-avatar"></div>
            <div class="row" style="display: inline-block; position: relative; left: 325px; width: 275px;">
            <el-form-item class="" label="Email" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item class="" label="Senha" prop="senha">
                <el-input v-model="ruleForm.senha"></el-input>
            </el-form-item>

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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm row">
            <el-form-item class="col-xl-8" label="Nome Completo" prop="nome">
                <el-input type="text" v-model="ruleForm.nome"></el-input>
            </el-form-item>
            <el-form-item class="col-xl-4" label="CPF" prop="cpf">
                <el-input v-mask="'###.###.###-##'" v-model="ruleForm.cpf"></el-input>
            </el-form-item>
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
</template>

<script>
import Api from './cadastroService'
export default {
    data() {
        return {
            tipoCadastro: "Prestador",
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
                    this.$router.push('/home')
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
    }
}
</script>
