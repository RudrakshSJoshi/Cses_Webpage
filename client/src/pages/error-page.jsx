import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className='error-page'>
            <h1>404</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="btn">Go to Home</Link>
        </div>
    )
}