import React from 'react'
import { api } from '~/utils/api'

const Chores = () => {
    const { data: chores } = api.user.getUsersChores.useQuery()
    console.log(chores)
    return (
        <div className='flex flex-col text-slate-50'>
            <h1>My Chores</h1>
            {
                chores?.map((chore) => (
                    <div key={chore.id}>
                        <h2>{chore.house.name}</h2>
                        <h2>{chore.title}</h2>
                        <p>{chore.description}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Chores