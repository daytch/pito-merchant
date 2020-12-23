import React from 'react'
import { Bar } from 'react-chartjs-2'

const Bars = () => {
    const state = {
        labels: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        datasets: [
            {
                label: 'Users Pito',
                background: 'linear-gradient(90deg, rgba(148,148,148,1) 0%, rgba(169,169,169,1) 2%, rgba(195,195,195,1) 5%, rgba(217,217,217,1) 11%, rgba(234,234,234,1) 18%, rgba(246,246,246,1) 25%, rgba(253,253,253,1) 32%, rgba(255,255,255,1) 70%, rgba(255,255,255,1) 100%)',
                borderColor: '#324553',
                borderWidth: 2,
                lineTension: 0,
                data: [200, 300, 500, 350, 400, 600, 500, 700]
            }
        ]
    }
    return (
        <div className="flex-col pt-10 px-4 xxl:px-8 justify-end">
            <div className="w-full text-right">
                <h2 className="font-semibold text-5xl text-gray-300">MERCHANT</h2>
                <span className="font-semibold text-xl text-gray-300">GRAPH</span>
            </div>
            <div className="mt-10">
                <Bar data={state}
                    options={{
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
                <div className="mt-8 w-full flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 text-right md:px-5">
                        <span className="font-semibold text-lg text-gray-400">TOTAL PITO USER</span>
                        <h2 className="font-semibold text-5xl text-red-600">223.560</h2>
                    </div>
                    <div className="lg:w-1/2 text-justify">
                        <p className="font-light text-xs">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodMERCHANTGRAPH
                                </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bars;