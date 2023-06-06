import React from 'react'
import { type HomesProps } from '../../types/global'
import Link from 'next/link'

const HomesList = ({ homes }: HomesProps) => {
    return (
        <ul className='flex flex-col mt-4'>
            {homes.map(home => (
                <Link
                    className='bg-slate-800 rounded-3xl'
                    key={home.id}
                    href={`homes/${home.id}`}>
                    <li
                        className='
                            border-2 border-slate-200 
                            flex flex-col gap-4 p-5 rounded-3xl 
                            items-center text-emerald-500'
                    >
                        <h1 className='text-2xl'>{home.name}</h1>
                        <div className='flex gap-4 text-lg'>
                            <label>Admin</label>
                            <h2>{home.admin?.username}</h2>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    )
}

export default HomesList