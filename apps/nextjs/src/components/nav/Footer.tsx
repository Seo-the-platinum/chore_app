import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='
            absolute bottom-0 left-0 
            bg-gradient-to-b from-[#2e026d] to-[#15162c]
            flex justify-center min-w-full
            text-emerald-500 gap-4 py-4
            sm:text-4xl sm:justify-end sm:gap-10
            '
        >
            <Link href='/'> Home </Link>
            <Link href='/homes'> My Homes </Link>
            <Link href='/manage'> Manage Homes </Link>
        </div>
    )
}

export default Footer