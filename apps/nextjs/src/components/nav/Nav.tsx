import React from 'react'
import Link from 'next/link'

const Nav = () => {
    return (
        <div className='
            flex justify-center
            text-lg text-emerald-500 gap-4
            sm:text-4xl sm:justify-end
            '
        >
            <Link href='/'> Home </Link>
            <Link href='/homes'> My Homes </Link>
            <Link href='/manage'> Manage Homes </Link>
        </div>
    )
}

export default Nav