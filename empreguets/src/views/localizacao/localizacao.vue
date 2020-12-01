<template>
<div class="container-fluid localizacao invisibleInputs">
    <div>
        <div>
            <h1 class="title text-center">Pesquisar por prestadores de serviço próximos a sua localização</h1>
        </div>
        <div class="row justify-content-center pt-4">
            <div class="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-5">
                <el-input placeholder="Digite a região" v-model="search" suffix-icon="el-icon-search"></el-input>
            </div>
        </div>
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
                    :position="m.position"
                    :clickable="true"
                    @click="logItem(m)"
                    icon="https://firebasestorage.googleapis.com/v0/b/empreguets-4e2d3.appspot.com/o/icons%2Fplaceholder.png?alt=media&token=b001d7e8-19f2-407f-880a-ae0656f05d72" 
                />
            </GmapMap>

        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            markers: [
                {
                    position: { lat: -25.5338, lng: -49.2494 },
                    user: {nome: 3}
                },
                {
                    position: { lat: -25.5338137, lng: -49.2494014 }
                },
                {
                    position: { lat: -25.4809929, lng: -49.2994652 }
                },
            ]
        }
    },
    methods: {
        logItem(item){
            console.log(item)
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
