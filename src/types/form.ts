export type StepOneData = {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export type StepTwoData = {
    grievanceType: string
    subject: string
    description: string
    dateOfIncident: string
}

export type StepThreeData = {
    evidenceDescription: string
    witnessName: string
    witnessContact: string
    agreeToTerms: boolean
}

export type FullFormData = StepOneData & StepTwoData & StepThreeData