import React from 'react';
import { Line } from 'react-chartjs-2';

let StockChart = ({ chartData, ticker}) => {
  const data = {
    // labels: ['January', 'February', 'March', 'April', 'May','June', 'July'],
    labels: chartData.map(point => point.timestamp),
    datasets: [
      {
        animation: false,
        label: ticker,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0,4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData.map(point => point.val)
      }
    ]
  };

  return (
    <div>
      <Line data={data} />
    </div>
  )
}

export default StockChart;



