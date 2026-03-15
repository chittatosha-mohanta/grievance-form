import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { FullFormSchema } from "@/lib/schemas"

const LOCAL_SAVED_DRAFT_KEY = "grievance-form-saved-draft"

type FormStore = {
    data: Partial<FullFormSchema>
    currentStep: number
    updateData: (values: Partial<FullFormSchema>) => void
    setStep: (step: number) => void
    clearDraft: () => void
    hasDraft: () => boolean
    saveLocalDraft: () => boolean
    loadLocalDraft: () => Partial<FullFormSchema> | null
    hasLocalSavedDraft: () => boolean
}

export const useFormStore = create<FormStore>()(
    persist(
        (set, get) => ({
            data: {},
            currentStep: 0,

            updateData: (values) =>
                set((state) => ({ data: { ...state.data, ...values } })),

            setStep: (step) => set({ currentStep: step }),

            clearDraft: () => set({ data: {}, currentStep: 0 }),

            hasDraft: () => Object.keys(get().data).length > 0,

            saveLocalDraft: () => {
                if (typeof window === "undefined") return false

                const data = get().data

                try {
                    localStorage.setItem(
                        LOCAL_SAVED_DRAFT_KEY,
                        JSON.stringify({
                            data,
                            savedAt: new Date().toISOString(),
                        })
                    )
                    return true
                } catch {
                    return false
                }
            },

            loadLocalDraft: () => {
                if (typeof window === "undefined") return null

                const raw = localStorage.getItem(LOCAL_SAVED_DRAFT_KEY)
                if (!raw) return null

                try {
                    const parsed = JSON.parse(raw) as { data?: Partial<FullFormSchema> }
                    const savedData = parsed.data ?? {}
                    set({ data: savedData })
                    return savedData
                } catch {
                    return null
                }
            },

            hasLocalSavedDraft: () => {
                if (typeof window === "undefined") return false

                const raw = localStorage.getItem(LOCAL_SAVED_DRAFT_KEY)
                if (!raw) return false

                try {
                    const parsed = JSON.parse(raw) as { data?: Partial<FullFormSchema> }
                    return Object.keys(parsed.data ?? {}).length > 0
                } catch {
                    return false
                }
            },
        }),
        { name: "grievance-form-draft" }
    )
)