import { Link, useLocation } from 'react-router-dom'

const PaymentSuccess = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const transactionId = params.get('transactionId')
    const amount = params.get('amount')
    return (
        <div className='payment-status success'>
            <h1>🎉 Payment Success! 🎉 </h1>
            <p>Your transaction went through smoothly.</p>
            <p>Transaction ID: {transactionId}</p>
            <p>Amount Paid: ₹{amount}</p>
            <Link to="/" className="btn">Go to Dashboard</Link>
        </div>
    )
}

export default PaymentSuccess