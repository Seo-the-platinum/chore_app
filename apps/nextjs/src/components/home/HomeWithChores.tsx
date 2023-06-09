import React from 'react'
import Link from 'next/link'
//Types
import type { HomeWithProps } from '../../types/components/HomeWith'

const HomeWithChores = ({ home }: HomeWithProps) => {
    return (
        <div className='bg-gradient-to-br from-indigo-900 to-fuchsia-800 rounded-lg w-64 sm:w-96'>
            <div className='text-center rounded-lg bg-slate-900 m-[3px] p-2'>
                <div className='
                    flex flex-col
                    after:bg-gradient-to-br
                    after:from-green-500
                    after:to-blue-900
                    after:brightness-125 after:rounded-lg 
                    after:w-full after:h-1 sm:p-4'>
                    <h3 className='text-2xl pb-2'>{home.name}</h3>
                </div>
                <ul className='text-start p-2 pt-4'>
                    {
                        home.chores && home.chores.map((chore) => {
                            return (
                                <li className='bg-gradient-to-br from-red-800 to-blue-800 flex text-center rounded-lg' key={chore.id}>
                                    <Link className='rounded-lg bg-slate-900 m-[2px] w-full p-2' href={`/chores/${chore.id}`}>
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