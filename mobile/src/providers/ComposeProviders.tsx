// utils/composeProviders.tsx
import React from 'react'

type ProviderProps = { children: React.ReactNode }

export const composeProviders =
    (...providers: React.ComponentType<ProviderProps>[]) =>
    ({ children }: ProviderProps) =>
        providers.reduceRight(
            (Accumulated, CurrentProvider) => (
                <CurrentProvider>{Accumulated}</CurrentProvider>
            ),
            children
        )
