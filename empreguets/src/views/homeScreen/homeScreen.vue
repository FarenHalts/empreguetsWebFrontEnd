<template>
<div class="home">
    <div class="container-fluid">
        <h1 class="bestRatings">Prestadores melhores avaliados de Curitiba</h1>
        <div class="row" style="justify-content: center">
            <div v-for="o in 4" :key="o">
                <el-card class="cards" @click.native="$router.push('/perfil')">
                    <img src="./unnamed.png" class="image" />
                    <div style="padding: 14px">
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="titleCards">Edina Soares</h3>
                            <el-rate v-model="value" disabled disabled-void-color="#f0f0f0" :colors="colors">
                            </el-rate>
                        </div>
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="subTitleCards">Alto Boqueirão</h3>
                            <h3 class="subTitleCards">R$190,00/Diária</h3>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="searchAroundDiv">
            <span class="searchAround" @click="$router.push('/localizacao')">Pesquise também por prestadores próximos a você</span>
        </div>
        <h1 class="bestRatings">Demais Prestadores em Curitiba</h1>
        <div class="row" style="justify-content: center; margin-bottom: 5%">
            <div v-for="(item, index) in dataUsers" :key="index" @click="sendToProfile(item)">
                <el-card class="cards">
                    <img src="./unnamed.png" class="image" />
                    <div style="padding: 14px">
                        <div class="row" style="justify-content: space-between; padding: 0px 2px">
                            <h3 class="titleCards">{{ item.nome }}</h3>
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
            value: null
        };
    },
    created() {
        // this.verifyProfile();
        this.getProfiles();
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
            }
            //Listar Solicitadores
            else {
                Api.getSolicitadores(localStorage.getItem('token')).then((response) => {
                    if (response.status == 200) {
                        this.value = response.data.data.avaliacao_media;
                        this.dataUsers = response.data.data;
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
