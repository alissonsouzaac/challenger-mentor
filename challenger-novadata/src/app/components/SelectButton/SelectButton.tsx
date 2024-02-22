import React, { useEffect, useState } from 'react';
import { RoundButtonProps } from './types';
import { autorun } from 'mobx';
import stepStore from '@/app/store/StepStore';

const RoundButton: React.FC<RoundButtonProps> = ({ number, selected }) => {
  return (
    <button 
      className={`w-[30px] h-12 rounded-full border-white border-[1px] flex items-center justify-center text-white font-bold text-xl mr-[15px] mb-[10px] ${selected && 'bg-blue-300'}`}
    >
      <p className={`${selected && 'text-slate-900'} text-[12px]`}>
      {number}
      </p>
    </button>
  );
};

export const RoundButtonGroupMobile: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const localStorageData = localStorage.getItem('currentStep')

  useEffect(() => {
    const handleStorageChange = () => {
      const savedStep = localStorage.getItem('currentStep');
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    };
  }, []);

  useEffect(() => {
    const disposer = autorun(() => {
      setCurrentStep(stepStore.currentStep);
    });
    
    return () => {
      disposer();
    };
  }, [stepStore.currentStep]);

  return (
    <div className="flex mb-[70px]">
      <RoundButton number={1} selected={currentStep === 1} />
      <RoundButton number={2} selected={currentStep === 2} />
      <RoundButton number={3} selected={currentStep === 3} />
      <RoundButton number={4} selected={currentStep === 4} />
    </div>
  );
};

export const RoundButtonGroupDesktop: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const localStorageData = localStorage.getItem('currentStep')

  useEffect(() => {
    const savedStep = localStorageData;
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, [localStorageData]);

  return (
    <div className="block ml-[30px] mt-[50px]">
      <div className='flex mb-[20px]'>
        <RoundButton number={1} selected={currentStep === 1} />
        <div className='block h-[20px]'>
          <p className='text-xs'>
            STEP 
          </p>
          <p className='text-white text-sm'>
            YOUR INFO
          </p>
        </div>
      </div>
      <div className='flex mb-[20px]'>
        <RoundButton number={2} selected={currentStep === 2} />
        <div className='block h-[20px]'>
          <p className='text-xs'>
            STEP 2
          </p>
          <p className='text-white text-sm'>
            SELECT PLAN
          </p>
        </div>
      </div>
      <div className='flex mb-[20px]'>
        <RoundButton number={3} selected={currentStep === 3} />
        <div className='block h-[20px]'>
          <p className='text-xs'>
            STEP 3
          </p>
          <p className='text-white text-sm'>
            ADD-ONS
          </p>
        </div>
      </div>
      <div>
      <div className='flex mb-[20px]'>
        <RoundButton number={4} selected={currentStep === 4}/>
        <div className='block h-[20px]'>
          <p className='text-xs'>
            STEP 4
          </p>
          <p className='text-white text-sm'>
            SUMMARY
          </p>
        </div>
       </div>
      </div>
    </div>
  );
};
