import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function SpendingPlot({ data, onChange }) {

  const getOption = () => {
    return {
      legend: {
        data: ['TECNOLOGIA'],
        top: 'top',
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.date.substring(0, 7)),
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        data: data.map(item => item.ratio),
        type: 'line',
        smooth: true,
        name: 'TECNOLOGIA',
        symbol: 'circle',
        symbolSize: 3,
      }],
      tooltip: {
        trigger: 'axis',
      },
    };
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, height: '40%', top: '150px' }}>
      <ReactECharts option={getOption()} style={{ height: '80%', width: '90%' }} />
    </div>
  );
}

