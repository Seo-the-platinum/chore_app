import React from 'react'

//Types
import type { HomeWithProps } from '../../types/components/HomeWith'

const HomeWithChores = ({ home }: HomeWithProps) => {

    return (
        <div className='divide-y-2 divide-emerald-400 text-center border-2 border-slate-50 rounded-lg py-2 px-1'>
            <h3 className='text-2xl pb-2'>{home.name}</h3>
            <ul className='text-start p-2'>
                {
                    home.chores && home.chores.map((chore) => {
                        return <li key={chore.id}>{chore.title}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default HomeWithChores