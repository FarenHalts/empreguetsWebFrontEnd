<template>
<div class="historyView" style="text-align: center">
    <div>
        <h1 class="titleHistory">Histórico de Serviços</h1>
    </div>
    <div class="pt-5" style="text-align: -webkit-center;">
        <div style="width: 75% !important;">
            <el-table stripe :data="services" style="width: 100%">
                <el-table-column label="Nome">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.nome }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Endereço">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.endereco }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Data">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.data }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Valor">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ "R$" + scope.row.valor + ",00" }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Status">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status_servico === 'pendente' ? 'primary' : scope.row.status_servico === 'concluido' ? 'success' : 'danger'" size="medium">
                            <div>
                                {{ changeLetter(scope.row.status_servico) }}

                            </div>
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="">
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" @click="rateService(scope.$index, scope.row)">Avaliar</el-button> -->
                        <div @click="dial(scope.$index, scope.row)">
                            <el-rate v-model="rateValue[scope.$index]" :colors="colors">
                            </el-rate>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="" :visible.sync="dialogVisible" width="30%">
            <div class="rateStyle">
                <div>
                    <div class="styleFontLabel">
                        Agora diga o que achou do serviço de
                    </div>
                    <div class="styleFont">
                        {{this.rateDialog.data.nome}}
                    </div>
                </div>
                <div class="labelRate pt-2">
                    <!-- <div>{{this.rateDialog.rate}}</div> -->
                    <!-- <label>Avaliação</label> -->
                    <el-rate v-model="rateDialog.rate" :colors="colors">
                    </el-rate>
                </div>
                <div class="pt-2" style="margin-top: 35px;">
                    <!-- <label>Descrição da avaliação</label> -->
                    <el-input :autosize="{ minRows: 4, maxRows: 4}" type="textarea" placeholder="Insira aqui uma mensagem" v-model="descricao_avalicao" maxlength="200" show-word-limit>
                    </el-input>
                </div>
                <div class="styleProblem">
                    <div class="mb-1">
                        Ocorreu algum problema com o serviço?
                    </div>
                    <el-switch v-model="contratempo">
                    </el-switch>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancelar</el-button>
                <el-button @click="rateService()">Avaliar</el-button>
            </span>
        </el-dialog>
    </div>
</div>
</template>

<script>
import api from './historyService'
export default {
    data() {
        return {
            services: [],
            avalicao: '5',
            descricao_avalicao: '',
            contratempo: false,
            rateValue: [],
            colors: {
                1: '#ff9030',
                2: '#ffb575',
                3: '#ffd0a9',
                4: '#ffd787',
                5: '#ffc857'
            },
            // colors: ['#99A9BF', '#ffc857', '#ffc857', '#6610f2'],
            dialogVisible: false,
            rateDialog: {
                data: {},
                rate: '',
                idServico: '' 
            },
        }
    },
    created() {
        this.listServices();
    },
    methods: {
        rateService() {
            let rateObj = {
                "id_servico": this.rateDialog.idServico.toString(),
                "avaliacao": this.rateDialog.rate.toString(),
                "descricao_avaliacao": this.descricao_avalicao,
                "contratempo": this.contratempo.toString()
            }
            api.rateService(rateObj, localStorage.getItem("token")).then(response => {
                if (response.status == 200) {
                    this.listServices()
                    this.dialogVisible = false
                }
            }).catch(err => {
                if (err.response.status == 400) {
                    this.$message({
                        message: err.response.data.message,
                        type: "error",
                    });
                }
            })
        },
        listServices() {
            api.services(this.$store.getters.userData.id_usuario, localStorage.getItem("token")).then(response => {
                if (response.status == 200) {
                    this.services = response.data.data
                }
            })
        },
        changeLetter(item) {
            // let letter = string.replace(/^./, string[0].toUpperCase());
            return item
        },
        dial(index, item) {
            console.log(item);
            console.log(this.rateValue[index]);
            this.dialogVisible = true;
            this.rateDialog = {
                data: item,
                rate: this.rateValue[index],
                idServico: item.id_servico
            }
        }
    }
}
</script>

<style>
.titleHistory {
    font-family: LobsterRegular;
    font-size: 30px;
    color: #f0f0f0;
    padding-top: 50px;
}

.rateStyle label {
    font-size: 15px;
    color: gray;
    margin-bottom: 2px !important;
}

.labelRate label {
    font-size: 15px;
    color: gray;
    margin-bottom: -5px !important;
}

.styleFontLabel {
    font-family: RobotoRegular;
    font-size: 20px;
    color: #bcc2ce;
}

.styleFont {
    font-family: RobotoRegular;
    font-size: 20px;
}

.styleProblem{
    padding-top: 10px;
    font-size: 12px;
    font-family: RobotoRegular;
    text-align: left;
    color: #bcc2ce;
}
</style>
