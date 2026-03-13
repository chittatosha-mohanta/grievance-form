"use client"

import { Box, Typography, Button } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
    const router = useRouter()

    return (
        <Box sx={{ textAlign: "center", py: 4 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 90, color: "success.main", mb: 2 }} />
            <Typography variant="h4" fontWeight={700} mb={1}>
                Submitted Successfully!
            </Typography>
            <Typography color="text.secondary" mb={1}>
                Your grievance has been received and logged.
            </Typography>
            <Typography color="text.secondary" mb={4}>
                You will be contacted within <strong>5–7 business days</strong>.
            </Typography>
            <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/form/step-1")}
                sx={{ borderRadius: 2 }}
            >
                Submit Another Grievance
            </Button>
        </Box>
    )
}