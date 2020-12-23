import React from 'react'
import { Line } from 'react-chartjs-2'

const LineCustom = () => {
    const state = {
        labels: ['Jan', 'Feb', 'March', 'June', 'July', 'Aug'],
        datasets: [
            {
                label: 'Favorite Per Months',
                fill: false,
                backgroundColor: '#009245',
                borderColor: '#009245',
                borderWidth: 2,
                data: [320, 1100, 1000, 500]
            },
            {
                label: 'Shares per Month',
                fill: false,
                borderColor: '#00A68C',
                backgroundColor: '#00A68C',
                borderWidth: 2,
                data: [120, 320, 250, 520, 390]

            },
            {
                label: 'Views per Month',
                fill: false,
                backgroundColor: '#E0472D',
                borderColor: '#E0472D',
                borderWidth: 2,
                data: [290, 450, 350, 0, 520, 390]

            }
        ]
    }
    return (
        <div className="flex-col pt-4 xl:pt-10 px-0 xl:px-4 xxl:px-8 justify-end">
            <div className="mt-10 w-full" style={{ height: "50vh" }}>
                <Line data={state}
                    options={{
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                fontColor: '#333',
                                usePointStyle: true,
                                padding: 34
                            },


                        },
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default LineCustom;