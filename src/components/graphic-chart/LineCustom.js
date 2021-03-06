import React from 'react'
import { Line } from 'react-chartjs-2'

const LineCustom = ({ favData, shareData, viewData }) => {
    const labels = favData && favData.map((item) => {
        var day = item.day, month = item.month, month = item.month, year = item.year;
        day = day.toString().length < 2 ? '0' + day : day;
        month = month.toString().length < 2 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    })
    const data_fav = favData && favData.map((item) => {
        return item.total;
    })
    const data_share = shareData && shareData.map((item) => {
        return item.total;
    })
    const data_view = viewData && viewData.map((item) => {
        return item.total;
    })
    const state = {
        labels: labels,// ['Jan', 'Feb', 'March', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'],
        datasets: [
            {
                label: 'Favorite Per Days',
                fill: false,
                backgroundColor: '#009245',
                borderColor: '#009245',
                borderWidth: 2,
                data: data_fav//[320, 1100, 1000, 500]
            },
            {
                label: 'Shares per Days',
                fill: false,
                borderColor: '#00A68C',
                backgroundColor: '#00A68C',
                borderWidth: 2,
                data: data_share// [120, 320, 250, 520, 390]

            },
            {
                label: 'Views per Days',
                fill: false,
                backgroundColor: '#E0472D',
                borderColor: '#E0472D',
                borderWidth: 2,
                data: data_view// [290, 450, 350, 0, 520, 390]

            }
        ]
    }
    return (
        <div className="flex-col md:pt-4 xl:pt-10 px-0 xl:px-4 xxl:px-8 justify-end">
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