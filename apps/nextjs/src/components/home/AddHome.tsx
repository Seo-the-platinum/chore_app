import React from 'react'
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string,
    password1: string,
    password2: string,
}
const AddHome = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    return (
        <form className='flex'>
            <div>
                <h3>Name</h3>
                <input type="text" />
            </div>
            <div>
                <h3>Password</h3>
                <input type="text" />
            </div>
            <div>
                <h3>Re-type Password</h3>
                <input type="text" />
            </div>
        </form>
    )
}

export default AddHome