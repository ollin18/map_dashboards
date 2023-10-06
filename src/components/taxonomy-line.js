import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function TaxonomyPlot({ data, onChange }) {

  const getOption = () => {
    return {
      legend: {
        data: ['q'],
        textStyle: {
          color: 'white',
        },
      },
      xAxis: {
        type: 'category',
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
      series: [{
        data: data.map(item => item.ratio),
        type: 'line',
        smooth: true,
        name: 'q',
        symbol: 'circle',
        symbolSize: 1,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0, color: '#dbff33' // color at 0% position
          }, {
            offset: 0.5, color: '#1b9e77' // color at 50% position
          }, {
            offset: 1, color: '#d95f02' // color at 100% position
          }])
        },
      }],
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

  return (
    <div style={{ position: 'relative', zIndex: 1, height: '25%', top: '10%', right: "5%", left: "5%" }}>
      <ReactECharts option={getOption()} style={{ height: '100%', width: '90%' }} />
    </div>
  );
}

