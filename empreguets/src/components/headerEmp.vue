<template>
<div v-if="this.$router.history.current.fullPath != '/login' && this.$router.history.current.fullPath != '/cadastro'">
    <div class="container-fluid">
        <div class="row" v-if="this.$router.history.current.fullPath != '/login' && this.$router.history.current.fullPath != '/cadastro'" style="justify-content: space-between; background-color: #383838; height: 55px;">
            <div style="display: flex; cursor: pointer" @click="$router.push('/home')">
                <img src="../assets/styles/icons/broom.svg" alt="" style="width: 35px; margin: 0px -5px 0px 10px;">
                <div class="header">Empreguets
                </div>
            </div>
            <div style="margin: 6px 10px 0px 0px; display: inline-flex;">
                <div @click="drawer = true">
                    <el-badge :value="valueBell" :max="10" class="item styleBell">
                        <i class="el-icon-bell" style="color: white; font-size: 20px;"></i>
                    </el-badge>
                </div>
                <div>
                    <el-popover style="cursor: pointer">
                        <div @click="$router.push('/historico')">
                            <div>{{this.$store.getters.userData.nome}}</div>
                        </div>
                        <div @click="$router.push('/meuperfil')">
                            <div>Meu Perfil</div>
                        </div>
                        <div @click="$router.push('/historico')">
                            <div>Histórico de Solicitações</div>
                        </div>
                        <div @click="$router.push('/grafico')">
                            <div>Estatísticas</div>
                        </div>
                        <div @click="logout()">
                            <div>Sair</div>
                        </div>
                        <div slot="reference">
                            <img src="https://i.pinimg.com/736x/05/85/58/058558945fea564ab0a75106bee2b99e.jpg" alt="" width="45" style="border-radius: 50px; border: 1px solid #f0f0f0;">
                        </div>
                    </el-popover>
                </div>
            </div>
        </div>
    </div>
    <el-drawer title="Solicitações" :visible.sync="drawer" :direction="direction">
        <div v-if="solicitation.length > 0">
            <div v-for="(item, index) in solicitation" :key="index" class="solicitationsStyle">
                <div class="borderSolicitation">
                    <div class="inlineInfos">
                        <label>Endereço</label>
                        <span>
                            {{item.endereco}}
                        </span>
                    </div>
                    <div class="inlineInfos">
                        <label>Data</label>
                        <span>
                            {{item.data}}
                        </span>
                    </div>
                    <div class="inlineInfos">
                        <label>Valor</label>
                        <span style="justify-content: space-between; display: flex;">
                            {{"R$" + returnValue(item) + ",00"}}
                            <div style="display: inline-block;">
                                <el-tooltip class="item" effect="dark" content="Recusar Serviço" placement="top-end">
                                    <i class="el-icon-close rejectServiceIcon" @click="rejectService(item)"></i>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="Aceitar Serviço" placement="top-end">
                                    <i class="el-icon-check acceptServiceIcon" @click="acceptService(item)"></i>
                                </el-tooltip>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nullSolicitations" v-else>
            <i class="el-icon-close-notification" style="font-size: 60px; color: #9d9d9d">
            </i>Você não possui notificações
        </div>
    </el-drawer>
</div>
</template>

<script>
import Api from '../services/appService'
export default {
    data() {
        return {
            drawer: false,
            solicitation: [],
            loggedUser: [],
            valueBell: ''
        }
    },
    created() {
        this.checkSolicitations();
    },
    methods: {
        checkSolicitations() {
            let id = this.$store.getters.userData.id_usuario;
            Api.checkSolicitations(id, localStorage.getItem("token")).then(response => {
                // this.$store.commit('SET_SOLICITATIONS', response.data.data)
                this.solicitation = response.data.data;
                this.valueBell = response.data.data.length;
            }).catch(err => {
                if (err.response.status == 400) {
                    this.solicitation = [];
                    this.drawer = false;
                    this.valueBell = '';
                }
            })
        },
        returnValue(item) {
            if (item.novo_valor) {
                return item.novo_valor
            } else {
                return item.valor_proposto
            }
        },
        acceptService(item) {
            let obj = {
                id_agenda: item.id_agenda
            }
            Api.acceptService(obj, localStorage.getItem("token")).then(response => {
                if (response.status == 200) {
                    this.$message({
                        message: response.data.message,
                        type: "success",
                    });
                    this.checkSolicitations();
                }
            })
        },
        rejectService(item) {
            let obj = {
                id_agenda: item.id_agenda
            }
            Api.rejectService(obj, localStorage.getItem("token")).then(response => {
                if (response.status == 200) {
                    this.$message({
                        message: response.data.message,
                        type: "success",
                    });
                    this.checkSolicitations();
                }
            })
        },
        logout(){
            localStorage.clear();
            this.$router.push('/login')
        }
    }
}
</script>

<style>
.styleBell {
    margin-top: 13px;
    margin-right: 23px;
    cursor: pointer;
}

.solicitationsStyle {
    /* padding: 15px 0px 15px 0px; */
    margin: 15px 0px 25px 15px;
    /* margin-bottom: -15px; */
    /* margin-top: -15px; */
    /* padding-bottom: 15px; */
}

.borderSolicitation {
    border-left: 4px solid #44CF6C;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.inlineInfos {
    display: grid;
}

.borderSolicitation label {
    margin-bottom: -3px !important;
    font-size: 13px;
    color: gray;
}

.nullSolicitations {
    position: relative;
    top: 300px;
    text-align: center;
    display: grid;
}

.rejectServiceIcon {
    font-size: 21px;
    margin-right: 15px;
    color: #FF0035;
    cursor: pointer;
}

.acceptServiceIcon {
    font-size: 21px;
    margin-right: 15px;
    color: #44CF6C;
    cursor: pointer;
}
</style>
