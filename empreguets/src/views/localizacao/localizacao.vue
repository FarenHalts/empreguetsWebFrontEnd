<template>
<div class="container-fluid localizacao invisibleInputs">
    <div>
        <div>
            <h1 class="title text-center">{{"Pesquisar por " + typeUser() + " de serviço próximos a sua localização"}}</h1>
        </div>
        <!-- <div class="row justify-content-center pt-4">
            <div class="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-5">
                <el-input placeholder="Digite a região" v-model="search" suffix-icon="el-icon-search"></el-input>
            </div>
        </div> -->
        <div class="row justify-content-center" style="padding-top: 20px">
            <GmapMap
                class="mapStyle"
                :center="{lat:-25.5065, lng:-49.2641}"
                :zoom="11"
                map-type-id="roadmap"
                >
                <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m"
                    :clickable="true"
                    @click="logItem(m)"
                    icon="https://firebasestorage.googleapis.com/v0/b/empreguets-4e2d3.appspot.com/o/icons%2Fpin.png?alt=media&token=39914f6e-ea6b-4ada-a2a2-82e6ed6375b1" 
                />
            </GmapMap>

        </div>
            <div class="row" style="justify-content: center;" v-if="this.canShowCard == true">
            <div @click="sendToProfile(user)">
                <el-card class="cards">
                    <img :src="user.foto" class="image" />
                    <div style="padding: 14px">
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="titleCards">{{ returnName(user.nome) }}</h3>
                            <el-rate v-model="user.avaliacao_media" disabled disabled-void-color="#f0f0f0" :colors="colors">
                            </el-rate>
                        </div>
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="subTitleCards">{{ user.bairro }}</h3>
                            <h3 class="subTitleCards">
                                {{ "R$" + user.valor_servico + "/Diária" }}
                            </h3>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Api from './localizationService'
export default {
    data() {
        return {
            search: '',
            markers: [
                // {
                //     position: { lat: -25.518119054649656, lng: -49.255530194461585 },
                //     user: {nome: 3}
                // }
            ],
            user: [],
            colors: ["#FFC857", " #FFC857", " #FFC857"],
            canShowCard: false
        }
    },
    created() {
        this.getLocalizations()
    },
    methods: {
        logItem(item){
            console.log(item);
            let id = item.id_usuario
            if (this.$store.getters.userData.tipo_usuario == "Solicitador") {
                Api.getOnePrestador(id, localStorage.getItem("token")).then(response => {
                    if (response.status == 200) {
                        this.user = response.data.data
                        this.canShowCard = true
                    }
                })
            } else {
                Api.getOneSolicitador(id, localStorage.getItem("token")).then(response => {
                    if (response.status == 200) {
                        this.user = response.data.data
                        this.canShowCard = true
                    }
                })
            }
        },
        getLocalizations(){
            if (this.$store.getters.userData.tipo_usuario == "Solicitador") {
                Api.getPrestadoresLocalization(localStorage.getItem("token")).then(response => {
                    if (response.status == 200) {
                        console.log(response);
                        this.markers = response.data.data
                        this.markers.map(item => {
                            console.log(item.lat.parseFloat());
                        })
                    }
                })
            } else {
                Api.getSolicitadoresLocalization(localStorage.getItem("token")).then(response => {
                    if (response.status == 200) {
                        console.log(response);
                        this.markers = response.data.data
                        this.markers.map(item => {
                            item.lat.parserFloat()
                            item.lng.parserFloat()
                        })
                    }
                })
            }
        },
        typeUser(){
            if (this.$store.getters.userData.tipo_usuario == "Solicitador") {
                return "Prestadores"
            } else {
                return "Solicitadores"
            }
        },
        returnName(name){
            let convertedName = name.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2");
            return convertedName
        },
        sendToProfile(data) {
            this.$store.commit("SET_PROFILE_DATA", data);
            this.$router.push("/perfil");
        },
    }
}
</script>

<style scoped>
.mapStyle{
    width: 600px;
    height: 400px;
    border: 6px solid white;
    border-radius: 8px;
}
.subTitleCards {
    font-family: LobsterRegular;
    font-size: 16px;
    color: #f0f0f0;
    padding-left: 5px;
}
.titleCards {
    font-family: LobsterRegular;
    font-size: 19px;
    color: #f0f0f0;
    padding-left: 5px;
}
.cards {
    margin: 20px 15px 0px 15px;
}
.image {
    width: 100%;
    display: block;
    width: 231px;
    height: 237px;
}
</style>
