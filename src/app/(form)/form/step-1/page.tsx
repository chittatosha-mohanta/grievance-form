"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { TextField, Typography, Stack, Box, Button, Alert } from "@mui/material"
import { stepOneSchema, type StepOneSchema } from "@/lib/schemas"
import { useFormStore } from "@/store/formStore"
import FormStepper from "@/components/ui/FormStepper"
import FormNavigation from "@/components/form/FormNavigation"

export default function StepOnePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { data, updateData, setStep, loadLocalDraft, hasLocalSavedDraft } = useFormStore()
    const [canLoadSavedDraft, setCanLoadSavedDraft] = useState(false)
    const [loadMessage, setLoadMessage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<StepOneSchema>({
        resolver: zodResolver(stepOneSchema),
        defaultValues: {
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            email: data.email ?? "",
            phone: data.phone ?? "",
        },
    })

    const onNext = handleSubmit((values) => {
        updateData(values)
        setStep(1)
        router.push("/form/step-2")
    })

    useEffect(() => {
        setCanLoadSavedDraft(hasLocalSavedDraft())
    }, [hasLocalSavedDraft])

    const handleLoadSavedDraft = () => {
        const savedData = loadLocalDraft()

        if (!savedData) {
            setLoadMessage("No valid saved draft found.")
            return
        }

        reset({
            firstName: savedData.firstName ?? "",
            lastName: savedData.lastName ?? "",
            email: savedData.email ?? "",
            phone: savedData.phone ?? "",
        })
        setLoadMessage("Saved draft loaded. Continue to the next steps to review all restored fields.")
    }

    return (
        <>
            <FormStepper activeStep={0} />
            <Typography variant="h5" fontWeight={600} mb={1}>
                Personal Information
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Tell us who you are so we can follow up with you.
            </Typography>

            {searchParams.get("draftSaved") === "1" && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Draft saved locally. You can load it below anytime.
                </Alert>
            )}

            <Stack spacing={3}>
                <TextField
                    label="First Name" fullWidth
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
                <TextField
                    label="Last Name" fullWidth
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
                <TextField
                    label="Email Address" fullWidth type="email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Phone Number (10 digits)" fullWidth
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
            </Stack>

            <FormNavigation isFirst onNext={onNext} />

            {canLoadSavedDraft && (
                <Box mt={2}>
                    <Button variant="text" onClick={handleLoadSavedDraft}>
                        Load Saved Draft
                    </Button>
                </Box>
            )}

            {loadMessage && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    {loadMessage}
                </Alert>
            )}
        </>
    )
}