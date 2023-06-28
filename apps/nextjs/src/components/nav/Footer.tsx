import React from 'react'
import Link from 'next/link'
import { api } from '~/utils/api'

const Footer = () => {
    const { data: session } = api.auth.getSession.useQuery()
    return (
        <nav
            className='
                fixed bottom-0 left-0 h-14 text-xl font-bold
                bg-gradient-to-t from-slate-900 to-slate-800
                flex justify-around min-w-full
                text-emerald-400 py-4
                sm:text-4xl sm:justify-end sm:gap-10
            '
        >
            {
                session &&
                <>
                    <Link href={`/homes`}> Homes </Link>
                    <Link href={`/chores/mychores/${session.user.id}`}> Chores</Link>
                </>
            }
        </nav>
    )
}

export default Footer