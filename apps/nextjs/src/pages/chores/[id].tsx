import React from 'react'
import { api } from '~/utils/api'
import type { GetStaticProps, NextPage } from 'next'
import { generateSSGHelper } from '~/utils/helpers/ssgHelper';

const Chores: NextPage<{ id: string }> = ({ id }) => {
    const { data: chore } = api.chore.getChoreDetails.useQuery({ choreId: id })

    if (!chore) return null

    return (
        <div>
            <h1>Chore Details</h1>
            <h2>{chore.title}</h2>
            <h2>{chore.user.username}</h2>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const id = context.params?.id as string;
    // we run this line here to prefetch the data and store it in react-query
    //that way by the time our client component mounts, the value is already present in the cache
    await ssg.chore.getChoreDetails.prefetch({ choreId: id })
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