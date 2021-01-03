import React from 'react'
import moment from 'moment'
import Avatar from 'react-avatar';

const Card = ({ ListData }) => {
    return (
        <>
            <div className="w-2/3 mt-3 flex items-center mx-auto">
                <div className="chat-content p-6 border rounded-t-lg bg-gray-100">
                    {
                        ListData && ListData.map((item, index) => {
                            return (<div key={index}>
                                { item.name === localStorage.getItem('PITO:name') ?
                                    <div className="w-full flex my-4">
                                        <div className="w-5/6">
                                            <h2 className="text-lg font-medium text-gray-800 my-0">{item.name}</h2>
                                            <div className="my-2 text-gray-800 text-xs">
                                                <span className="mr-4">{moment(item.lastUpdated).format('YYYY-MM-DD HH:mm:ss')}</span>
                                            </div>
                                            <p className="font-light text-gray-900">{item.text}</p>
                                        </div>
                                        <div className="w-1/6">
                                            {
                                                item.image ? (<img style={{ width: 100, height: 100 }} src={item.image} className="px-1 w-30" alt={item.name}></img>) :
                                                    (<Avatar name={item.name} className="mx-auto" round={true} size="100px" />)
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="w-full bg-white px-6 py-6 flex my-4 rounded-lg">
                                        <div className="w-1/6">
                                            {
                                                item.image ? (<img style={{ width: 100, height: 100 }} src={item.image} className="px-1 w-30" alt={item.name}></img>) :
                                                    (<Avatar name={item.name} className="mx-auto" round={true} size="100px" />)
                                            }
                                        </div>
                                        <div className="w-5/6">
                                            <h2 className="text-lg font-medium text-gray-800 my-0">{item.name}</h2>
                                            <div className="my-2 text-gray-800 text-xs">
                                                <span className="mr-4">{moment(item.lastUpdated).format('YYYY-MM-DD HH:mm:ss')}</span>
                                            </div>
                                            <p className="font-light text-gray-900">{item.text}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            )
                        })
                    }
                </div>
            </div></>
    )
}

export default Card;