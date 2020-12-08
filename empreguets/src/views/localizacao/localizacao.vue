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
        <div class="row justify-content-center" style="padding-top: 50px">
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
            ]
        }
    },
    created() {
        this.getLocalizations()
    },
    methods: {
        logItem(item){
            console.log(item)
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
        }
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
</style>
