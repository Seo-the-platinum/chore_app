import React from 'react'
import Link from 'next/link'

const Nav = () => {
    return (
        <div className=''>
            <Link className='text-emerald-500' href='/'> Home </Link>
            <Link className='text-emerald-500' href='/chores'> Chores </Link>
            <Link className='text-emerald-500' href='/adminHomes'> My Homes </Link>
        </div>
    )
}

export default Nav