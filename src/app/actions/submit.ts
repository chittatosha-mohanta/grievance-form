"use server"

import { fullFormSchema, type FullFormSchema } from "@/lib/schemas"

export async function submitForm(data: Partial<FullFormSchema>) {
    const result = fullFormSchema.safeParse(data)

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        }
    }

    // Simulate saving to database
    await new Promise((r) => setTimeout(r, 1500))

    console.log("✅ Grievance submitted:", result.data)

    return { success: true, id: `GRV-${Date.now()}` }
}