import React, { useRef } from 'react'
import { api } from '~/utils/api'

const AddHome = () => {
    const mutate = api.home.addHome.useMutation()
    const inputRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const name = inputRef.current?.value
        if (!name) return
        mutate.mutate({ name })
    }
    return (
        <div>
            <h1 className='text-4xl'>Add Home</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>House Name</label>
                <input ref={inputRef} type='text' />
                <button type='submit'>Add Home</button>
            </form>
        </div>
    )
}

export default AddHome