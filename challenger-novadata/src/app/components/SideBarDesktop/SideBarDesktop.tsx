import React from 'react';
import { RoundButtonGroupDesktop } from '../SelectButton/SelectButton';

const SideBarDesktop: React.FC = () => {
  return (
    <div className="h-full w-2/6 rounded bg-layout-desktop">
        <RoundButtonGroupDesktop />
    </div>
  );
};

export default SideBarDesktop;
