import { AuthProvider } from './provider/authProvider'
import { UserProvider } from './provider/userProvider'
import { PaymentProvider } from './provider/paymentProvider'
import { AlertProvider } from './provider/useAlert';

import Routes from './routes'
import { useEffect } from 'react'

function App() {
    useEffect(() => {
        if (localStorage.getItem('mode') === 'true') {
            document.body.classList.toggle('dark-mode-variables', true)
        }
    })

    return (
        <AlertProvider>
            <AuthProvider>
                <UserProvider>
                    <PaymentProvider>
                        <Routes />
                    </PaymentProvider>
                </UserProvider>
            </AuthProvider>
        </AlertProvider>
    )
}

export default App
