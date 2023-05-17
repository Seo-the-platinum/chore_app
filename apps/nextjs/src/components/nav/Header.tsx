import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <nav className='
            flex justify-center 
            gap-4 text-emerald-500
            sm:text-4xl sm:justify-end sm:gap-10
        '
        >
            <Link href='/'>Chore App</Link>
            <Link href='/homes'>My Homes</Link>
        </nav>
    )
}

export default Header