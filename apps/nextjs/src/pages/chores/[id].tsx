import React from 'react'
import { api } from '~/utils/api'
import type { GetStaticProps, NextPage } from 'next'
import { generateSSGHelper } from '~/utils/helpers/ssgHelper';
import Button from '~/components/buttons/Button'

const Chores: NextPage<{ id: string }> = ({ id }) => {
    const { data: chore } = api.chore.getChoreDetails.useQuery({ choreId: id })
    const { data: session } = api.auth.getSession.useQuery()

    if (!chore || !session) return null
    const formattedDate = chore.due.toLocaleString().split(',')[0]
    const handleButton = () => {
        console.log('button being pressed')
    }
    return (
        <div className='flex flex-col text-slate-50 items-center'>
            <h1 className='text-xl'>Chore Details</h1>
            <h2>{chore.title}</h2>
            <h2>{chore.user.username}</h2>
            <p>{chore.description}</p>
            <p>{formattedDate}</p>
            {
                session.user.id === chore.house.adminId &&
                <Button handle={handleButton} label='Complete' />
            }
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const id = context.params?.id as string;
    // we run this line here to prefetch the data and store it in react-query
    //that way by the time our client component mounts, the value is already present in the cache
    await ssg.chore.getChoreDetails.prefetch({ choreId: id })
    await ssg.auth.getSession.prefetch()
    return {
        props: {
            trpcState: ssg.dehydrate(),
            id,
        },
    }
}

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};

export default Chores