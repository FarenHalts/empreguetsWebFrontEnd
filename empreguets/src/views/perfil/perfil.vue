<template>
<div>
    <div class="row containerProfile">
        <div>
            <img class="profileImage" src="../homeScreen/unnamed.png" alt="fotoPerfil">
        </div>
        <div>
            <div style="display: flex;">
                <h3 class="nameProfile">{{this.nome}}</h3>
                <el-rate v-model="value" class="alignStarts" disabled disabled-void-color="#f0f0f0" :colors="colors">
                </el-rate>
            </div>
            <div class="labelsProfile">
                <span>Descrição</span>
            </div>
            <div class="decription profileData">
                <span>{{this.descricao}}</span>
            </div>
            <div>
                <div>
                    <div class="labelsProfile">
                        <span>Localização</span>
                    </div>
                    <div class="profileData">
                        <span>{{this.bairro}}</span>
                    </div>
                </div>
                <div>
                    <div class="labelsProfile">
                        <span>Contato</span>
                    </div>
                    <div class="profileData">
                        <span>{{this.telefone}}</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="labelsProfile">
                    <span>Valor Diária</span>
                </div>
                <div class="profileData">
                    <span>{{'R$'+this.valor}}</span>
                </div>
            </div>
            <div class="services">
                <span>Já efetuou 9 serviços pela empreguets.</span>
            </div>
        </div>
    </div>
    <div class="containerProfile">
        <h3 class="ratesTitle" v-if="rates.length > 0">Avaliações</h3>
        <div v-for="(item, index) in rates" :key="index">
            <div style="display: flex; justify-content: center;">
                <div class="roundedAvatarRates">
                    <img src="https://i.pinimg.com/736x/05/85/58/058558945fea564ab0a75106bee2b99e.jpg" height="70" width="70">
                </div>
                <div>
                    <div style="display: flex;">
                        <span class="titlesNameRates">{{item.nome}}</span>
                        <el-rate v-model="item.avaliacao" class="alignRatingStarts" disabled disabled-void-color="#f0f0f0" :colors="colors">
                        </el-rate>
                    </div>
                    <div class="titlesCommentRates">
                        <span>{{'"'+item.comentario+'"'}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Api from './profileService'
export default {
    data() {
        return {
            value: null,
            colors: ['#FFC857', ' #FFC857', ' #FFC857'],
            nome: '',
            descricao: '',
            bairro: '',
            valor: '',
            rates: []
        }
    },
    created(){
        if (this.$store.getters.profileData) {
            this.loadingDataProfile(this.$store.getters.profileData)
            this.loadRates(this.$store.getters.profileData.id_usuario)
        }
    },
    methods: {
        loadingDataProfile(data){
            let nota = parseFloat(data.avaliacao_media)
            this.nome = data.nome,
            this.value = nota,
            this.descricao = data.descricao_perfil,
            this.bairro = data.bairro,
            this.telefone = data.telefone,
            this.valor = data.valor_diaria
        },
        loadRates(id){
            Api.getRates(id, this.$store.getters.token).then(response => {
                if (response.data.status == 'SUCCESS') {
                    this.rates = response.data.data
                }
            })
        }
    }
}
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
    border: 4px solid  #f0f0f0;
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
}
</style>
