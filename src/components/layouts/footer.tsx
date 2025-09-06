import React from 'react';
import { LogoIcon } from '../icons';
import { Separator } from '../ui/separator';

const Footer = () => {
  return (
    <footer className="mt-15 px-4 py-10 border-t border-tertiary">
      <div className="max-w-5xl mx-auto flex flex-col gap-2">
        <LogoIcon className="text-primary" />

        <div className="mt-10 flex flex-col gap-2 text-gray-800 text-xs">
          <div className="flex items-center gap-2 h-3">
            <span>이용약관</span>
            <Separator orientation="vertical" className="bg-gray-800" />
            <span>개인정보처리방침</span>
          </div>

          <p className="border-b border-gray-800">
            ©2025 rebound. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
