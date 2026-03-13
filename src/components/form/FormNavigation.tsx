"use client"

import { Box, Button, CircularProgress } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import SendIcon from "@mui/icons-material/Send"

type Props = {
    onBack?: () => void
    onNext?: () => void
    isFirst?: boolean
    isLast?: boolean
    isLoading?: boolean
    nextLabel?: string
}

export default function FormNavigation({
    onBack,
    onNext,
    isFirst = false,
    isLast = false,
    isLoading = false,
    nextLabel = "Next",
}: Props) {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={onBack}
                disabled={isFirst}
            >
                Back
            </Button>

            <Button
                variant="contained"
                endIcon={
                    isLoading
                        ? <CircularProgress size={16} color="inherit" />
                        : isLast ? <SendIcon /> : <ArrowForwardIcon />
                }
                onClick={onNext}
                disabled={isLoading}
                color={isLast ? "success" : "primary"}
            >
                {isLoading ? "Submitting..." : isLast ? "Submit Grievance" : nextLabel}
            </Button>
        </Box>
    )
}