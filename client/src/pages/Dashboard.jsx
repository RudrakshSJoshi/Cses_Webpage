import React, { useState } from 'react'

let events = [
    {
        name: 'Name of the Event',
        detail: 'Some information about the event that is to be conducted. Some information about the event that is to be conducted. English Wikipedia, often as a stand-in for Wikipedia overall, has been praised for its enablement of the democratization of knowledge, extent of coverage, unique structure, culture, and reduced degree of commercial bias. It has been criticized for exhibiting systemic bias, particularly gender bias against women and ideological bias.[7][8] While its reliability was frequently criticized in the 2000s, it has improved over time, receiving greater praise in the late 2010s and early 2020s.'
    },
    {
        name: 'Name of the Event 1',
        detail: 'this is a website for CSE Society '
    },
    {
        name: 'Name of the Event',
        detail: 'Some information about the event that is to be conducted. Some information about the event that is to be conducted. '
    },
    {
        name: 'Name of the Event',
        detail: 'Some information about the event that is to be conducted. Some information about the event that is to be conducted. '
    }
]

const Dashboard = () => {
    const [curEvent, setCurEvent] = useState({
        name: '',
        detail: 'Click on an Event to get Started'
    })
    return (
        <div>
            <h1>Dashboard</h1>
            <div className='recent-orders'>
                <h2>Events</h2>
                <div className='eventRow'>
                    <div className='eventHead'>
                        {events.map((item, index) => (
                            <div
                                key={index}
                                className='eventItem'
                                onClick={() => setCurEvent(item)}
                            >
                                <span>{item.name}</span>
                                <p>{item.detail}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h1>{curEvent.name}</h1>
                        <p>{curEvent.detail}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
