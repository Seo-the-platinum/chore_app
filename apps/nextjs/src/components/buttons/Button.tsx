import React from 'react'
import type { ButtonProps } from '~/types/components/button'

const Button = ({ label, handle, type }: ButtonProps) => {
    return (
        <button
            className='
                bg-indigo-900 text-slate-50 text-lg
                rounded-lg h-8 w-28 focus:outline-none
                focus:border-blue-600 focus:border-2'
            onClick={handle}
            type={type ? type : 'button'}>
            {label}
        </button>
    )
}

export default Button