<template>
<div class="container-fluid localizacao">
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
                :zoom="14"
                map-type-id="roadmap"
                >
                <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
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
            search: ''
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
