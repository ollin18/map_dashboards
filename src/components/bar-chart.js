import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function BarPlots({ data }) {

  const getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['spent'],
        textStyle: {
          color: 'white',
        },
      },
      yAxis: {
        type: 'category',
        data: data.map(item => item.busisness),
        axisLabel: {
          color: 'white',
        },
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          color: 'white',
          formatter: (val) => {
            return val + "%";
          },
        },
      },
      series: [{
        data: data.map(item => item.spent),
        type: 'bar',
        name: 'spent',
        itemStyle: {
          color: '#80B2D3',
        },
        barWidth: '60%',
      }],
      grid: {
        top: '10%',
        right: '5%',
        left: '5%',
        bottom: '10%',
      },
    };
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, height: '100%', top: '15px' }}>
      <ReactECharts option={getOption()} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

