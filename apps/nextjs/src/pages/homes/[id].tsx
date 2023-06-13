import React, { useRef } from 'react'
import { api } from '~/utils/api'
import SearchUsers from '../../components/users/SearchUsers'
import Chore from '../../components/chore/Chore'
import Button from '~/components/buttons/Button'
import { generateSSGHelper } from '~/utils/helpers/ssgHelper'

//Types
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (ctx) => {
    const ssg = generateSSGHelper()
    const id = ctx.params?.id as string
    await ssg.home.getHomeDetails.prefetch({ id: id })
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

type HomeDetailsProps = {
    id: string
}

const HomeDetails = ({ id }: HomeDetailsProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const selectRef = useRef<HTMLSelectElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const utility = api.useContext()
    const { mutate } = api.home.addChore.useMutation({
        onSuccess: async () => {
            await utility.home.getHomeDetails.invalidate()
        },
    })
    const { data: home, isLoading } = api.home.getHomeDetails.useQuery({ id: id })
    if (!home || isLoading) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const chore = inputRef?.current?.value
        const user = selectRef?.current?.value
        const date = dateRef?.current?.valueAsDate
        const description = descriptionRef?.current?.value
        if (chore && user && date && description) {
            mutate({
                description: description,
                dueDate: date,
                houseId: home?.id,
                title: chore,
                userId: user
            })
            inputRef.current.value = ''
            selectRef.current.value = ''
            dateRef.current.value = ''
            descriptionRef.current.value = ''
        }
    }

    return (
        <div className='text-emerald-500 flex flex-col items-center gap-4 text-lg'>
            <h3 className='text-3xl'>{home.name.toLocaleUpperCase()}</h3>
            <div className='flex flex-col divide-y-2 divide-indigo-800 justify-evenly'>
                <SearchUsers houseId={home.id} />
                <form
                    className='
                        flex flex-col pt-4 items-center
                        justify-evenly gap-4 pb-4
                        focus:outline-none focus:border-blue-600
                        focus:border-2'
                    onSubmit={handleSubmit}>
                    <label className='text-2xl'>Create Chore</label>
                    <label>Chore Title</label>
                    <input className='rounded-lg text-black focus:outline-none focus:border-blue-600 focus:border-2' ref={inputRef} type='text' maxLength={20} />
                    <label>Chore Description</label>
                    <textarea className='rounded-lg text-black focus:outline-none focus:border-blue-600 focus:border-2 h-32 text-start' ref={descriptionRef} maxLength={250}>
                    </textarea>
                    <label>Assign Member</label>
                    <select className='rounded-lg text-black focus:outline-none focus:border-blue-600 focus:border-2' ref={selectRef}>
                        <option value=''> Select Member </option>
                        {
                            home.members.map(member => (
                                <option key={member.id} value={member.id}>{member.username}</option>
                            ))
                        }
                    </select>
                    <label>Due Date</label>
                    <input className='rounded-lg text-black focus:outline-none focus:border-blue-600 focus:border-2' ref={dateRef} type='date' />
                    <Button label='Add Chore' type='submit' />
                </form>
                <div className='pt-2 flex flex-col gap-4 text-center'>
                    <label className='text-3xl'>Chores</label>
                    {
                        home.chores.map(chore => (
                            <Chore key={chore.id} {...chore} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeDetails