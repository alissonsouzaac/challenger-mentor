import { IActionButtons } from '@/app/types/actionsType';
import { Switch, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { selectPlanData } from './type';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#001e6e',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: '#001e6e',
    boxSizing: 'border-box',
  },
}));

const SelectPlan: React.FC<IActionButtons> = ({ prevStep, nextStep }: IActionButtons) => {
  const initialValues: selectPlanData = {
    arcade: false,
    advanced: false,
    pro: false,
    billingOption: 'Monthly',
  };

  const [formData, setFormData] = useState<selectPlanData>(initialValues);
  const [billingOption, setBillingOption] = useState<string>('Monthly');
  const [switchChecked, setSwitchChecked] = useState<boolean>(billingOption === 'Yearly');

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      const parsedFormData: selectPlanData = JSON.parse(savedFormData);
      setFormData(parsedFormData);
      
      if (parsedFormData.billingOption === 'Yearly') {
        handleBillingOptionChange();
      }
    }
  }, []);

  const handleBillingOptionChange = () => {
    const newBillingOption = billingOption === 'Monthly' ? 'Yearly' : 'Monthly';
    setBillingOption(newBillingOption);
    setSwitchChecked(newBillingOption === 'Yearly');
  };

  const getPrice = (basePrice: number) => {
    return billingOption === 'Monthly' ? basePrice : basePrice * 10;
  };

  const handleOptionClick = (option: keyof selectPlanData) => {
    setFormData((prevFormData) => ({
      ...initialValues,
      [option]: !prevFormData[option],
    }));
  };

  const handleNext = () => {
    const arcadePrice = formData.arcade ? getPrice(9) : '';
    const advancedPrice = formData.advanced ? getPrice(12) : '';
    const proPrice = formData.pro ? getPrice(15) : '';
  
    const previousDataString = localStorage.getItem('formData');
    const previousData: selectPlanData = previousDataString ? JSON.parse(previousDataString) : {};
    
    const combinedData = { ...previousData, ...formData, billingOption, arcadePrice, advancedPrice, proPrice };
    
    localStorage.setItem('formData', JSON.stringify(combinedData));
        
    nextStep();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 w-[345px] sm:w-[455px] h-[515px] z-50 relative rounded-md p-[25px]">
      <p className='text-2xl font-bold text-blue-900 font-sans'>
          Select your plan
      </p>
      <p className='mt-[15px] font-medium text-gray-400 font-sans'>
        You have the option of monthly or yearly billing.
      </p>

      <div className='sm:flex sm:w-[420px]'>
      <button
        className={`border-2 w-full h-[85px] min-h-[85px] mt-[20px] rounded-md sm:h-[170px] sm:mr-[15px] ${formData.arcade && 'bg-gray-50 border-blue-800' }`}
        onClick={() => handleOptionClick('arcade')}
      >
        <div className='mt-[10px]'>
          <img src="/images/icon-arcade.svg" alt="Ícone-arcade" className="w-auto ml-[10px] sm:mb-[50px]" />
          <div className='bottom-[40px] relative mr-[80px] sm:mr-[20px] sm:bottom-[0px] sm:ml-[0px]'>
            <p className="font-bold mr-[25px] sm:mr-[29px]">Arcade</p>
            <p className="text-sm text-gray-500 mr-[40px]">${getPrice(9)}/{billingOption === 'Monthly' ? 'mo' : 'yr'}</p>
            {billingOption === 'Yearly' && (
              <p className='text-sm text-blue-900 ml-[10px] sm:w-[100px]'>2 months free</p>
            )}
          </div>
        </div>
      </button>

      <button
        className={`border-2 w-full h-[85px] min-h-[85px] mt-[15px] sm:mt-[20px] rounded-md sm:h-[170px] sm:mr-[15px] ${formData.advanced && 'bg-gray-50 border-blue-800'}`}
        onClick={() => handleOptionClick('advanced')}
      >
        <div className='mt-[10px]'>
          <img src="images/icon-advanced.svg" alt="Ícone-advanced" className="w-auto ml-[10px] sm:mb-[50px]" />
          <div className='bottom-[40px] relative mr-[80px] sm:mr-[20px] sm:bottom-[0px] sm:ml-[0px]'>
            <p className="font-bold">Advanced</p>
            <p className="text-sm text-gray-500 mr-[30px]">${getPrice(12)}/{billingOption === 'Monthly' ? 'mo' : 'yr'}</p>
            {billingOption === 'Yearly' && (
              <p className='text-sm text-blue-900 ml-[10px] sm:w-[100px]'>2 months free</p>
            )}
          </div>
        </div>
      </button>

      <button
        className={`border-2 w-full h-[85px] mt-[15px] sm:mt-[20px] rounded-md sm:h-[170px] sm:mr-[15px] ${formData.pro && 'bg-gray-50 border-blue-800' }`}
        onClick={() => handleOptionClick('pro')}
      >
        <div className='mt-[10px]'>
          <img src="images/icon-pro.svg" alt="Ícone-pro" className="w-auto ml-[10px] sm:mb-[50px]" />
          <div className='bottom-[40px] relative mr-[80px] sm:mr-[20px] sm:bottom-[0px] sm:ml-[0px]'>
            <p className="font-bold mr-[50px]">Pro</p>
            <p className="text-sm text-gray-500 mr-[30px]">${getPrice(15)}/{billingOption === 'Monthly' ? 'mo' : 'yr'}</p>
            {billingOption === 'Yearly' && (
              <p className='text-sm text-blue-900 ml-[10px] sm:w-[93px]'>2 months free</p>
            )}
          </div>
        </div>
      </button>

      </div>
      <div className='flex rounded-md mt-[25px] bg-gray-50 h-[35px] items-center justify-center sm:h-[50px] sm:w-[405px]'>
        <p className='relative right-[20px]'>Monthly</p>
        <AntSwitch 
          onChange={handleBillingOptionChange}
          inputProps={{ 'aria-label': 'ant design' }}
          checked={switchChecked}
        />
        <p className='relative left-[20px]'>Yearly</p>
      </div>
      <button 
        type="button"
        onClick={prevStep} 
        className=" text-gray py-2 px-4 rounded h-[40px] relative left-[-30px] top-[75px] z-50 w-[90px] mb:h-[35px] sm:top-[100px] sm:left-[-30px] sm:w-[110px] ">
          Go back
      </button>
      <button 
        type="button"
        onClick={handleNext} 
        className="bg-blue-950 text-white py-2 px-4 rounded h-[40px] relative left-[125px] top-[75px] z-50 w-[90px] mb:h-[35px] sm:top-[100px] sm:left-[215px] sm:w-[110px] ">
          Next Step
      </button>
    </div>
  );
};

export default SelectPlan;
