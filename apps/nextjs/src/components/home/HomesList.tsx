import React from 'react'
import { type HomesProps } from '../../types/global'
import Link from 'next/link'

const HomesList = ({ homes }: HomesProps) => {
    return (
        <ul className='flex flex-col'>
            {homes.map(home => (
                <Link
                    key={home.id}
                    href={`homes/${home.id}`}>
                    <li
                        className='
                            border-2 border-slate-50 
                            flex gap-4 p-5 rounded-3xl 
                            items-center text-emerald-500'
                    >
                        <h1 className='text-2xl'>{home.name}</h1>
                        <div>
                            <label>Admin</label>
                            <h2>{home.admin?.name}</h2>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    )
}

export default HomesList