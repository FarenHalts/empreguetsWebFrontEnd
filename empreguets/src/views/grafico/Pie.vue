<template>
<div class="container-fluid">
    <h1 class="titleGraphs">Gráfico dos status de serviços</h1>
    <div class="row justify-content-center" style="padding-top: 50px;">
        <div>
            <pie-chart></pie-chart>

        </div>
        <div style="margin-left: 50px; margin-top: 70px;">
            <div class="status statusCompleted">{{this.completed + '% Concluídos'}}</div>
            <div class="status statusPending">{{this.pending + '% Pendentes'}}</div>
            <div class="status statusReported">{{this.reports + '% Reportados'}}</div>
        </div>
    </div>

</div>
</template>

<script>
import PieChart from '@/components/PieChart'
import api from './graficoService'

export default {
    components: {
        PieChart
    },
    data() {
        return {
            completed: null,
            pending: null,
            reports: null
        }
    },
    created() {
        this.getGraphicData();
    },
    methods: {
        getGraphicData() {
            api.getGraphicData(this.$store.getters.userData.id_usuario, localStorage.getItem("token"))
                .then(response => {
                    if (response.status == 200) {
                        const total = 100
                        const completed = response.data.data.completed
                        const pendings = response.data.data.pendings
                        const reports = response.data.data.reports
                        const contarRep = completed + pendings + reports

                        let semitotalRep = total / total / contarRep
                        let Treports = semitotalRep * reports * total
                        this.reports = Math.round(Treports)

                        let contarPend = total / total / contarRep
                        let Tpending = contarPend * pendings * total
                        this.pending = Math.round(Tpending)

                        let contarComp = total / total / contarRep
                        let Tcompleted = contarPend * completed * total
                        this.completed = Math.round(Tcompleted)
                    }
                })

        }
    }
}
</script>

<style scoped>
.status {
    border: 4px solid;
    width: 200px;
    border-radius: 3px;
    padding: 10px;
    font-family: robo;
    font-family: RobotoRegular;
    font-size: 18px;
    color: #f0f0f0;
    margin: 20px;
}

.statusCompleted {
    background-color: #317694;
    border-color: #008a80;
}

.statusPending {
    background-color: #bc9f83;
    border-color: #f2d063;
}

.statusReported {
    background-color: #a0425b;
    border-color: #c13118;
}

.titleGraphs {
    font-family: LobsterRegular;
    font-size: 30px;
    color: #f0f0f0;
    text-align: center;
    padding-top: 50px;
}
</style>
