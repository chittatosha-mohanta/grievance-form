"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {
    TextField, Typography, Stack,
    FormControlLabel, Checkbox,
    FormHelperText, Divider,
} from "@mui/material"
import { stepThreeSchema, type StepThreeSchema } from "@/lib/schemas"
import { useFormStore } from "@/store/formStore"
import FormStepper from "@/components/ui/FormStepper"
import FormNavigation from "@/components/form/FormNavigation"

export default function StepThreePage() {
    const router = useRouter()
    const { data, updateData, setStep } = useFormStore()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<StepThreeSchema>({
        resolver: zodResolver(stepThreeSchema),
        defaultValues: {
            evidenceDescription: data.evidenceDescription ?? "",
            witnessName: data.witnessName ?? "",
            witnessContact: data.witnessContact ?? "",
            agreeToTerms: data.agreeToTerms ?? undefined,
        },
    })

    const onNext = handleSubmit((values) => {
        updateData(values)
        setStep(3)
        router.push("/form/review")
    })

    return (
        <>
            <FormStepper activeStep={2} />
            <Typography variant="h5" fontWeight={600} mb={1}>
                Supporting Information
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                Optional details that can help us investigate your grievance.
            </Typography>

            <Stack spacing={3}>
                <TextField
                    label="Evidence Description (optional)" fullWidth multiline rows={3}
                    placeholder="Describe any documents, emails, or records you have..."
                    {...register("evidenceDescription")}
                />

                <Divider textAlign="left">
                    <Typography variant="caption" color="text.secondary">
                        Witness (optional)
                    </Typography>
                </Divider>

                <TextField
                    label="Witness Name" fullWidth
                    {...register("witnessName")}
                />

                <TextField
                    label="Witness Contact" fullWidth
                    placeholder="Email or phone"
                    {...register("witnessContact")}
                />

                <Divider />

                <Stack spacing={0}>
                    <Controller
                        name="agreeToTerms"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={field.value === true}
                                        onChange={(e) => field.onChange(e.target.checked || undefined)}
                                    />
                                }
                                label="I confirm all information provided is accurate and true to the best of my knowledge."
                            />
                        )}
                    />
                    {errors.agreeToTerms && (
                        <FormHelperText error sx={{ ml: 2 }}>
                            {errors.agreeToTerms.message}
                        </FormHelperText>
                    )}
                </Stack>
            </Stack>

            <FormNavigation
                onBack={() => { setStep(1); router.push("/form/step-2") }}
                onNext={onNext}
            />
        </>
    )
}