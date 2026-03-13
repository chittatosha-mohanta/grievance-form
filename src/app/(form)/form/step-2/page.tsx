"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {
    TextField, Typography, Stack,
    MenuItem, Select, FormControl,
    InputLabel, FormHelperText,
} from "@mui/material"
import { stepTwoSchema, type StepTwoSchema } from "@/lib/schemas"
import { useFormStore } from "@/store/formStore"
import FormStepper from "@/components/ui/FormStepper"
import FormNavigation from "@/components/form/FormNavigation"

const GRIEVANCE_TYPES = [
    "Workplace Harassment",
    "Discrimination",
    "Safety Violation",
    "Wage Dispute",
    "Policy Violation",
    "Other",
]

export default function StepTwoPage() {
    const router = useRouter()
    const { data, updateData, setStep } = useFormStore()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<StepTwoSchema>({
        resolver: zodResolver(stepTwoSchema),
        defaultValues: {
            grievanceType: data.grievanceType ?? "",
            subject: data.subject ?? "",
            description: data.description ?? "",
            dateOfIncident: data.dateOfIncident ?? "",
        },
    })

    const onNext = handleSubmit((values) => {
        updateData(values)
        setStep(3)
        router.push("/form/step-3")
    })

    return (
        <>
            <FormStepper activeStep={1} />
            <Typography variant="h5" fontWeight={600} mb={1}>
                Grievance Details
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Describe the issue you are reporting in detail.
            </Typography>

            <Stack spacing={3}>
                <FormControl fullWidth error={!!errors.grievanceType}>
                    <InputLabel id="grievance-type-label">Grievance Type</InputLabel>
                    <Controller
                        name="grievanceType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="grievance-type-label"
                                label="Grievance Type"
                            >
                                {GRIEVANCE_TYPES.map((type) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.grievanceType && (
                        <FormHelperText>{errors.grievanceType.message}</FormHelperText>
                    )}
                </FormControl>

                <TextField
                    label="Subject" fullWidth
                    placeholder="Brief summary of the issue"
                    {...register("subject")}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                />

                <TextField
                    label="Full Description" fullWidth multiline rows={5}
                    placeholder="Describe what happened, when, and who was involved..."
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />

                <TextField
                    label="Date of Incident" fullWidth type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("dateOfIncident")}
                    error={!!errors.dateOfIncident}
                    helperText={errors.dateOfIncident?.message}
                />
            </Stack>

            <FormNavigation
                onBack={() => { setStep(1); router.push("/form/step-1") }}
                onNext={onNext}
            />
        </>
    )
}