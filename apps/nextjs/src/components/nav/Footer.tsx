import React from 'react'
import Link from 'next/link'
import { api } from '~/utils/api'

const Footer = () => {
    const { data: session } = api.auth.getSession.useQuery()
    return (
        <nav className='
            absolute bottom-0 left-0 
            bg-gradient-to-t from-slate-900 to-slate-800
            flex justify-around min-w-full
            text-emerald-500 py-4
            sm:text-4xl sm:justify-end sm:gap-10
            '
        >
            <Link href='/'> Home </Link>
            {
                session &&
                <>
                    <Link href={`/homes`}> My Homes </Link>
                    <Link href={`/chores/mychores/${session.user.id}`}>My Chores</Link>
                </>
            }
        </nav>
    )
}

export default Footer