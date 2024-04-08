import { useEffect, useState } from 'react'
import { useUser } from '../provider/userProvider'
import { useAlert } from '../provider/useAlert'
import axiosInstance from '../axiosInstance'

const Payment = () => {
    const currentYear = new Date().getFullYear()
    const { userData } = useUser()
    const showAlert = useAlert()
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        setAmount(userData.category === 'CSES' ? 400 : 1000)
    }, [userData])

    const checkouthandler = async (amount) => {
        try {
            const {
                data: { key }
            } = await axiosInstance.get('getkey')
            const res = await axiosInstance.post('checkout',
                {
                    amount,
                    year: currentYear
                }
            )
            const order = res.data
            console.log(order.order.id)
            console.log({ key })

            const options = {
                key,
                amount: amount * 100,
                currency: 'INR',
                name: 'cses',
                description: 'sdkfls',
                order_id: order.order.id,
                callback_url: `http://${window.location.hostname}:8000/api/paymentVerify`,
                prefill: {
                    name: 'cses',
                    email: 'bla@gmail.com'
                },
                notes: {
                    address: 'skdfnslkd'
                },
                theme: {
                    color: '#3399cc'
                }
            }
            const razor = new window.Razorpay(options)
            razor.open()
        } catch (error) {
            console.log(error.response.data)
            if (!error.response.data || !error.response.data.message) {
                showAlert('Server Error!', 'error')
            }
            showAlert(error.response.data.message, 'error');
        }
    }

    async function formSubmit(e) {
        e.preventDefault()
        if (userData.category === 'CSES') {
            await checkouthandler(400)
        } else if (userData.category === 'ALUMNI' && amount < 1000) {
            showAlert('Minimum amount for alumni is 1000', 'info')
        } else {
            await checkouthandler(amount)
        }
    }

    return (
        <div>
            <h1>Payment</h1>
            <div className='recent-orders'>
                <h2>Make Payment</h2>
                <form className='reminders box' onSubmit={formSubmit}>
                    <label htmlFor='adm_no'>Admission Number</label>
                    <input
                        type='text'
                        id='adm_no'
                        placeholder={userData.adm_no}
                        disabled
                    />

                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        placeholder={userData.name}
                        disabled
                    />

                    <label htmlFor='session'>Year</label>
                    <input
                        type='text'
                        id='session'
                        placeholder={currentYear}
                        disabled
                    />

                    <label htmlFor='category'>Category</label>
                    <input
                        type='text'
                        id='category'
                        placeholder={userData.category}
                        disabled
                    />

                    <label htmlFor='amount'>Amount</label>
                    <input
                        type='text'
                        id='amount'
                        value={amount}
                        disabled={userData.category === 'CSES'}
                        onChange={
                            ((e) => setAmount(e.target.value))
                        }
                    />
                    <input type='submit' value='submit' />
                </form>
            </div>
        </div>
    )
}

export default Payment
