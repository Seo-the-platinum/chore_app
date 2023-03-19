import React, { useEffect, useState } from 'react'

const ResizeHook = () => {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        addEventListener('resize', handleResize)
        handleResize()
        return () => removeEventListener('resize', handleResize)
    }, [])
    return width
}

export default ResizeHook