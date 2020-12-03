<template>
<div>
    <div class="row containerProfile">
        <div>
            <img class="profileImage" :src="this.foto" alt="fotoPerfil" />
        </div>
        <div>
            <div style="display: flex">
                <h3 class="nameProfile">{{ this.nome }}</h3>
                <el-rate v-model="value" class="alignStarts" disabled disabled-void-color="#f0f0f0" :colors="colors">
                </el-rate>
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
                    <span>{{ "R$" + this.valor + ".00"}}</span>
                </div>
            </div>
            <div class="services">
                <span>Já efetuou 9 serviços pela empreguets.</span>
            </div>
            <div class="mt-2">
                <el-button type="primary" @click="dialogVisible = true">Marcar Serviço<i class="el-icon-date" style="padding-left: 10px"></i></el-button>
            </div>
        </div>
    </div>
    <div class="containerProfile">
        <h3 class="ratesTitle" v-if="rates.length > 0">Avaliações Recentes</h3>
        <div v-for="(item, index) in rates" :key="index">
            <div class="container-fluid pt-1">
                <div class="row" style="justify-content: center !important;">
                    <div class="roundedAvatarRates" style="position: relative;">
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
    <el-dialog title="Marcar Serviço" :visible.sync="dialogVisible" width="70%">
        <div class="row">
            <div class="col-6">
                <Calendar v-model="serviceDate" :inline="true" :locale="pt" :disabledDates="invalidDates"/>
            <div class="col-6 mt-2 containerBullet">
                <div class="bullet"></div>
                <div class="bulletWord">{{this.$store.getters.profileData.tipo_usuario + " indisponível"}}</div>
            </div>
            </div>
            <div class="col-6">
                <div>
                    <div>Confirmar endereço</div>
                    <div>{{profile.endereco + ", " + profile.num_endereco + " - " + profile.bairro}}</div>
                </div>
                <div class="mt-3">
                    <div>{{"Valor proposto pelo " + profile.tipo_usuario + ": " + "R$" + profile.valor_servico}}</div>
                </div>
                <div class="mt-3">
                    <div>{{"Deseja enviar uma nova proposta de valor para o " + profile.tipo_usuario + "?"}}</div>
                    <div class="form-row">
                        <el-input v-mask="['R$###', 'R$##']" class="col-5" size="small" placeholder="Novo Valor (R$)" v-model="novoValor"></el-input>
                    </div>
                </div>
                <div class="mt-3">
                    <div>{{"Data marcada para o serviço: " + formatData(serviceDate)}}</div>
                </div>
                <div class="mt-5">
                    <div>{{"Após marcar o serviço, será enviado as informações do serviço para o " + profile.tipo_usuario + ", onde ele poderá aceitar ou recusar o serviço."}} </div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancelar</el-button>
            <el-button @click="markService()">Marcar Serviço</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import Calendar from 'primevue/calendar';
import Api from "./profileService";
import moment from "moment";
import apiService from "../../services/service"
export default {
    components: {
        Calendar,
    },
    data() {
        return {
            value: null,
            colors: ["#FFC857", " #FFC857", " #FFC857"],
            nome: "",
            descricao: "",
            foto: "",
            bairro: "",
            valor: "",
            rates: [],
            dialogVisible: false,
            profile: [],
            novoValor: "",
            serviceDate: null,
            pt: {
                firstDayOfWeek: 1,
                dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
                dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
                monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dec"],
                today: 'Hoje'
            },
            reservedDates: [],
            invalidDates: [],
        };
    },
    created() {
        if (this.$store.getters.profileData) {
            this.loadingDataProfile(this.$store.getters.profileData);
            this.loadRates(this.$store.getters.profileData.id_usuario);
            this.loadReservedDates(this.$store.getters.profileData.id_usuario)
        }
    },
    watch: {
        dialogVisible() {
            if (this.dialogVisible == false) {
                this.serviceDate = null;
                this.novoValor = "";
            }
        }
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
            Api.getRates(id, localStorage.getItem("token")).then((response) => {
                if (response.data.status == "SUCCESS") {
                    this.rates = response.data.data;
                }
            });
        },
        markService() {
            let data = this.$store.getters.profileData;
            let loggedId = this.$store.getters.userData.id_usuario;
            let serviceAdress = data.endereco + ", " + data.num_endereco + ", " + data.bairro;
            let markServiceDate = moment(this.serviceDate).format("DD/MM/YYYY");
            let newValor = this.novoValor.slice(2);
            let serviceOBJ = {
                "id_requisitado": data.id_usuario,
                "id_usuario": loggedId,
                "data": markServiceDate,
                "endereco": serviceAdress,
                "valor_proposto": data.valor_servico,
                "novo_valor": newValor
            }
            if (markServiceDate == 'Invalid date') {
                this.$message({
                    message: 'Insira uma data de serviço!',
                    type: "error",
                });
            } else {
                apiService.markService(serviceOBJ).then(response => {
                    this.$message({
                        message: 'Solicitação de serviço enviada com sucesso!',
                        type: "success",
                    });
                    this.dialogVisible = false;
                })
            }
        },
        formatData(data) {
            if (data) {
                let formatDate = moment(data).format("DD/MM/YYYY")
                return formatDate
            } else {
                return ''
            }
        },
        loadReservedDates(id){
            apiService.reservedDates(id).then(response => {
                if (response.status == 200) {
                    this.reservedDates = response.data.data
                    this.reservedDates.map(i => {
                        console.log('a', i);
                        i.data_servico = moment(i.data_servico, "DD/MM/YYYY").format("MM/DD/YYYY")
                        this.invalidDates.push(new Date(i.data_servico))
                    })
                }
            })
        }
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

.bullet{
    border: 1px solid red;
    border-radius: 20px;
    width: 10px;
    height: 10px;
    background-color: red;
    margin-top: 5px;
    margin-right: 10px;
}

.containerBullet{
    padding: 0;
    display: inline-flex;
}

.bulletWord{
    font-family: RobotoRegular;
    font-size: 14px;
}
</style>
