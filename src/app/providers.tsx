"use client"

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#dc004e" },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
})

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}