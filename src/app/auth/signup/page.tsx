'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signUp } from '@/apis/services/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setSession } from '@/lib/auth';
import { PATH } from '@/lib/path';
import { queryKeyFactory } from '@/apis/query-key-factory';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const schema = z.object({
  loginId: z.string('아이디를 입력해주세요.').min(1),
  nickname: z.string('닉네임을 입력해주세요.').min(1),
  password: z.string('비밀번호를 입력해주세요.').min(1),
});

const SignInPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.myPage.my,
      });
      router.replace(PATH.auth.signIn);
    },
    onError: (error) => {
      const errorMessage =
        typeof error?.message === 'string'
          ? error.message
          : '회원가입에 실패했습니다.';
      toast.error(errorMessage);
    },
  });

  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    signUpMutation.mutate({ ...data, age: 0, field: 'temp', interests: [] });
  };

  return (
    <div className="px-4 justify-center size-full flex-1 flex flex-col items-center gap-4 max-w-lg m-auto">
      <h1 className="text-2xl font-bold">회원가입</h1>

      <p className="text-gray-600">Rebound가 곧 성장의 시작점이 됩니다</p>

      <svg
        width="323"
        height="223"
        viewBox="0 0 323 223"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-40"
      >
        <path
          d="M221.672 74.86C226.474 74.5042 230.651 78.1651 231.002 83.0372C231.353 87.9093 227.745 92.1475 222.943 92.5035C187.5 95.1301 164.421 114.515 149.641 138.306C134.684 162.383 128.513 190.648 127.487 209.122C127.257 213.255 124.234 216.673 120.21 217.35C116.186 218.027 112.236 215.784 110.703 211.948C105.896 199.916 88.9566 176.56 60.4818 176.56C46.6943 176.56 36.8279 182.798 29.8032 190.951C22.5971 199.314 18.6209 209.485 17.2436 216.006C16.2347 220.782 11.6009 223.825 6.89321 222.802C2.18576 221.778 -0.813255 217.077 0.195163 212.3C2.08714 203.342 7.21103 190.293 16.6774 179.307C26.3255 168.11 40.7062 158.869 60.4818 158.869C84.6399 158.869 102.151 171.053 113.374 183.912C117.003 166.572 123.75 146.809 134.891 128.874C151.931 101.444 179.526 77.9834 221.672 74.86Z"
          fill="url(#paint0_linear_207_854)"
        />
        <path
          d="M282.322 33.5425C285.18 29.04 292.046 30.8787 292.342 36.2258L293.567 58.3395C293.7 60.7307 295.335 62.7634 297.618 63.3745L318.724 69.026C323.827 70.3926 324.226 77.5875 319.306 79.5257L298.955 87.5409C296.755 88.4078 295.355 90.6135 295.487 93.0046L296.712 115.118C297.008 120.465 290.388 123.073 287.051 118.923L273.25 101.764C271.757 99.9081 269.256 99.2385 267.056 100.105L246.706 108.121C241.786 110.059 237.296 104.476 240.154 99.9734L251.973 81.3527C253.251 79.3393 253.107 76.72 251.615 74.8644L237.813 57.7035C234.476 53.5543 238.321 47.4969 243.424 48.8634L264.531 54.515C266.813 55.1261 269.224 54.1766 270.502 52.1632L282.322 33.5425Z"
          fill="url(#paint1_linear_207_854)"
        />
        <path
          opacity="0.9"
          d="M186.553 13.8479C186.024 11.4778 188.827 9.85886 190.644 11.4853L198.159 18.2115C198.971 18.9387 200.153 19.0667 201.084 18.5285L209.7 13.5521C211.784 12.3489 214.229 14.5372 213.269 16.7456L209.297 25.8794C208.867 26.867 209.127 28.0281 209.939 28.7554L217.454 35.4817C219.271 37.1081 217.979 40.0792 215.569 39.8177L205.599 38.7363C204.521 38.6194 203.5 39.209 203.071 40.1966L199.099 49.3304C198.139 51.5388 194.895 51.1867 194.366 48.8166L192.176 39.015C191.939 37.9552 191.049 37.1583 189.971 37.0412L180.001 35.9596C177.591 35.698 176.878 32.5094 178.962 31.3061L187.578 26.3297C188.509 25.7916 188.98 24.7096 188.743 23.6498L186.553 13.8479Z"
          fill="#BDCCEB"
        />
        <path
          opacity="0.7"
          d="M246.043 11.2708C245.803 10.1975 247.072 9.46446 247.895 10.2009L251.298 13.2468C251.666 13.5761 252.201 13.634 252.623 13.3903L256.525 11.1369C257.468 10.592 258.575 11.5829 258.14 12.583L256.342 16.719C256.147 17.1662 256.265 17.692 256.633 18.0214L260.036 21.0672C260.859 21.8037 260.274 23.1491 259.182 23.0307L254.667 22.541C254.179 22.488 253.717 22.755 253.523 23.2023L251.724 27.3383C251.289 28.3383 249.821 28.1789 249.581 27.1056L248.589 22.6672C248.482 22.1873 248.079 21.8264 247.591 21.7734L243.076 21.2836C241.984 21.1652 241.662 19.7213 242.605 19.1764L246.507 16.9229C246.929 16.6793 247.142 16.1893 247.035 15.7094L246.043 11.2708Z"
          fill="#BDCCEB"
        />
        <defs>
          <linearGradient
            id="paint0_linear_207_854"
            x1="3.19987e-06"
            y1="213.803"
            x2="322.783"
            y2="40.197"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.221154" stop-color="#BDCCEB" />
            <stop offset="1" stop-color="#1463F2" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_207_854"
            x1="3.19987e-06"
            y1="213.803"
            x2="322.783"
            y2="40.197"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.221154" stop-color="#BDCCEB" />
            <stop offset="1" stop-color="#1463F2" />
          </linearGradient>
        </defs>
      </svg>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 w-full flex flex-col gap-4"
      >
        <Input
          {...register('loginId')}
          placeholder="이메일을 입력해주세요"
          className="h-11 px-6 text-base"
        />
        <Input
          {...register('nickname')}
          placeholder="닉네임을 입력해주세요"
          className="h-11 px-6 text-base"
        />
        <Input
          {...register('password')}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          className="h-11 px-6 text-base"
        />
        <Button
          type="submit"
          className="h-11 text-lg font-bold"
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? (
            <Loader2 className="text-white size-6 rounded-md animate-spin" />
          ) : (
            '회원가입'
          )}
        </Button>

        <p className="text-gray-600 text-sm text-center">
          <Link href={PATH.auth.signIn} className="text-gray-800 underline">
            로그인 페이지로 돌아가기
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
