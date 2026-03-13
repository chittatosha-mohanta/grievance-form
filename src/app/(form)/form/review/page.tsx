"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import {
    Typography, Box, Chip,
    Divider, Button, Alert, Stack,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useFormStore } from "@/store/formStore"
import FormStepper from "@/components/ui/FormStepper"
import FormNavigation from "@/components/form/FormNavigation"
import { submitForm } from "@/app/actions/submit"

function ReviewField({ label, value }: { label: string; value?: string | boolean | null | number }) {
    const display = () => {
        if (value === true) return "✓ Yes"
        if (value === false) return "✗ No"
        if (value === null || value === undefined || value === "") {
            return <span style={{ color: "#aaa" }}>Not provided</span>
        }
        return String(value)
    }

    return (
        <Box>
            <Typography variant="caption" color="text.secondary" display="block">
                {label}
            </Typography>
            <Typography variant="body1" fontWeight={500} mt={0.3}>
                {display()}
            </Typography>
        </Box>
    )
}

function SectionCard({
    title,
    onEdit,
    children,
}: {
    title: string
    onEdit: () => void
    children: React.ReactNode
}) {
    return (
        <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} color="primary">
                    {title}
                </Typography>
                <Button size="small" startIcon={<EditIcon />} onClick={onEdit} variant="outlined">
                    Edit
                </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
                {children}
            </Stack>
        </Box>
    )
}

export default function ReviewPage() {
    const router = useRouter()
    const { data, clearDraft, setStep } = useFormStore()
    const [isPending, startTransition] = useTransition()

    const goTo = (step: number, path: string) => {
        setStep(step)
        router.push(path)
    }

    const handleSubmit = () => {
        startTransition(async () => {
            const result = await submitForm(data)
            if (result.success) {
                clearDraft()
                router.push("/form/success")
            }
        })
    }

    return (
        <>
            <FormStepper activeStep={3} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                    Review Your Submission
                </Typography>
                <Chip
                    icon={<CheckCircleIcon />}
                    label="Draft saved"
                    color="success"
                    size="small"
                    variant="outlined"
                />
            </Box>

            <Stack spacing={3}>

                <SectionCard title="Personal Information" onEdit={() => goTo(1, "/form/step-1")}>
                    <ReviewField label="First Name" value={data.firstName} />
                    <ReviewField label="Last Name" value={data.lastName} />
                    <ReviewField label="Email" value={data.email} />
                    <ReviewField label="Phone" value={data.phone} />
                </SectionCard>

                <SectionCard title="Grievance Details" onEdit={() => goTo(2, "/form/step-2")}>
                    <ReviewField label="Grievance Type" value={data.grievanceType} />
                    <ReviewField label="Date of Incident" value={data.dateOfIncident} />
                    <ReviewField label="Subject" value={data.subject} />
                    <ReviewField label="Description" value={data.description} />
                </SectionCard>

                <SectionCard title="Supporting Information" onEdit={() => goTo(3, "/form/step-3")}>
                    <ReviewField label="Evidence" value={data.evidenceDescription} />
                    <ReviewField label="Witness Name" value={data.witnessName} />
                    <ReviewField label="Witness Contact" value={data.witnessContact} />
                    <ReviewField label="Agreed to Terms" value={data.agreeToTerms === true} />
                </SectionCard>

            </Stack>

            <Alert severity="info" sx={{ mt: 3 }}>
                Please review all information carefully. Once submitted, you cannot edit your grievance.
            </Alert>

            <FormNavigation
                onBack={() => goTo(3, "/form/step-3")}
                onNext={handleSubmit}
                isLast
                isLoading={isPending}
            />
        </>
    )
}