import React from 'react'
import Image from 'next/image'
import HomeWithChores from '../home/HomeWithChores'
//Types
import type { ProfileProps } from '../../types/components/profile'

const Profile = ({ user }: ProfileProps) => {
    return (
        <div className='flex flex-col px-2 items-center'>
            <div className='
                flex flex-col gap-4 pb-4 w-full
                after:bg-gradient-to-br after:from-green-500
                after:to-blue-800 after:h-1 after:rounded-lg
                after:brightness-125 sm:w-3/4'
            >
                <div className="flex items-end justify-evenly sm:justify-start sm:gap-10">
                    <Image alt='Users Profile Image' className='rounded-full sm:w-28 sm:h-28' src={`${user.image ? user.image : '/images/temp.png'}`} width={84} height={84} />
                    <h2 className='text-2xl sm:text-4xl'>{user.username}</h2>
                </div>
            </div>
            <div className='pt-4 flex-col flex gap-2 items-center'>
                <h2 className='text-3xl'>Homes</h2>
                <div className='flex flex-col gap-8 items-center'>
                    {
                        user.homes && user.homes.map((home) => {
                            return <HomeWithChores key={home.id} home={home} />
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Profile