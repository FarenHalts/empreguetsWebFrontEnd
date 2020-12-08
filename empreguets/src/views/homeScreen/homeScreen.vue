<template>
<div class="home">
    <div class="container-fluid">
        <h1 class="bestRatings">{{typeUser()+" melhores avaliados de Curitiba"}}</h1>
        <div class="row" style="justify-content: center">
            <div v-for="(item, index) in dataTopUsers" :key="index" @click="sendToProfile(item)">
                <el-card class="cards">
                    <img :src="item.foto" class="image" />
                    <div style="padding: 14px">
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="titleCards">{{ returnName(item.nome) }}</h3>
                            <el-rate v-model="item.avaliacao_media" disabled disabled-void-color="#f0f0f0" :colors="colors">
                            </el-rate>
                        </div>
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="subTitleCards">{{ item.bairro }}</h3>
                            <h3 class="subTitleCards">
                                {{ "R$" + item.valor_servico + "/Diária" }}
                            </h3>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="searchAroundDiv">
            <span class="searchAround" @click="$router.push('/localizacao')">{{"Pesquise também por " + typeUser() + " próximos a você"}}</span>
        </div>
        <h1 class="bestRatings">{{"Demais " + typeUser() + " em Curitiba"}}</h1>
        <div class="row" style="justify-content: center; margin-bottom: 5%">
            <div v-for="(item, index) in dataUsers" :key="index" @click="sendToProfile(item)">
                <el-card class="cards">
                    <img :src="item.foto" class="image" />
                    <div style="padding: 14px">
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="titleCards">{{ returnName(item.nome) }}</h3>
                            <el-rate v-model="item.avaliacao_media" disabled disabled-void-color="#f0f0f0" :colors="colors">
                            </el-rate>
                        </div>
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="subTitleCards">{{ item.bairro }}</h3>
                            <h3 class="subTitleCards">
                                {{ "R$" + item.valor_servico + "/Diária" }}
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
import Api from "./homeScreenServices";
import solicitationAPI from "../../services/appService";
import axios from "axios";
export default {
    data() {
        return {
            topAvaliados: {
                nome: "oi",
                idade: 2,
            },
            colors: ["#FFC857", " #FFC857", " #FFC857"],
            dataUsers: [],
            dataTopUsers: [],
            value: null
        };
    },
    created() {
        // this.verifyProfile();
        this.getProfiles();
        // this.checkSolicitations();
    },
    methods: {
        getProfiles() {
            //Listar Prestadores
            if (this.$store.getters.userData.tipo_usuario == "Solicitador") {
                Api.getPrestadores(localStorage.getItem('token')).then((response) => {
                    if (response.status == 200) {
                        this.value = response.data.data.avaliacao_media;
                        this.dataUsers = response.data.data;
                    }
                });
                Api.getTopPrestadores(localStorage.getItem('token')).then((response) => {
                    if (response.status == 200) {
                        this.value = response.data.data.avaliacao_media;
                        this.dataTopUsers = response.data.data;
                    }
                });
            }
            //Listar Solicitadores
            else {
                Api.getSolicitadores(localStorage.getItem('token')).then((response) => {
                    if (response.status == 200) {
                        this.value = response.data.data.avaliacao_media;
                        this.dataUsers = response.data.data;
                    }
                });
                Api.getTopSolicitadores(localStorage.getItem('token')).then((response) => {
                    if (response.status == 200) {
                        this.value = response.data.data.avaliacao_media;
                        this.dataTopUsers = response.data.data;
                    }
                });
            }
        },
        sendToProfile(data) {
            this.$store.commit("SET_PROFILE_DATA", data);
            this.$router.push("/perfil");
        },
        // verifyProfile() {
        //     axios
        //         .get(`${process.env.VUE_APP_BASEURL}/profile`, {
        //             headers: {
        //                 authorization: localStorage.getItem("token"),
        //             },
        //         })
        //         .then((response) => {})
        //         .catch((err) => {
        //             if (err.response.status == 403) {
        //                 this.$router.push("/login");
        //             }
        //         });
        // }
        checkSolicitations() {
            solicitationAPI.checkSolicitations(this.$store.getters.userData.id_usuario, localStorage.getItem("token")).then(response => {
                this.$store.commit('SET_SOLICITATIONS', response.data.data)
                // this.solicitation = this.$store.getters.solicitations;
                // this.valueBell = this.$store.getters.solicitations.length;
            }).catch(err => {
                if (err.response.status == 400) {
                    this.solicitation = [];
                    this.drawer = false;
                    this.valueBell = '';
                }
            })
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
        }
    },
};
</script>

<style scoped>
.home {
    text-align: center;
}

.bestRatings {
    font-family: LobsterRegular;
    font-size: 30px;
    color: #f0f0f0;
    padding-top: 50px;
}

.image {
    width: 100%;
    display: block;
    width: 231px;
    height: 237px;
}

.cards {
    margin: 35px 15px 0px 15px;
}

.titleCards {
    font-family: LobsterRegular;
    font-size: 19px;
    color: #f0f0f0;
    padding-left: 5px;
}

.subTitleCards {
    font-family: LobsterRegular;
    font-size: 16px;
    color: #f0f0f0;
    padding-left: 5px;
}

.searchAroundDiv {
    margin-top: 50px;
}

.searchAround {
    cursor: pointer;
    font-family: LobsterRegular;
    font-size: 30px;
    color: #f0f0f0;
}
</style>
