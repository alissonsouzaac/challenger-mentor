'use client'
import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicInfoPerson = dynamic<any>((): any => import('./components/InfoPerson/InfoPerson'));
const DynamicSelectPlan = dynamic<any>((): any => import('./components/SelectPlan/SelectPlan'));
const DynamicPickOnAdds = dynamic<any>((): any => import('./components/PickOnAdds/PickOnAdds'));
const DynamicFinishUp = dynamic<any>((): any => import('./components/FinishUp/FinishUp'));
const DynamicFinalStep = dynamic<any>((): any => import('./components/FinishStep/FinishStep'));

export default function Home() {
    const [step, setStep] = useState<number>(1);

    useEffect(() => {
      const savedStep = localStorage.getItem('currentStep');
      if (savedStep) {
          const parsedStep = parseInt(savedStep, 10);
          setStep(parsedStep);
      }
  }, []);
    
      const nextStep = useCallback(() => {
        const nextStepValue = step + 1;
        setStep(nextStepValue);
        if (nextStepValue < 5) {
          localStorage.setItem('currentStep', String(nextStepValue));
        } else {
          localStorage.removeItem('currentStep');
        }
      }, [step, setStep]);
    
      const prevStep = useCallback(() => {
        const prevStepValue = Math.max(step - 1, 1);
        setStep(prevStepValue);
        localStorage.setItem('currentStep', String(prevStepValue));
      }, [step, setStep]);

      const prevTwoSteps = useCallback(() => {
        const prevStepValue = Math.max(step - 2, 1);
        setStep(prevStepValue);
        localStorage.setItem('currentStep', String(prevStepValue));
      }, [step, setStep]);

      switch (step) {
        case 1:
          return <DynamicInfoPerson nextStep={nextStep} />
    
        case 2:
          return <DynamicSelectPlan nextStep={nextStep} prevStep={prevStep} />
    
        case 3:
          return (
            <DynamicPickOnAdds nextStep={nextStep} prevStep={prevStep} />
          )

        case 4:
          return (
            <DynamicFinishUp nextStep={nextStep} prevStep={prevStep} prevTwoStep={prevTwoSteps} />
          )  

        case 5: 
          return (
            <DynamicFinalStep />
          )  
    
        default:
          return <DynamicInfoPerson nextStep={nextStep} />
      }
}