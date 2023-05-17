import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <nav className='
            absolute bottom-0 left-0 
            bg-gradient-to-b from-[#2e026d] to-[#15162c]
            flex justify-around min-w-full
            text-emerald-500 py-4
            sm:text-4xl sm:justify-end sm:gap-10
            '
        >
            <Link href='/'> Chore App </Link>
            <Link href='/homes'> My Homes </Link>
        </nav>
    )
}

export default Footer