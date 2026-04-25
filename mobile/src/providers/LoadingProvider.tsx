import React, { createContext, useContext, useState, useEffect } from 'react'
import LoadingDialog from '@/src/components/loading/LoadingDialog'
import { loadingManager } from '@/src/utils/loadingManager'

type LoadingContextType = {
    loading: boolean
    setLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadingManager.register(setLoading)
        return () => {
            loadingManager.unregister()
        }
    }, [])

    return (
        <LoadingContext.Provider
            value={{ loading: loading, setLoading: setLoading }}
        >
            {children}
            {loading && <LoadingDialog />}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const context = useContext(LoadingContext)
    if (!context)
        throw new Error('useLoading must be used within LoadingProvider')
    return context
}
