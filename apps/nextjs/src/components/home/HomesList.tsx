import React from 'react'
import { type HomesProps } from '../../types/global'
import Link from 'next/link'

const HomesList = ({ homes }: HomesProps) => {
    return (
        <ul className='flex flex-col mt-4 gap-6 sm:gap-10'>
            {homes.map(home => (
                <Link
                    className='
                        bg-gradient-to-br from-indigo-900 to-fuchsia-800
                        rounded-xl sm:w-96'
                    key={home.id}
                    href={`homes/${home.id}`}>
                    <li
                        className='
                            bg-slate-900 m-1
                            flex flex-col gap-4 p-5 rounded-xl 
                            items-center text-emerald-500 sm:p-4'
                    >
                        <h1 className='text-2xl sm:text-4xl'>{home.name}</h1>
                        <div className='flex gap-4 text-lg sm:text-xl'>
                            <label>Admin</label>
                            <h2 className='text-slate-50'>{home.admin?.username}</h2>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    )
}

export default HomesList