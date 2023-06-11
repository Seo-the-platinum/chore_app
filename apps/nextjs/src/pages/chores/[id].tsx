import React from 'react'
import { api } from '~/utils/api'
import type { GetStaticProps, NextPage } from 'next'
import { generateSSGHelper } from '~/utils/helpers/ssgHelper';
import Button from '~/components/buttons/Button'
import { useRouter } from 'next/router'

const Chores: NextPage<{ id: string }> = ({ id }) => {
    const router = useRouter()
    const { data: chore } = api.chore.getChoreDetails.useQuery({ choreId: id })
    const { data: session } = api.auth.getSession.useQuery()
    const { mutate } = api.chore.completeChore.useMutation({
        onSuccess: async () => {
            await router.push('/homes')
        }
    })
    if (!chore || !session) return null
    const formattedDate = chore.due.toLocaleString().split(',')[0]
    const handleButton = () => {
        mutate({ choreId: chore.id })
    }
    return (
        <div className='flex flex-col text-slate-50 items-center text-xl'>
            <h2 className='text-3xl text-emerald-500'>{chore.title}</h2>
            <div className="flex flex-col divide-y-2 divide-indigo-800 items-center mt-4 w-[224px]">
                <div className='flex flex-col gap-2 pb-4'>
                    <label className='text-emerald-500'>Asssigned</label>
                    <h2>{chore.user.username}</h2>
                </div>
                <div className="flex flex-col text-center py-4">
                    <label className='text-emerald-500'>Description</label>
                    <p>{chore.description}</p>
                </div>
                <div className="flex flex-col gap-4 pt-4 items-center w-[224px]">
                    <label className='text-emerald-500'>Due Date</label>
                    <p className='text-lg'>{formattedDate}</p>
                    <p
                        className={
                            `${chore.completed ? 'text-emerald-500' :
                                'text-red-500'}`
                        }>
                        {chore.completed ? 'Completed' : 'Not Completed'}
                    </p>
                    {
                        session.user.id === chore.house.adminId &&
                        <Button handle={handleButton} label='Complete' />
                    }
                </div>
            </div>
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