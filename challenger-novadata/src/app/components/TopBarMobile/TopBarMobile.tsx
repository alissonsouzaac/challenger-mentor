import React from 'react';
import { RoundButtonGroupMobile } from '../SelectButton/SelectButton';

const TopBarMobile: React.FC = () => {
  return (
    <div className="w-full h-[24%] bg-layout-mobile absolute top-[0px] flex items-center justify-center">
        <RoundButtonGroupMobile/>
    </div>
  );
};

export default TopBarMobile;
