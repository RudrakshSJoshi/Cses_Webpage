import {Link, useLocation} from 'react-router-dom'
const PaymentFailure = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const transactionId = params.get('transactionId')
    const amount = params.get('amount')
    return (
        <div className='payment-status failed'>
            <h1>😞 Payment Failed! 😞</h1>
            <p>Unfortunately, your transaction did not go through.</p>
            <p>Transaction ID: {transactionId}</p>
            <p>Attempted Amount: ₹{amount}</p>
            <Link to="/payment" className="btn">Try Again</Link>
        </div>
    )
}

export default PaymentFailure
