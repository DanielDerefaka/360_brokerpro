"use client"
import React from 'react'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}: DoughnutChartProps) => {

    const data = {
        datasets: [
            {
                label: '360 Account',
                data: [1250],
                backgroundColor: ['#0747B6', '#2265d8', '#2f91fa']
            }
        ],

         labels: ['Account']
    }
  return (
    <div>
        <Doughnut
        
        data={data}
        options={
            {
                plugins: {
                    legend:{
                        display: false 
                    }
                }
            }
        }
        /> 
    </div>
  )
}

export default DoughnutChart