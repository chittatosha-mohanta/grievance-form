"use client"

import { Box, Container, Typography } from "@mui/material"
import GavelIcon from "@mui/icons-material/Gavel"

export default function FormLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", py: 6 }}>
            <Container maxWidth="md">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                    <GavelIcon color="primary" />
                    <Typography variant="h6" fontWeight={700} color="primary">
                        Grievance Portal
                    </Typography>
                </Box>
                <Box sx={{ bgcolor: "white", p: { xs: 3, sm: 5 }, borderRadius: 3, boxShadow: 3 }}>
                    {children}
                </Box>
            </Container>
        </Box>
    )
}