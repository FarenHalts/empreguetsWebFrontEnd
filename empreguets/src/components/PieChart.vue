<script>
import {
    Pie
} from 'vue-chartjs'
import api from '../views/grafico/graficoService'

export default {
    extends: Pie,
    data() {
        return {
            pending: 34,
            chartData: {
                labels: ["Concluidos", "Pendentes", "Reportados"],
                datasets: [{
                    borderWidth: 1,
                    borderColor: [
                        'rgba(0,141,125,1)',
                        'rgba(242, 209, 99, 1)',
                        'rgba(192, 50, 39, 1)'
                    ],
                    backgroundColor: [
                        'rgba(49,118,148,1)',
                        'rgba(188, 159, 131, 1)',
                        'rgba(160, 66, 91, 1)'
                    ],
                    data: [null, null, null]
                }]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted() {
        this.renderChart(this.chartData, this.options)
        api.getGraphicData()
            .then((response) => {
                if (response.status == "SUCCESS") {
                    this.chartData.datasets[0].data[0] = response.data.completed
                    this.chartData.datasets[0].data[1] = response.data.pendings
                    this.chartData.datasets[0].data[2] = response.data.reports
                    this.$data._chart.update()
                }
            }) 
            .catch((err) =>{
                if (err.response.status == 403) {
                    console.log('vaza do meu sistema');
                }
                console.log('err', err.response);
            })
    },
}
</script>
