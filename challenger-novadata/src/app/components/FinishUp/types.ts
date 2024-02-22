export interface IFinishUp {
    prevTwoStep: () => void
    prevStep: () => void
    nextStep: () => void
}

export interface FinishUpData {
    billingOption: string;
    selectedPlan: string;
    onlineServicePrice: number;
    largerStoragePrice: number;
    customizableProfilePrice: number;
    planPrice: string;
    total: number;
}