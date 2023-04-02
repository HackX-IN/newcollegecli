import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line,Doughnut } from 'react-chartjs-2';




ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export function LIneChart({views=[]}) {
 

 const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = getlastyearMonth()
  
   const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: views,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
   
    ],
  };
  

    return <Line options={options} data={data} />;
  }
  

export function Doughnut1({users=[]}) {


const data = {
  labels: ['Subscribed','Not Subscribed'],
  datasets: [
    {
      label: 'subscription',
      data:users,
      backgroundColor: [
        'rgba(62, 12, 171)',
        'rgba(214, 43, 129)',
        
      ],
      borderColor: [
        'rgba(62, 12, 171,0.3)',
        'rgba(214, 43, 129,0.3)',
        
      ],
      borderWidth: 1,
    },
  ],
};





  return <Doughnut data={data}  />;
}

function getlastyearMonth(){
  const labels=[]

  const months=["jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec"];

  const currentMonth=new Date().getMonth();

  const remain= 11-currentMonth;

  for (let i = currentMonth; i < months.length; i--) {
    const element = months[i];

  labels.unshift(element)

  if(i===0) break;
}


  for (let i = 11; i > remain; i--) {
    const element = months[i];
    labels.unshift(element);

    if(i===currentMonth) break;
    
  }

    return labels;


  
}

