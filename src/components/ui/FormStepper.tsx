"use client"

import { Stepper, Step, StepLabel, Box } from "@mui/material"

const STEPS = [
    "Personal Info",
    "Grievance Details",
    "Supporting Info",
    "Review & Submit",
]

export default function FormStepper({ activeStep }: { activeStep: number }) {
    return (
        <Box sx={{ width: "100%", mb: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {STEPS.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}