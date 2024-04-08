import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import logo from '../images/logo.png'
import Reminders from '../components/Reminders.jsx'
import { useUser } from '../provider/userProvider' // Import useUser hook

const Home = () => {
    const { userData } = useUser() // Destructuring userData object from useUser
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true)

    const openSideMenu = () => {
        setIsSideMenuOpen(true)
    }

    const closeSideMenu = () => {
        setIsSideMenuOpen(false)
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)')
        const handleMediaQueryChange = () => {
            if (mediaQuery.matches) {
                openSideMenu() // Call openSideMenu when media query matches
            }
        }
        // Add event listener for media query changes
        mediaQuery.addEventListener('change', handleMediaQueryChange)

        // Initial check
        handleMediaQueryChange()

        // Cleanup function
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])

    return (
        <div className='container'>
            <Sidebar
                closeSideMenu={closeSideMenu}
                isSideMenuOpen={isSideMenuOpen}
            />
            <div className='main-content'>
                <main>
                    <Outlet />
                </main>
                <div className='right-section'>
                    <Navbar openSideMenu={openSideMenu} />
                    <div className='user-profile'>
                        <div className='logo'>
                            <img alt='logo' src={logo} />
                            <h2>{userData.adm_no || 'Loading...'}</h2>{' '}
                            {/* Displaying username */}
                            <p>{userData.category || 'Not Initialisd'}</p>{' '}
                            {/* Displaying status */}
                        </div>
                    </div>
                    <Reminders />
                </div>
            </div>
        </div>
    )
}

export default Home
