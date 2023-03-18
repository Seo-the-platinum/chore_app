import React from 'react'
import Nav from './nav/Nav'
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
            <Nav />
            <main>{children}</main>
        </div>
    )
}

export default Layout