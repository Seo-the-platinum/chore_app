import React from 'react'
import Link from 'next/link'
import { api } from '~/utils/api'

const Header = () => {
    const { data: session } = api.auth.getSession.useQuery()

    return (
        <nav className='
            flex justify-center 
            gap-4 text-emerald-500
            sm:text-4xl sm:justify-end sm:gap-10
        '
        >
            <Link href='/'>Chore App</Link>
            {
                session &&
                <>
                    <Link href={`/homes`}> My Homes </Link> <Link href={`/chores/mychores/${session.user.id}`}>My Chores</Link>
                </>

            }
        </nav>
    )
}

export default Header