import React, { useRef } from 'react'
import { api } from '~/utils/api'
import Button from '~/components/buttons/Button'
import { useRouter } from 'next/router'

const AddHome = () => {
    const router = useRouter()
    const mutate = api.home.addHome.useMutation({
        onSuccess: async () => {
            await router.push('/homes')
        }
    })
    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const name = inputRef.current?.value
        if (!name) return
        mutate.mutate({ name })
    }
    return (
        <form className='flex flex-col text-slate-50 items-center gap-4' onSubmit={handleSubmit}>
            <h1 className='text-4xl text-emerald-500'>
                Add Home
            </h1>
            <div className='flex flex-col items-center'>
                <label htmlFor='name'>House Name</label>
                <input
                    className='
                        rounded-lg text-black 
                        focus:outline-none focus:border-blue-600
                        focus:border-2'
                    ref={inputRef}
                    type='text' />
            </div>
            <Button label='Add Home' type='submit' />
        </form>
    )
}

export default AddHome