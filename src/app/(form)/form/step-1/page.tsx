"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { TextField, Typography, Stack } from "@mui/material"
import { stepOneSchema, type StepOneSchema } from "@/lib/schemas"
import { useFormStore } from "@/store/formStore"
import FormStepper from "@/components/ui/FormStepper"
import FormNavigation from "@/components/form/FormNavigation"

export default function StepOnePage() {
    const router = useRouter()
    const { data, updateData, setStep } = useFormStore()

    const {
        register,
        handleSubmit,
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
        setStep(2)
        router.push("/form/step-2")
    })

    return (
        <>
            <FormStepper activeStep={0} />
            <Typography variant="h5" fontWeight={600} mb={1}>
                Personal Information
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Tell us who you are so we can follow up with you.
            </Typography>

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
        </>
    )
}