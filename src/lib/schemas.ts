import { z } from "zod"

export const stepOneSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
})

export const stepTwoSchema = z.object({
    grievanceType: z.string().min(1, "Please select a grievance type"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    dateOfIncident: z.string().min(1, "Please select a date"),
})

export const stepThreeSchema = z.object({
    evidenceDescription: z.string().optional(),
    witnessName: z.string().optional(),
    witnessContact: z.string().optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms",
    }),
})

export const fullFormSchema = stepOneSchema
    .merge(stepTwoSchema)
    .merge(stepThreeSchema)

export type StepOneSchema = z.infer<typeof stepOneSchema>
export type StepTwoSchema = z.infer<typeof stepTwoSchema>
export type StepThreeSchema = z.infer<typeof stepThreeSchema>
export type FullFormSchema = z.infer<typeof fullFormSchema>