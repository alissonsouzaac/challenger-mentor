import React, { useState, useEffect } from 'react';
import { FinishUpData, IFinishUp } from './types';

export const FinishUp: React.FC<IFinishUp> = ({ nextStep, prevStep, prevTwoStep}: IFinishUp) => {
    const [finishUpData, setFinishUpData] = useState<FinishUpData>({
        billingOption: '',
        selectedPlan: '',
        onlineServicePrice: 0,
        largerStoragePrice: 0,
        customizableProfilePrice: 0,
        planPrice: '',
        total: 0,
      });
    
      useEffect(() => {
        const formDataString = localStorage.getItem('formData');
        const formData = formDataString ? JSON.parse(formDataString) : {};
    
        const billingOption = formData.billingOption;
    
        const selectedPlan = formData.arcade ? 'Arcade' : formData.advanced ? 'Advanced' : formData.pro ? 'Pro' : '';

        const onlineServicePrice = formData.onlineService ? formData.onlineServicePrice : '';
        const largerStoragePrice = formData.largerStorage ? formData.largerStoragePrice : '';
        const customizableProfilePrice = formData.customizableProfile ? formData.customizableProfilePrice : '';
        const planPrice = formData[selectedPlan.toLowerCase() + 'Price'] || '';

        const total = onlineServicePrice + largerStoragePrice + customizableProfilePrice + planPrice;

        setFinishUpData({
          billingOption,
          selectedPlan,
          onlineServicePrice,
          largerStoragePrice,
          customizableProfilePrice,
          planPrice,
          total: total,
        });
      }, []);

    const handleNext = () => {
       localStorage.removeItem('formData');
       nextStep();
    };

    const option = finishUpData.billingOption === 'Monthly' ? '/mo' : '/yr'

  return (
    <div className="max-w-md mx-auto bg-white z-50 relative h-[400px] w-[345px] sm:w-full mb-[115px] rounded-md p-[25px]">
      <p className='text-2xl font-bold text-blue-900 font-sans'>
        Finishing up
      </p>
      <p className='mt-[15px] font-medium text-gray-400 font-sans'>
        Double-check everything looks OK before confirming.
      </p>
      
      <div className='bg-gray-50 w-full h-[150px] rounded-md mt-[25px]'>
        <div className='px-[15px] pt-[10px] flex'>
            <div>
                <p className='font-bold text-sm text-blue-900 w-[141px]'>{finishUpData.selectedPlan} ({finishUpData.billingOption})</p>
                <p onClick={prevTwoStep} className="cursor-pointer text-gray-400 mr-2 underline">
                    Change
                </p>
            </div>
        <p className={`mt-[10px] font-bold text-blue-900 sm:ml-[165px] ${finishUpData.billingOption === 'Monthly' ? 'ml-[70px] sm:ml-[170px]' : 'ml-[60px]'}`}>${finishUpData.planPrice}{option}</p>
        </div>
        <div className="border-t border-gray-300" />
        <div className='flex flex-wrap'>
            {finishUpData.onlineServicePrice && (
                <div className='flex items-center justify-between w-full mt-[7px]'>
                    <p className='text-gray-400 text-sm ml-[15px]'>Online Service</p>
                    <p className='text-blue-900 font-medium mr-[20px]'>+${finishUpData.onlineServicePrice}{option}</p>
                </div>
            )}
            {finishUpData.largerStoragePrice && (
                <div className='flex items-center justify-between w-full mt-[7px]'>
                    <p className='text-gray-400 text-sm ml-[15px]'>Larger Storage</p>
                    <p className='text-blue-900 font-medium mr-[20px]'>+${finishUpData.largerStoragePrice}{option}</p>
                </div>
            )} 
            {finishUpData.customizableProfilePrice && (
                <div className='flex items-center justify-between w-full mt-[7px]'>
                    <p className='text-gray-400 text-sm ml-[15px]'>Customizable Profile</p>
                    <p className='text-blue-900 font-medium mr-[20px]'>+${finishUpData.customizableProfilePrice}{option}</p>
                </div>
            )}
        </div>
      </div>
      <div className='flex flex-wrap mt-[30px]'>
        <p className='text-gray-400 text-sm ml-[15px] mt-[30px'>Total (per {finishUpData.billingOption})</p>
        <p className={`text-blue-600 font-bold ml-[85px] ${finishUpData.billingOption === 'Monthly' ? 'sm:ml-[180px]' : 'sm:ml-[190px]'}`}>${finishUpData.total}{option}</p>
      </div>
      <button 
        type="button"
        onClick={prevStep} 
        className=" text-gray py-2 px-4 rounded h-[40px] relative left-[-30px] top-[210px] z-50 w-[90px] mb:h-[35px] sm:top-[80px] sm:left-[-30px] sm:w-[110px] ">
          Go back
      </button>
      <button 
        type="button"
        onClick={handleNext} 
        className="bg-blue-950 text-white py-2 px-4 rounded h-[40px] relative left-[125px] top-[210px] z-50 w-[90px] mb:h-[35px] sm:top-[80px] sm:left-[175px] sm:w-[110px] ">
          Next Step
      </button>
    </div>
    
  );
};

export default FinishUp;
