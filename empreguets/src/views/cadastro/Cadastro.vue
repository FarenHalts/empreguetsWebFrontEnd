<template>
<div id="cadastro">

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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm row form-row">
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
            <!-- <div class="el-avatar"></div> -->
            <div class="container">
                <div class="row form-row" style="justify-content: center;">
                    <!-- <div class="col-3"> -->
                        <div class="roundedAvatar">
                        <img src="https://scontent.fcwb2-1.fna.fbcdn.net/v/t1.0-9/69655801_2444297358990923_4646813739897585664_o.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_eui2=AeHcJ48cPtSzTXcz-107lHkB13mm-F3XCdXXeab4XdcJ1VcpLHdGBVbFaafkD_0l20qYOPi7fYV72qwjV0Lm2Mbz&_nc_ohc=ZD8ru9zxD8cAX_uKRi2&_nc_ht=scontent.fcwb2-1.fna&oh=615ec1ea0bc0711b8902679fa1ee22dc&oe=5FAD55E1" height="100" width="100">

                        </div>
                        <!-- </div> -->
                    <div class="col-xl-5">
                        <div class="row">
                            <el-form-item class="col-xl-12" label="Email" prop="email">
                                <el-input v-model="ruleForm.email"></el-input>
                            </el-form-item>
                            <el-form-item class="col-xl-12" label="Senha" prop="senha">
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
                    this.$router.push('/telainicial')
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
