import React from 'react'

//Types
import type { HomeWithProps } from '../../types/components/HomeWith'

const HomeWithChores = ({ home }: HomeWithProps) => {
    console.log(home)
    return (
        <div className='divide-y-2 divide-emerald-400 text-center'>
            <h3 className='text-2xl'>{home.name}</h3>
            <ul>
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