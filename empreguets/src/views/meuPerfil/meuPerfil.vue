<template>
<div :key="modalKey">
    <div>
        <h1 class="selfProfileTitle">Meu Perfil</h1>
    </div>
    <div class="row containerProfile">
        <div>
            <img class="profileImage" :src="this.foto" alt="fotoPerfil" />
        </div>
        <div>
            <div style="display: flex">
                <h3 class="nameProfile">{{ this.nome }}</h3>
                <el-rate v-model="value" class="alignStarts" disabled disabled-void-color="#f0f0f0" :colors="colors">
                </el-rate>
                <div>
                    <i class="el-icon-edit penStyle" @click="openModal()"></i>
                </div>
            </div>
            <div class="labelsProfile">
                <span>Descrição</span>
            </div>
            <div class="decription profileData">
                <span>{{ this.descricao }}</span>
            </div>
            <div>
                <div>
                    <div class="labelsProfile">
                        <span>Localização</span>
                    </div>
                    <div class="profileData">
                        <span>{{ this.bairro }}</span>
                    </div>
                </div>
                <div>
                    <div class="labelsProfile">
                        <span>Contato</span>
                    </div>
                    <div class="profileData">
                        <span>{{ this.telefone }}</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="labelsProfile">
                    <span>Valor Diária</span>
                </div>
                <div class="profileData">
                    <span>{{ "R$" + this.valor + ".00" }}</span>
                </div>
            </div>
            <div class="services">
                <span>Já efetuou 9 serviços pela empreguets.</span>
            </div>
        </div>
    </div>
    <div class="containerProfile">
        <h3 class="ratesTitle pb-3" v-if="rates.length > 0">Avaliações Recentes</h3>
        <div v-for="(item, index) in rates" :key="index">
            <div class="container-fluid pt-1">
                <div class="row" style="justify-content: center !important;">
                    <div class="roundedAvatarRates">
                        <img :src="item.foto" height="70" width="70" />
                    </div>
                    <div>
                        <div class="rateSize">
                            <div style="display: flex">
                                <span class="titlesNameRates">{{ item.nome }}</span>
                                <el-rate v-model="item.avaliacao" class="alignRatingStarts" disabled disabled-void-color="#f0f0f0" :colors="colors">
                                </el-rate>
                            </div>
                            <div class="titlesCommentRates">
                                <span>{{ '"' + item.comentario + '"' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog title="Editar Perfil" :visible.sync="editDiloag" width="70%" class="editDialog" v-if="this.$store.getters.userData.tipo_usuario == 'Prestador'">
        <div class="row">
            <div class="edit">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm form-row" :key="modalKey">
                    <el-form-item class="col-12 col-sm-8 col-md-6 col-lg-7 col-xl-8" label="Nome Completo" prop="nome">
                        <el-input type="text" v-model="ruleForm.nome"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-6 col-lg-5 col-xl-4" label="CPF" prop="cpf">
                        <el-input disabled v-mask="'###.###.###-##'" v-model="ruleForm.cpf"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-4 col-lg-6 col-xl-4" label="RG" prop="rg">
                        <el-input disabled v-model="ruleForm.rg"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-4 col-lg-6 col-xl-4" label="Telefone" prop="telefone">
                        <el-input v-mask="['(##) ####-####', '(##) #####-####']" v-model="ruleForm.telefone"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-4 col-lg-6 col-xl-4" label="Nascimento" prop="datanascimento">
                        <el-input disabled v-mask="'##/##/####'" v-model="ruleForm.datanascimento"></el-input>
                    </el-form-item>
                    <el-form-item class="col-4 col-sm-6 col-md-3 col-lg-6 col-xl-4" label="CEP" prop="cep">
                        <el-input v-mask="'#####-###'" v-model="ruleForm.cep" @input="searchCEP"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4" label="Bairro" prop="bairro">
                        <el-input v-model="ruleForm.bairro"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-4" label="Número" prop="numeroendereco">
                        <el-input v-model="ruleForm.numeroendereco"></el-input>
                    </el-form-item>
                    <!-- <el-form-item class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4" label="Cidade" prop="cidade">
                        <el-input v-model="ruleForm.cidade"></el-input>
                    </el-form-item> -->
                    <el-form-item class="col-8 col-sm-8 col-md-6 col-lg-8 col-xl-8" label="Endereço" prop="endereco">
                        <el-input v-model="ruleForm.endereco"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4" label="Complemento" prop="complemento">
                        <el-input v-model="ruleForm.complemento"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4" label="Valor diária" prop="valor">
                        <el-input v-mask="['R$###', 'R$##']" v-model="ruleForm.valor"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4" label="Raio Atendimento" prop="raio" :key="modalKey">
                        <el-input v-mask="'##Km'" v-model="ruleForm.raio" :key="modalKey"></el-input>
                    </el-form-item>
                    <el-form-item class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4" label="Tipo do Usuário">
                        <el-input disabled v-model="ruleForm.tipo_usuario"></el-input>
                    </el-form-item>
                    <div class="container">
                        <div class="row form-row" style="justify-content: center">
                            <div class="roundedAvatar">
                                <img :src="this.$store.getters.userData.foto" height="100" width="100" />
                            </div>
                            <div class="col-12 col-sm-6 col-md-5 col-xl-5">
                                <div class="row">
                                    <el-form-item class="col-12 col-sm-12 col-md-12 col-xl-12" label="Email" prop="email">
                                        <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item class="col-sm-12 col-md-12 col-xl-12" label="Alterar senha" prop="senha">
                                        <el-input type="password" v-model="ruleForm.senha"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDiloag = false">Cancelar</el-button>
            <el-button @click="submitForm('ruleForm')">Salvar</el-button>
        </span>
    </el-dialog>
    <el-dialog title="Editar Perfil" :visible.sync="editDiloag" width="70%" class="editDialog" v-else-if="this.$store.getters.userData.tipo_usuario == 'Solicitador'">
        <div class="row">
            <div class="edit">
                <el-form :model="ruleFormPJ" :rules="rulespj" ref="rulespj" class="demo-ruleForm form-row">
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
                    <!-- <el-form-item class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-4" label="Cidade" prop="cidadepj">
                        <el-input v-model="ruleFormPJ.cidadepj"></el-input>
                    </el-form-item> -->
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
                        <div class="row form-row" style="justify-content: center">
                            <div class="roundedAvatar">
                                <img :src="this.$store.getters.userData.foto" height="100" width="100" />
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
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDiloag = false">Cancelar</el-button>
            <el-button @click="submitFormPJ('ruleForm')">Salvar</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import api from "./selfProfileService";
import cep from "../cadastro/cadastroService";
import moment from "moment";
export default {
    data() {
        return {
            value: null,
            nome: "",
            descricao: "",
            foto: "",
            bairro: "",
            valor: "",
            rates: [],
            profile: [],
            editDiloag: false,
            ruleForm: {
                nome: "",
                cpf: "",
                email: "",
                senha: "",
                rg: "",
                datanascimento: "",
                telefone: "",
                cep: "",
                endereco: "",
                numeroendereco: "",
                complemento: "",
                // cidade: '',
                bairro: "",
                valor: "",
                raio: "",
                foto: "",
                tipo_usuario: "",
                descricao_perfil: "",
            },
            ruleFormPJ: {
                nomepj: "",
                documentopj: "",
                telefonepj: "",
                ceppj: "",
                enderecopj: "",
                numeroenderecopj: "",
                // cidadepj: '',
                complementopj: "",
                bairropj: "",
                emailpj: "",
                senhapj: "",
                valorpj: "",
                foto: "",
                tipo_usuario: "",
                descricao_perfil: "",
            },
            rules: {
                nome: [{
                    required: true,
                    message: "Nome inválido.",
                    trigger: "blur",
                }, ],
                cpf: [{
                    required: true,
                    message: "CPF inválido.",
                    trigger: "blur",
                }, ],
                email: [{
                    required: true,
                    message: "E-mail inválido.",
                    trigger: "blur",
                }, ],
                // senha: [{
                //     required: true,
                //     message: 'Senha inválida.',
                //     // trigger: 'blur'
                // }, ],
                rg: [{
                    required: true,
                    message: "RG inválido.",
                    // trigger: 'blur'
                }, ],
                datanascimento: [{
                    required: true,
                    message: "Data de Nascimento inválida.",
                    // trigger: 'blur'
                }, ],
                telefone: [{
                    required: true,
                    message: "Número inválido.",
                    // trigger: 'blur'
                }, ],
                cep: [{
                    required: true,
                    message: "CEP inválido.",
                    // trigger: 'blur'
                }, ],
                endereco: [{
                    required: true,
                    message: "Endereço inválido.",
                    // trigger: 'blur'
                }, ],
                numeroendereco: [{
                    required: true,
                    message: "Número inválido.",
                    // trigger: 'blur'
                }, ],
                complemento: [{
                    required: false,
                    message: "Número inválido.",
                    // trigger: 'blur'
                }, ],
                // cidade: [{
                //     required: true,
                //     message: 'Cidade inválida.',
                //     // trigger: 'blur'
                // }, ],
                bairro: [{
                    required: true,
                    message: "Bairro inválido.",
                    // trigger: 'blur'
                }, ],
                valor: [{
                    required: true,
                    message: "Valor inválido.",
                    // trigger: 'blur'
                }, ],
                raio: [{
                    required: true,
                    message: "Raio inválido.",
                    // trigger: 'blur'
                }, ],
            },
            rulespj: {
                nomepj: [{
                    required: true,
                    message: "Nome inválido.",
                    // trigger: 'blur'
                }, ],
                documentopj: [{
                    required: true,
                    message: "Documento inválido.",
                    // trigger: 'blur'
                }, ],
                emailpj: [{
                    required: true,
                    message: "E-mail inválido.",
                    // trigger: 'blur'
                }, ],
                senhapj: [{
                    required: true,
                    message: "Senha inválida.",
                    // trigger: 'blur'
                }, ],
                telefonepj: [{
                    required: true,
                    message: "Número inválido.",
                    // trigger: 'blur'
                }, ],
                ceppj: [{
                    required: true,
                    message: "CEP inválido.",
                    // trigger: 'blur'
                }, ],
                enderecopj: [{
                    required: true,
                    message: "Endereço inválido.",
                    // trigger: 'blur'
                }, ],
                numeroenderecopj: [{
                    required: true,
                    message: "Número inválido.",
                    // trigger: 'blur'
                }, ],
                complementopj: [{
                    required: false,
                    message: "Número inválido.",
                    // trigger: 'blur'
                }, ],
                // cidadepj: [{
                //     required: true,
                //     message: 'Cidade inválida.',
                //     // trigger: 'blur'
                // }, ],
                bairropj: [{
                    required: true,
                    message: "Bairro inválido.",
                    // trigger: 'blur'
                }, ],
                valorpj: [{
                    required: true,
                    message: "Valor inválido.",
                    // trigger: 'blur'
                }, ],
            },
            colors: ["#FFC857", " #FFC857", " #FFC857"],
            modalKey: 0,
        };
    },
    created() {
        this.loadingDataProfile(this.$store.getters.userData);
        this.loadRates(this.$store.getters.userData.id_usuario);
    },
    watch: {
        dialogVisible() {
            if (this.dialogVisible == false) {
                this.serviceDate = null;
                this.novoValor = "";
            }
        },
    },
    methods: {
        loadingDataProfile(data) {
            this.profile = data;
            let nota = parseFloat(data.avaliacao_media);
            (this.nome = data.nome),
            (this.value = nota),
            (this.descricao = data.descricao_perfil),
            (this.bairro = data.bairro),
            (this.telefone = data.telefone),
            (this.valor = data.valor_servico);
            (this.foto = data.foto);
        },
        loadRates(id) {
            api.getRates(id, localStorage.getItem("token")).then((response) => {
                if (response.data.status == "SUCCESS") {
                    this.rates = response.data.data;
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.updatePrestador(this.ruleForm);
                } else {
                    return false;
                }
            });
        },
        submitFormPJ(formName) {
            this.updateSolicitador(this.$store.getters.userData);
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         this.updateSolicitador(this.$store.getters.userData)
            //     } else {
            //         return false;
            //     }
            // });
        },
        updatePrestador(form) {
            let unformatCpf = form.cpf.replace(/[^\w\s]/gi, "");
            let unformatCep = form.cep.replace(/[^\w\s]/gi, "");
            let unformatValue = form.valor.replaceAll("R$", "");
            let unformatDistance = form.raio.replaceAll("Km", "");
            let password = "";
            if (form.senha) {
                password = form.senha;
            }
            let data = {
                nome: form.nome,
                email: form.email,
                senha: password,
                telefone: form.telefone,
                cep: unformatCep,
                endereco: form.endereco,
                bairro: form.bairro,
                num_endereco: form.numeroendereco,
                complemento: form.complemento,
                descricao_perfil: "",
                foto: form.foto,
                tipo_usuario: this.$store.getters.userData.tipo_usuario,
                cpf: unformatCpf,
                rg: form.rg,
                data_nascimento: moment(form.datanascimento, "DD/MM/YYY").format(
                    "DD-MM-YYYY"
                ),
                valor_servico: unformatValue,
                raio: unformatDistance,
                id_usuario: this.$store.getters.userData.id_usuario.toString(),
            };
            api
                .updatePrestador(data, localStorage.getItem("token"))
                .then((response) => {
                    if (response.data.status == "SUCCESS") {
                        this.$message({
                            message: response.data.message,
                            type: "success",
                        });
                        this.editDiloag = false;
                        location.reload();
                    }
                })
                .catch((err) => {
                    this.$message({
                        message: err.response.data.message,
                        type: "error",
                    });
                });
        },
        updateSolicitador(form) {
            // let data = {
            //     nome: form.nomepj,
            //     email: form.emailpj,
            //     senha: form.senhapj,
            //     telefone: form.telefonepj,
            //     cep: form.ceppj,
            //     endereco: form.enderecopj,
            //     bairro: form.bairropj,
            //     num_endereco: form.numeroenderecopj,
            //     complemento: form.complementopj,
            //     foto: form.foto,
            //     tipo_usuario: this.tipoCadastro,
            //     documento: form.documentopj,
            //     valor_servico: form.valorpj,
            //     descricao_perfil: ''
            // }
            // Api.registerSolicitador(data).then(response => {
            //     if (response.data.status == 'SUCCESS') {
            //         this.$message({
            //             message: response.data.message,
            //             type: "success",
            //         });
            //         this.$router.push('/login')
            //     }
            // }).catch(err => {
            //     this.$message({
            //         message: err.response.data.message,
            //         type: "error",
            //     });
            // })
        },
        searchCEP() {
            if (/\d{5}\-\d{3}/.test(this.ruleForm.cep)) {
                cep.getCEP(this.ruleForm.cep).then((response) => {
                    this.ruleForm.endereco = response.logradouro;
                    // this.ruleForm.cidade = response.localidade;
                    this.ruleForm.bairro = response.bairro;
                });
            }
        },
        searchCEPPJ() {
            if (/\d{5}\-\d{3}/.test(this.ruleFormPJ.ceppj)) {
                cep.getCEP(this.ruleFormPJ.ceppj).then((response) => {
                    this.ruleFormPJ.enderecopj = response.logradouro;
                    // this.ruleFormPJ.cidadepj = response.localidade;
                    this.ruleFormPJ.bairropj = response.bairro;
                });
            }
        },
        openModal() {
            let data = this.$store.getters.userData;
            let re = /^([\d]{5})\-?([\d]{3})/;
            let cepFormated = data.cep.replace(re, "$1.$2");
            let cp = /^([\d]{3})\.?([\d]{3})\.?([\d]{3})\-?([\d]{2})/;
            let cpfFormated = data.cpf.replace(cp, "$1.$2-$3-$4");
            (this.ruleForm.nome = data.nome),
            (this.ruleForm.email = data.email),
            (this.ruleForm.telefone = data.telefone),
            // this.ruleForm.cep = data.cep,
            (this.ruleForm.cep = cepFormated),
            (this.ruleForm.endereco = data.endereco),
            (this.ruleForm.bairro = data.bairro),
            (this.ruleForm.numeroendereco = data.num_endereco),
            (this.ruleForm.complemento = data.complemento),
            (this.ruleForm.foto = data.foto),
            (this.ruleForm.tipo_usuario = data.tipo_usuario),
            (this.ruleForm.cpf = cpfFormated),
            (this.ruleForm.rg = data.rg),
            (this.ruleForm.datanascimento = moment(
                data.data_nascimento,
                "DD-MM-YYYY"
            ).format("DD/MM/YYYY")),
            (this.ruleForm.valor = "R$" + data.valor_servico),
            (this.ruleForm.raio = data.raio + "Km"),
            (this.ruleForm.descricao_perfil = "");
            this.editDiloag = true;
        },
    },
};
</script>

<style scoped>
.containerProfile {
    width: 100%;
    margin-right: 0px !important;
    margin-left: 0px !important;
    justify-content: center;
    margin-top: 80px;
}

.containerRates {
    width: 100%;
    margin-right: 0px !important;
    margin-left: 0px !important;
    margin-top: 80px;
}

.profileImage {
    border: 4px solid #f0f0f0;
    /* border: 6px solid #383838; */
    border-radius: 100%;
    margin-right: 20px;
    width: 300px;
}

.nameProfile {
    font-family: LobsterRegular;
    font-size: 50px;
    color: #f0f0f0;
}

.ratesTitle {
    font-family: LobsterRegular;
    font-size: 50px;
    color: #f0f0f0;
    text-align: center;
}

.alignStarts {
    margin-left: 9px;
    margin-top: 30px;
}

.alignRatingStarts {
    display: flex;
    margin-left: 10px;
    margin-top: 3px;
}

.decription {
    width: 360px;
}

.labelsProfile {
    font-family: RobotoRegular;
    color: #bcbcbc;
    font-size: 12px;
}

.profileData {
    width: 360px;
    font-family: RobotoRegular;
    color: #f0f0f0;
}

.services {
    font-family: RobotoRegular;
    color: #bcbcbc;
    font-size: 15px;
}

.roundedAvatarRates {
    text-align: center;
    text-align: center;
    margin-bottom: 14px;
    margin-right: 20px;
}

.roundedAvatarRates img {
    border-radius: 50px;
    border: 2px solid #f0f0f0;
}

.titlesNameRates {
    font-family: RobotoRegular;
    color: #f0f0f0;
}

.titlesCommentRates {
    font-family: RobotoRegular;
    color: #bcbcbc;
    margin-top: 5px;
    max-width: 100%;
}

.selfProfileTitle {
    font-family: LobsterRegular;
    font-size: 45px;
    color: #f0f0f0;
    padding-top: 50px;
    text-align: center;
}

.penStyle {
    margin-top: 30px;
    font-size: 22px;
    color: #f0f0f0;
}

.penStyle:hover {
    color: #c0bdbd;
    cursor: pointer;
}

.styleRat {
    display: flex;
    /* margin-left: 20%; */
    justify-content: center;
}

.rateSize {
    max-width: 300px;
    min-width: 300px;
    width: 100%;
}
</style>
