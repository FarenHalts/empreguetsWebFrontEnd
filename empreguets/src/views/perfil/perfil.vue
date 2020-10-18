<template>
<div>
    <div class="row containerProfile">
        <div>
            <img class="profileImage" src="../homeScreen/unnamed.png" alt="fotoPerfil">
        </div>
        <div>
            <div style="display: flex;">
                <h3 class="nameProfile">Edina Soares</h3>
                <el-rate v-model="value" class="alignStarts" disabled disabled-void-color="#f0f0f0" :colors="colors">
                </el-rate>
            </div>
            <div class="labelsProfile">
                <span>Descrição</span>
            </div>
            <div class="decription profileData">
                <span>Honesta, trabalhadora e família, gosto de churros com chanela, meus filhos são tudo para mim.</span>
            </div>
            <div>
                <div>
                    <div class="labelsProfile">
                        <span>Localização</span>
                    </div>
                    <div class="profileData">
                        <span>Alto Boqueirão</span>
                    </div>
                </div>
                <div>
                    <div class="labelsProfile">
                        <span>Contato</span>
                    </div>
                    <div class="profileData">
                        <span>(41) 99900-0156</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="labelsProfile">
                    <span>Valor Diária</span>
                </div>
                <div class="profileData">
                    <span>R$190,00</span>
                </div>
            </div>
            <div class="services">
                <span>Já efetuou 9 serviços pela empreguets.</span>
            </div>
        </div>
    </div>
    <div class="containerProfile">
        <h3 class="ratesTitle">Avaliações</h3>
        <div v-for="(o) in 4" :key="o">
            <div style="display: flex; justify-content: center;">
                <div class="roundedAvatarRates">
                    <img src="https://i.pinimg.com/736x/05/85/58/058558945fea564ab0a75106bee2b99e.jpg" height="70" width="70">
                </div>
                <div>
                    <div style="display: flex;">
                        <span class="titlesNameRates">Padre Marcelo</span>
                        <el-rate v-model="value" class="alignRatingStarts" disabled disabled-void-color="#f0f0f0" :colors="colors">
                        </el-rate>
                    </div>
                    <div class="titlesCommentRates">
                        <span>"Edina é uma pessoa com Deus no coração, isso me da confiança."</span>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            value: 4,
            colors: ['#FFC857', ' #FFC857', ' #FFC857']
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
