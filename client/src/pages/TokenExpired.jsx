import { Link } from 'react-router-dom'

export default function TokenExpired() {
    return (
        <div className='error-page'>
            <h1>Token Expired!</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="btn">Go to Login</Link>
        </div>
    )
}