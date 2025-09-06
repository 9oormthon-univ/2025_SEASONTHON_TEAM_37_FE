'use client';

import React from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import Link from 'next/link';
import { PATH } from '@/lib/path';
import Image from '@/components/ui/image';
import { LogoIcon } from '../icons';
import { BlankUserIcon } from '../icons';

const Header = () => {
  const { isLoggedIn, session } = useAuth();

  return (
    <header className="p-4 border-b border-tertiary flex justify-between items-center">
      <Link href={PATH.main}>
        <LogoIcon className="text-primary" />
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2" href={PATH.mypage}>
            <Image
              src={session?.imageUrl}
              alt="profile"
              className="rounded-full w-8 h-8"
              fallback={<BlankUserIcon className="text-secondary size-8" />}
            />
            <span className="text-gray-600 font-semibold">
              {session?.nickname}
            </span>
          </Link>
        </div>
      ) : (
        <div>
          <Link href={PATH.auth.signIn}>로그인</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
