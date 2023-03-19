import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='
        flex justify-center
        text-emerald-500 gap-4
        sm:text-4xl sm:justify-end sm:gap-10
        '
        >
            <Link href='/'> Home </Link>
            <Link href='/homes'> My Homes </Link>
            <Link href='/manage'> Manage Homes </Link>
        </div>
    )
}

export default Header