import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function TaxonomyPlot({ data }) {
    const getOption = () => {
        return {
            legend: {
                data: ["Low", "Mid", "High"],
                textStyle: {
                    color: 'white',
                },
            },
            xAxis: {
                type: 'time',
                data: data.map(item => item.date.substring(0, 7)),
                axisLabel: {
                    color: 'white',
                },
            },
            yAxis: {
                type: 'value',
                name: 'ratio',
                axisLabel: {
                    color: 'white',
                },
                nameTextStyle: {
                    color: 'white',
                },
            },
            series: Array.from(new Set(data.map(item => item.q))).map(qValue => ({
                name: qValue,
                type: 'line',
                data: data.filter(item => item.q === qValue).map(item => [item.date, item.ratio]),
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                lineStyle: {
                    color: getColor(qValue),
                },
            })),
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                top: '10%',
                right: '5%',
                left: '5%',
                bottom: '10%',
            },
        };
    };

    const getColor = (qValue) => {
        switch (qValue) {
            case 'q1': return '#dbff33';
            case 'q2': return '#1b9e77';
            case 'q3': return '#d95f02';
        }
    };

    return (
        <div style={{ position: 'relative', zIndex: 1, height: '300px', right: "1%", left: "1%" }}>
          <ReactECharts option={getOption()} style={{ height: '100%', width: '99%' }} />
    </div>
    );
}

