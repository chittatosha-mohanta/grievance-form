import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FullFormSchema } from "@/lib/schemas"

type FormStore = {
    data: Partial<FullFormSchema>
    currentStep: number
    updateData: (values: Partial<FullFormSchema>) => void
    setStep: (step: number) => void
    clearDraft: () => void
    hasDraft: () => boolean
}

export const useFormStore = create<FormStore>()(
    persist(
        (set, get) => ({
            data: {},
            currentStep: 1,

            updateData: (values) =>
                set((state) => ({ data: { ...state.data, ...values } })),

            setStep: (step) => set({ currentStep: step }),

            clearDraft: () => set({ data: {}, currentStep: 1 }),

            hasDraft: () => Object.keys(get().data).length > 0,
        }),
        { name: "grievance-form-draft" }
    )
)