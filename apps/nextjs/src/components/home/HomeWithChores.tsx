import React from 'react'
import Link from 'next/link'
//Types
import type { HomeWithProps } from '../../types/components/HomeWith'

const HomeWithChores = ({ home }: HomeWithProps) => {
    return (
        <div className='bg-gradient-to-br from-indigo-900 to-fuchsia-800 rounded-lg w-64'>
            <div className='divide-y-2 divide-emerald-400 text-center rounded-lg bg-slate-900 m-[3px] p-2'>
                <h3 className='text-2xl pb-2'>{home.name}</h3>
                <ul className='text-start p-2 pt-4'>
                    {
                        home.chores && home.chores.map((chore) => {
                            return (
                                <li className='bg-gradient-to-br from-red-800 to-blue-800 flex text-center rounded-lg' key={chore.id}>
                                    <Link className='rounded-lg bg-slate-900 m-[2px] w-full' href={`/chores/${chore.id}`}>
                                        {chore.title}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default HomeWithChores