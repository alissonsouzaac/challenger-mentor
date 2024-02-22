import React, { useState, ChangeEvent, useEffect } from 'react';
import { Errors, IInfoPerson, InfoPersonData } from './type';

export const PersonalInfo: React.FC<IInfoPerson> = ({nextStep}: IInfoPerson) => {
  const initialValues: InfoPersonData = {
    name: '',
    emailAddress: '',
    phoneNumber: '',
  };

  const [formData, setFormData] = useState<InfoPersonData>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedFormData = localStorage.getItem('formData');
      return savedFormData ? JSON.parse(savedFormData) : initialValues;
    } else {
      return initialValues;
    }
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePhone = (phone: string) => /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/.test(phone);
  const validateEmail = (email?: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email ? email : '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    localStorage.setItem(name, value);
    setErrors({ ...errors, [name]: '' });
  };

  const handleNext = () => {
    const validationErrors: Errors = {};
    if (!formData.name.trim()) {
      validationErrors.name = 'The field is required';
    }
    if (!formData.emailAddress.trim()) {
      validationErrors.emailAddress = 'The field is required';
    } else if (!validateEmail(formData.emailAddress)) {
      validationErrors.emailAddress = 'Invalid email address';
    }
    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'The field is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Invalid phone number';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('formData', JSON.stringify(formData));
      nextStep();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white z-50 relative h-[425px] w-[345px] sm:w-full mb-[90px] rounded-md p-[25px]">
      <p className='text-2xl font-bold text-blue-900 font-sans'>
          Personal Info
      </p>
      <p className='mt-[15px] font-medium text-gray-400 font-sans'>
        Please provide your name, email address, and phone number.
      </p>
      
      <div className="relative mt-[40px]">
        <label htmlFor="name" className="absolute top-[-20px] text-sm text-blue-900">Name</label>
        <input id="name" 
          type="text" 
          name="name" 
          placeholder='  e.g. Stephen King' 
          value={formData.name} 
          onChange={handleChange} 
          className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500 w-full h-[35px]" 
        />
      </div>

      <div className={`relative ${errors.phoneNumber ? 'mt-[30px]' : 'mt-[30px]'}`}>
        <label htmlFor="emailAddress" className="absolute top-[-20px] text-sm text-blue-900">Email Address</label>
        <input id="emailAddress" 
          type="text" 
          placeholder='  e.g.stephenking@lorem.com' 
          name="emailAddress" 
          value={formData.emailAddress} 
          onChange={handleChange} 
          className={`border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500 w-full h-[35px] ${errors.phoneNumber && 'border-red-500 '}`}
        />
        {errors.emailAddress && <div className="text-red-500 font-bold text-sm mt-1">{errors.emailAddress}</div>}
      </div>

      <div className={`relative ${errors.phoneNumber ? 'mt-[20px]' : 'mt-[30px]'}`}>
        <label htmlFor="phoneNumber" className="absolute top-[-20px] text-sm text-blue-900">Phone Number</label>
        <input id="phoneNumber" 
          type="text" 
          name="phoneNumber" 
          placeholder='  e.g. +1 234 567 890' 
          value={formData.phoneNumber} 
          onChange={handleChange} 
          className={`border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:border-blue-500 w-full h-[35px] ${errors.phoneNumber && 'border-red-500 '}`}
        />
        {errors.phoneNumber && <div className="text-red-500 font-bold text-sm mt-1">{errors.phoneNumber}</div>}
      </div>

      <button type="button" onClick={handleNext} className="bg-blue-950 text-white py-2 px-4 rounded h-[40px] relative left-[215px] top-[235px] z-50 w-[90px] mb:h-[35px] sm:top-[140px] sm:left-[255px] sm:w-[110px] ">Next Step</button>
    </div>
  );
};

export default PersonalInfo;
