'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMypage, MyPageDto } from '@/apis/services/mypage';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { hasTokenAndValid, jwtDecode } from '@/lib/auth';
import { getCookie } from '@/lib/cookie';
import { TOKEN_KEY } from '@/lib/constants';

const Context = createContext<{
  session: (MyPageDto & { memberId: number }) | null;
  isLoggedIn: boolean;
}>({
  session: null,
  isLoggedIn: false,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data: session } = useQuery({
    queryKey: queryKeyFactory.myPage.my,
    queryFn: getMypage,
    enabled: hasTokenAndValid(),
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const mergedSession = useMemo(() => {
    if (!session) return null;

    const token = getCookie(TOKEN_KEY);
    if (!token) return null;

    const memberId = +jwtDecode(token)?.sub;
    if (!memberId) return null;

    return {
      ...session,
      memberId,
    };
  }, [session]);

  const value = useMemo(
    () => ({
      session: mergedSession,
      isLoggedIn: !!mergedSession,
    }),
    [mergedSession]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuth = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
