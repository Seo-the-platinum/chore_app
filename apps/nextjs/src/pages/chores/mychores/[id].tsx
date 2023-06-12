import Link from 'next/link'
import React from 'react'
import { api } from '~/utils/api'

const Chores = () => {
    const { data: chores } = api.user.getUsersChores.useQuery()

    return (
        <div className='flex flex-col text-slate-50 items-center gap-4 text-center text-lg'>
            <h1 className='text-4xl text-emerald-500'>My Chores</h1>
            {
                chores?.map((chore) => (
                    <Link className='bg-indigo-900 rounded-lg w-56 p-2 h-24 flex-col flex gap-2' key={chore.id} href={`/chores/${chore.id}`}>
                        <h2 className='text-xl'>
                            {chore.house.name}
                        </h2>
                        <div className="flex text-sm justify-evenly">
                            <h2>{chore.title}</h2>
                            <p
                                className={`${chore.completed ? 'text-emerald-500'
                                    : 'text-red-500'}`}>
                                {chore.completed ? 'Completed' : 'Not Completed'}
                            </p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Chores