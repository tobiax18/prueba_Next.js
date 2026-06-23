'use client';

import { ReactNode } from 'react';

import { AppRouterCacheProvider }
    from '@mui/material-nextjs/v16-appRouter';

import {
    ThemeProvider,
    CssBaseline,
} from '@mui/material';

import theme from '@/theme';

export default function ThemeRegistry({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}