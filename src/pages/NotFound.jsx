import React from 'react'
import { Link } from 'react-router'

function NotFound() {
    return (
        <>
            <div className='notfound'>
                <div className='container tw-bold text-center mt-5'>
                    <h1>Something went wrong</h1>
                    <Link to="/">
                        <button className='btn btn-warning'>go back to HomePage'</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound;