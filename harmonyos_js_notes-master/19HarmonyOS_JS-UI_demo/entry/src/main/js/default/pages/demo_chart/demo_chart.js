//导入图表数据
import bardata from "../../common/data/bardata.js"
export default {
    data: {
        // 线图
        lineData: [
            {
                strokeColor: '#0081ff',
                fillColor: '#cce5ff',
                data: [763, 550, 551, 554, 731, 654, 525, 696, 595, 628, 791, 505, 613, 575, 475, 553, 491, 680, 657, 716],
                gradient: true,
            }
        ],
        lineOps: {
            xAxis: {
                min: 0,
                max: 20,
                display: false,
            },
            yAxis: {
                min: 0,
                max: 1000,
                display: false,
            },
            series: {
                lineStyle: {
                    width: "5px",
                    smooth: true,
                },
                headPoint: {
                    shape: "circle",
                    size: 20,
                    strokeWidth: 5,
                    fillColor: 'red',
                    strokeColor: 'yellow',
                    display: true,
                },
                loop: {
                    margin: 1,
                    gradient: false,
                }
            }
        },
        // 柱图
        barData: bardata,
        barOps: {
            // x轴
            xAxis: {
                min: 0,
                max: 20,
                // x轴是否显示
                display: true,
                // 步长
                axisTick: 10,
            },
            yAxis: {
                min: 0,
                max: 1000,
                // y轴是否显示
                display: true,
            },
        },
    },
    addData() {
        this.$refs.linechart.append({
            serial: 0,
            data: [Math.floor(Math.random() * 400) + 400]
        })
    }
}