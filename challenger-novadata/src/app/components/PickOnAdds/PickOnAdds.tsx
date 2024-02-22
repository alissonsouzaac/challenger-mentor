import { IActionButtons } from '@/app/types/actionsType';
import { Checkbox } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { PickOnAddsData } from './type';

export const PickOnAdds: React.FC<IActionButtons> = ({ prevStep, nextStep}: IActionButtons) => {
  const initialValues: PickOnAddsData = {
    onlineService: false,
    largerStorage: false,
    customizableProfile: false,
    onlineServicePrice: 0,
    largerStoragePrice: 0,
    customizableProfilePrice: 0,
  };

  const [formData, setFormData] = useState<PickOnAddsData>(initialValues);

  useEffect(() => {
    const savedFormDataString = localStorage.getItem('formData');
    if (savedFormDataString) {
      setFormData(JSON.parse(savedFormDataString));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  }; 

  const formDataString = localStorage.getItem('formData');
  const form = formDataString ? JSON.parse(formDataString) : {};
  const billingOption = form.billingOption;

  const handleNext = () => {
    const updatedFormData: PickOnAddsData = {
      ...formData,
      onlineServicePrice: billingOption === 'Monthly' ? 1 : 10,
      largerStoragePrice: billingOption === 'Monthly' ? 2 : 20,
      customizableProfilePrice: billingOption === 'Monthly' ? 2 : 20,
    };

    localStorage.setItem('formData', JSON.stringify(updatedFormData));

    nextStep();
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div className="max-w-md mx-auto bg-white z-50 relative h-[425px] w-[345px] sm:w-full mb-[90px] rounded-md p-[25px]">
      <p className='text-2xl font-bold text-blue-900 font-sans'>
          Pick add-ons
      </p>
      <p className='mt-[15px] font-medium text-gray-400'>
        Add-ons help enhance your gaming experience.
      </p>
      
      <div>
        <button
            className={`border-2 w-full h-[70px] mt-[20px] rounded-md sm:h-[90px] sm:mr-[15px] `}
        >
            <div className='relative flex items-start sm:ml-[0px]'>
            <Checkbox
              checked={formData.onlineService}
              onChange={handleChange}
              name="onlineService"
              {...label}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
            <div className="flex flex-col ml-2">
            <p className="font-bold text-blue-900 text-sm inline-flex">Online Service</p>
            <p className="text-xs text-gray-500">Access to multiplayer games</p>
            </div>
            <p className='text-blue-700 text-xs left-[20px] top-[15px] relative'>
              {billingOption === 'Monthly' ? '+$1/mo' : '+$10/yr'}
            </p>
            </div>
        </button>

        <button
          className={`border-2 w-full h-[70px] mt-[20px] rounded-md sm:h-[90px] sm:mr-[15px] `}
        >
          <div className='relative flex items-start sm:ml-[0px]'>
          <Checkbox
            checked={formData.largerStorage}
            onChange={handleChange}
            name="largerStorage"
            {...label}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          />
          <div className="flex flex-col ml-2">
            <p className="font-bold text-blue-900 text-sm inline-flex">Larger storage</p>
            <p className="text-xs text-gray-500">Extra 1TB of cloud save</p>
          </div>
          <p className='text-blue-700 text-xs left-[50px] top-[15px] relative'>
            {billingOption === 'Monthly' ? '+$2/mo' : '+$20/yr'}
          </p>
          </div>
        </button>

        <button
            className={`border-2 w-full h-[70px] mt-[20px] rounded-md sm:h-[90px] sm:mr-[15px] `}
        >
            <div className='relative flex items-start sm:ml-[0px]'>
            <Checkbox
              checked={formData.customizableProfile}
              onChange={handleChange}
              name="customizableProfile"
              {...label}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
            <div className="flex flex-col ml-2">
            <p className="font-bold text-blue-900 text-sm inline-flex">Customizable profile</p>
            <p className="text-xs text-gray-500">Custom theme on your profile</p>
            </div>
            <p className='text-blue-700 text-xs left-[15px] top-[15px] relative'>
              {billingOption === 'Monthly' ? '+$2/mo' : '+$20/yr'}
            </p>
            </div>
        </button>
      </div>

      <button 
        type="button"
        onClick={prevStep} 
        className=" text-gray py-2 px-4 rounded h-[40px] relative left-[-30px] top-[170px] z-50 w-[90px] mb:h-[35px] sm:top-[80px] sm:left-[-30px] sm:w-[110px] ">
          Go back
      </button>
      <button 
        type="button"
        onClick={handleNext} 
        className="bg-blue-950 text-white py-2 px-4 rounded h-[40px] relative left-[125px] top-[170px] z-50 w-[90px] mb:h-[35px] sm:top-[80px] sm:left-[175px] sm:w-[110px] ">
          Next Step
      </button>

    </div>
  );
};

export default PickOnAdds;
