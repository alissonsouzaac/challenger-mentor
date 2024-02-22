import React from 'react';

const FinishStep: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white z-50 relative h-[425px] w-[345px] sm:w-full mb-[90px] rounded-md p-[25px] flex flex-col justify-center items-center"> 
      <img src="images/icon-thank-you.svg" alt="Ícone-thank-you" className="w-[50px] sm:w-auto ml-[10px]" />
      <div className='flex flex-col justify-center items-center mt-[25px]'>
          <p className='text-2xl font-bold text-blue-900 font-sans'>
              Thank you!
          </p>
          <p className='mt-[15px] font-normal text-gray-400 justify-items-center font-sans'>
              Thanks for confirming your subscription!
              We hope you have fun using our platform.
              If you ever need support, please feel free to email us at support@loremgaming.com.
          </p>
      </div>
    </div>
  );
};

export default FinishStep;
