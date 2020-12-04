<template>
<div id="cadastro" class="invisibleInputs">
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
            <div class="container" style="padding-top: 15px;" v-if="this.tipoCadastro == 'Prestador'" :key="k1">
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
                        <el-input v-mask="'#####-###'" v-model="ruleForm.cep" @input="searchCEP"></el-input>
                    </el-form-item>
                    <el-form-item class="col-8 col-sm-8 col-md-6 col-lg-8 col-xl-6" label="Endereço" prop="endereco">
                        <el-input v-model="ruleForm.endereco"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-2" label="Número" prop="numeroendereco">
                        <el-input v-model="ruleForm.numeroendereco"></el-input>
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
                        <el-input v-mask="['R$###', 'R$##']" v-model="ruleForm.valor"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-6" label="Raio Atendimento" prop="raio">
                        <el-input v-mask="'##Km'" v-model="ruleForm.raio"></el-input>
                    </el-form-item>
                    <div class="container">
                        <div class="row form-row" style="justify-content: center;">
                            <div class="roundedAvatar">
                                <img src="https://firebasestorage.googleapis.com/v0/b/empreguets-4e2d3.appspot.com/o/user.png?alt=media&token=65caf39f-546f-4a36-8c71-638e7d265197" height="100" width="100">
                                <input class="styleUpload" type="file" @change="previewImage" accept="image/jpeg">
                                    <img class="preview" :src="picture" v-if="picture">
                                    <el-button v-if="!imageData" disabled size="mini" round class="styleUploadButton" @click="onUpload">Upload</el-button>
                                    <el-button style="position: relative; bottom: 95px;" v-else-if="imageData && !picture" size="mini" round class="styleUploadButton" @click="onUpload">Upload</el-button>
                                <!-- <div>
                                    <p>
                                        Progres: {{uploadValue.toFixed()+"%"}}
                                        <progress :value="uploadValue" max="100"></progress>
                                    </p>
                                </div> -->
                            </div>
                            <div class="col-12 col-sm-6 col-md-5 col-xl-5">
                                <div class="row">
                                    <el-form-item class="col-12 col-sm-12 col-md-12 col-xl-12" label="Email" prop="email">
                                        <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item class="col-sm-12 col-md-12 col-xl-12" label="Senha" prop="senha">
                                        <el-input type="password" v-model="ruleForm.senha"></el-input>
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
            <div class="container" style="padding-top: 15px;" v-if="this.tipoCadastro == 'Solicitador'" :key="k2">
                <el-form :model="ruleFormPJ" :rules="rulespj" ref="ruleFormPJ" class="demo-ruleForm form-row">
                    <el-form-item class="col-xl-8" label="Nome Completo" prop="nomepj">
                        <el-input v-model="ruleFormPJ.nomepj"></el-input>
                    </el-form-item>
                    <el-form-item class="col-xl-4" label="CPF/CNPJ" prop="documentopj">
                        <el-input v-mask="['###.###.###-##', '##.###.###/####-##']" v-model="ruleFormPJ.documentopj"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-4 col-lg-6 col-xl-3" label="Telefone" prop="telefonepj">
                        <el-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="ruleFormPJ.telefonepj"></el-input>
                    </el-form-item>
                    <el-form-item class="col-4 col-sm-6 col-md-3 col-lg-6 col-xl-4" label="CEP" prop="ceppj">
                        <el-input v-mask="'#####-###'" v-model="ruleFormPJ.ceppj" @input="searchCEPPJ"></el-input>
                    </el-form-item>
                    <el-form-item class="col-8 col-sm-8 col-md-6 col-lg-8 col-xl-5" label="Endereço" prop="enderecopj">
                        <el-input type="text" v-model="ruleFormPJ.enderecopj"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3" label="Número" prop="numeroenderecopj">
                        <el-input v-model="ruleFormPJ.numeroenderecopj"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4" label="Cidade" prop="cidadepj">
                        <el-input v-model="ruleFormPJ.cidadepj"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-5" label="Complemento" prop="complementopj">
                        <el-input v-model="ruleFormPJ.complementopj"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-6" label="Valor serviço" prop="valorpj">
                        <el-input v-mask="['R$###', 'R$##']" v-model="ruleFormPJ.valorpj"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" label="Bairro" prop="bairropj">
                        <el-input v-model="ruleFormPJ.bairropj"></el-input>
                    </el-form-item>
                    <div class="container">
                        <div class="row form-row" style="justify-content: center;">
                            <div class="roundedAvatar">
                                <img src="https://firebasestorage.googleapis.com/v0/b/empreguets-4e2d3.appspot.com/o/user.png?alt=media&token=65caf39f-546f-4a36-8c71-638e7d265197" height="100" width="100">
                                <input class="styleUpload" type="file" @change="previewImage" accept="image/jpeg">
                                    <img class="preview" :src="picture" v-if="picture">
                                    <el-button v-if="!imageData" disabled size="mini" round class="styleUploadButton" @click="onUpload">Upload</el-button>
                                    <el-button style="position: relative; bottom: 95px;" v-else-if="imageData && !picture" size="mini" round class="styleUploadButton" @click="onUpload">Upload</el-button>
                                <!-- <div>
                                    <p>
                                        Progres: {{uploadValue.toFixed()+"%"}}
                                        <progress :value="uploadValue" max="100"></progress>
                                    </p>
                                </div> -->
                            </div>
                            <div class="col-12 col-sm-6 col-md-5 col-xl-5">
                                <div class="row">
                                    <el-form-item class="col-12 col-sm-12 col-md-12 col-xl-12" label="Email" prop="emailpj">
                                        <el-input v-model="ruleFormPJ.emailpj"></el-input>
                                    </el-form-item>
                                    <el-form-item class="col-sm-12 col-md-12 col-xl-12" label="Senha" prop="senhapj">
                                        <el-input type="password" v-model="ruleFormPJ.senhapj"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="row justify-content-center" style="padding-top: 10px;">
                    <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-5">
                        <div class="infosLogin">
                            <el-button style="width: 100%" type="primary" @click="submitFormPj('ruleFormPJ')">Cadastrar<i class="el-icon-right" style="padding-left: 10px;"></i></el-button>
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
import firebase from 'firebase'
export default {
    data() {
        return {
            k1: 0,
            k2: 0,
            tipoCadastro: "Prestador",
            loading: false,
            ruleForm: {
                nome: '',
                cpf: '',
                email: '',
                senha: '',
                rg: '',
                datanascimento: '',
                telefone: '',
                cep: '',
                endereco: '',
                numeroendereco: '',
                complemento: '',
                cidade: '',
                bairro: '',
                valor: '',
                raio: '',
                foto: ''
            },
            ruleFormPJ: {
                nomepj: '',
                documentopj: '',
                telefonepj: '',
                ceppj: '',
                enderecopj: '',
                numeroenderecopj: '',
                cidadepj: '',
                complementopj: '',
                bairropj: '',
                emailpj: '',
                senhapj: '',
                valorpj: '',
                foto: ''
            },
            rules: {
                nome: [{
                    required: true,
                    message: 'Nome inválido.',
                    trigger: 'blur'
                }, ],
                cpf: [{
                    required: true,
                    message: 'CPF inválido.',
                    trigger: 'blur'
                }, ],
                email: [{
                    required: true,
                    message: 'E-mail inválido.',
                    trigger: 'blur'
                }, ],
                senha: [{
                    required: true,
                    message: 'Senha inválida.',
                    // trigger: 'blur'
                }, ],
                rg: [{
                    required: true,
                    message: 'RG inválido.',
                    // trigger: 'blur'
                }, ],
                datanascimento: [{
                    required: true,
                    message: 'Data de Nascimento inválida.',
                    // trigger: 'blur'
                }, ],
                telefone: [{
                    required: true,
                    message: 'Número inválido.',
                    // trigger: 'blur'
                }, ],
                cep: [{
                    required: true,
                    message: 'CEP inválido.',
                    // trigger: 'blur'
                }, ],
                endereco: [{
                    required: true,
                    message: 'Endereço inválido.',
                    // trigger: 'blur'
                }, ],
                numeroendereco: [{
                    required: true,
                    message: 'Número inválido.',
                    // trigger: 'blur'
                }, ],
                complemento: [{
                    required: false,
                    message: 'Número inválido.',
                    // trigger: 'blur'
                }, ],
                cidade: [{
                    required: true,
                    message: 'Cidade inválida.',
                    // trigger: 'blur'
                }, ],
                bairro: [{
                    required: true,
                    message: 'Bairro inválido.',
                    // trigger: 'blur'
                }, ],
                valor: [{
                    required: true,
                    message: 'Valor inválido.',
                    // trigger: 'blur'
                }, ],
                raio: [{
                    required: true,
                    message: 'Raio inválido.',
                    // trigger: 'blur'
                }, ],
            },
            rulespj: {
                nomepj: [{
                    required: true,
                    message: 'Nome inválido.',
                    // trigger: 'blur'
                }, ],
                documentopj: [{
                    required: true,
                    message: 'Documento inválido.',
                    // trigger: 'blur'
                }, ],
                emailpj: [{
                    required: true,
                    message: 'E-mail inválido.',
                    // trigger: 'blur'
                }, ],
                senhapj: [{
                    required: true,
                    message: 'Senha inválida.',
                    // trigger: 'blur'
                }, ],
                telefonepj: [{
                    required: true,
                    message: 'Número inválido.',
                    // trigger: 'blur'
                }, ],
                ceppj: [{
                    required: true,
                    message: 'CEP inválido.',
                    // trigger: 'blur'
                }, ],
                enderecopj: [{
                    required: true,
                    message: 'Endereço inválido.',
                    // trigger: 'blur'
                }, ],
                numeroenderecopj: [{
                    required: true,
                    message: 'Número inválido.',
                    // trigger: 'blur'
                }, ],
                complementopj: [{
                    required: false,
                    message: 'Número inválido.',
                    // trigger: 'blur'
                }, ],
                cidadepj: [{
                    required: true,
                    message: 'Cidade inválida.',
                    // trigger: 'blur'
                }, ],
                bairropj: [{
                    required: true,
                    message: 'Bairro inválido.',
                    // trigger: 'blur'
                }, ],
                valorpj: [{
                    required: true,
                    message: 'Valor inválido.',
                    // trigger: 'blur'
                }, ],
            },
            latitude: '',
            longitude: '',
            imageData: null,
            picture: null,
            uploadValue: 0
        }
    },
    watch: {
        tipoCadastro(){
            this.k1 ++
            this.k2 ++
            // this.ruleForm = {}
            // this.ruleFormPJ = {}
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getLatLngPrest()
                } else {
                    return false;
                }
            });
        },
        submitFormPj(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getLatLngSoli()
                } else {
                    return false;
                }
            });
        },
        searchCEP() {
            if (/\d{5}\-\d{3}/.test(this.ruleForm.cep)) {
                Api.getCEP(this.ruleForm.cep).then((response) => {
                    this.ruleForm.endereco = response.logradouro;
                    this.ruleForm.cidade = response.localidade;
                    this.ruleForm.bairro = response.bairro;
                });
            }
        },
        searchCEPPJ() {
            if (/\d{5}\-\d{3}/.test(this.ruleFormPJ.ceppj)) {
                Api.getCEP(this.ruleFormPJ.ceppj).then((response) => {
                    this.ruleFormPJ.enderecopj = response.logradouro;
                    this.ruleFormPJ.cidadepj = response.localidade;
                    this.ruleFormPJ.bairropj = response.bairro;
                });
            }
        },
        registerPrestador(form) {
            if (this.picture) {
                let unformatValue = form.valor.replaceAll('R$', '');
                let data = {
                    nome: form.nome,
                    email: form.email,
                    senha: form.senha,
                    telefone: form.telefone,
                    cep: form.cep,
                    endereco: form.endereco,
                    bairro: form.bairro,
                    num_endereco: form.numeroendereco,
                    complemento: form.complemento,
                    foto: this.picture,
                    tipo_usuario: this.tipoCadastro,
                    cpf: form.cpf,
                    rg: form.rg,
                    data_nascimento: form.datanascimento,
                    valor_servico: unformatValue,
                    raio: form.raio,
                    descricao_perfil: 'Eu amo meus netinhos, não lavo louça, só seco',
                    lat: this.latitude,
                    lng: this.longitude
                }
                Api.registerPrestador(data).then(response => {
                    if (response.data.status == 'SUCCESS') {
                        this.$message({
                            message: response.data.message,
                            type: "success",
                        });
                        this.$router.push('/login')
                    }
                }).catch(err => {
                    this.$message({
                        message: err.response.data.message,
                        type: "error",
                    });
                })
            } else {
                this.$message({
                    message: 'Insira uma imagem de perfil!',
                    type: "error",
                });
            }
        },
        registerSolicitador(form) {
            if (this.picture) {
                let unformatValue = form.valorpj.replaceAll('R$', '');
                let data = {
                    nome: form.nomepj,
                    email: form.emailpj,
                    senha: form.senhapj,
                    telefone: form.telefonepj,
                    cep: form.ceppj,
                    endereco: form.enderecopj,
                    bairro: form.bairropj,
                    num_endereco: form.numeroenderecopj,
                    complemento: form.complementopj,
                    foto: this.picture,
                    tipo_usuario: this.tipoCadastro,
                    documento: form.documentopj,
                    valor_servico: unformatValue,
                    descricao_perfil: 'Não estarei em casa',
                    lat: this.latitude,
                    lng: this.longitude
                }
                Api.registerSolicitador(data).then(response => {
                    if (response.data.status == 'SUCCESS') {
                        this.$message({
                            message: response.data.message,
                            type: "success",
                        });
                        this.$router.push('/login')
                    }
                }).catch(err => {
                    this.$message({
                        message: err.response.data.message,
                        type: "error",
                    });
                })
            } else {
                this.$message({
                    message: 'Insira uma imagem de perfil!',
                    type: "error",
                });
            }
        },
        getLatLngPrest(){
            let ruaNoCharac = this.ruleForm.endereco.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let adressData = {
                cep: this.ruleForm.cep.replaceAll('-', ''),
                num: this.ruleForm.numeroendereco,
                rua: ruaNoCharac.replaceAll(' ', "+")
            }
            Api.getLatLngPrest(adressData).then(response => {
                if (response.status == 200) {
                    this.longitude = response.data.features[0].geometry.coordinates[0];
                    this.latitude = response.data.features[0].geometry.coordinates[1];
                    this.registerPrestador(this.ruleForm)
                }
            })
        },
        getLatLngSoli(){
            let ruaNoCharac = this.ruleFormPJ.enderecopj.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let adressData = {
                cep: this.ruleFormPJ.ceppj.replaceAll('-', ''),
                num: this.ruleFormPJ.numeroenderecopj,
                rua: ruaNoCharac.replaceAll(' ', "+")
            }
            Api.getLatLngPrest(adressData).then(response => {
                if (response.status == 200) {
                    this.longitude = response.data.features[0].geometry.coordinates[0];
                    this.latitude = response.data.features[0].geometry.coordinates[1];
                    this.registerSolicitador(this.ruleFormPJ)
                }
            })
        },
        previewImage(event){
            this.uploadValue=0;
            this.picture=null;
            this.imageData=event.target.files[0]
        },
        onUpload(){
            this.picture=null;
            const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=> {
                this.uploadValue=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.picture=url;
            });
            }
            );
        }
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
img.preview{
    position: relative;
    cursor: pointer;
    width: 100px;
    height: 100px;
    left: 0px;
    border-radius: 100px;
    bottom: 200px;
}
.styleUpload{
    opacity: 0;
    position: relative;
    cursor: pointer;
    width: 100px;
    height: 100px;
    left: 0px;
    border-radius: 100px;
    bottom: 100px;
}
.styleUploadButton{
    position: relative;
    bottom: 95px;
    left: 17px;
}
</style>
