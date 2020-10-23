<template>
<div class="home">
    <div class="container-fluid">

    
    <h1 class="bestRatings">Prestadores melhores avaliados de Curitiba</h1>
    <div class="row" style="justify-content: center; ">
        <div v-for="(o) in 4" :key="o">
            <el-card class="cards" @click.native="$router.push('/perfil')">
                <img src="./unnamed.png" class="image">
                <div style="padding: 14px;">
                    <div class="row" style="justify-content: space-between; padding: 0px 2px;">
                        <h3 class="titleCards">Edina Soares</h3>
                        <el-rate v-model="value" disabled disabled-void-color="#f0f0f0" :colors="colors">
                        </el-rate>
                    </div>
                    <div class="row" style="justify-content: space-between; padding: 0px 2px;">
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
    <div class="row" style="justify-content: center; margin-bottom: 5%;">
        <div v-for="(o) in 12" :key="o">
            <el-card class="cards" @click.native="$router.push('/perfil')">
                <img src="./unnamed.png" class="image">
                <div style="padding: 14px;">
                    <div class="row" style="justify-content: space-between; padding: 0px 2px;">
                        <h3 class="titleCards">Edina Soares</h3>
                        <el-rate v-model="value" disabled disabled-void-color="#f0f0f0" :colors="colors">
                        </el-rate>
                    </div>
                    <div class="row" style="justify-content: space-between; padding: 0px 2px;">
                        <h3 class="subTitleCards">Alto Boqueirão</h3>
                        <h3 class="subTitleCards">R$190,00/Diária</h3>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            topAvaliados: {
                nome: 'oi',
                idade: 2,
            },
            value: 3.5,
            colors: ['#FFC857', ' #FFC857', ' #FFC857']
        }
    }
}
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
    font-size: 20px;
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
    margin-top: 50px
}

.searchAround {
    cursor: pointer;
    font-family: LobsterRegular;
    font-size: 30px;
    color: #f0f0f0;
}
</style>
