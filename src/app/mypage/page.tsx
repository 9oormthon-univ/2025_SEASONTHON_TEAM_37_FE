'use client';

import { queryKeyFactory } from '@/apis/query-key-factory';
import { getCategories } from '@/apis/services/categories';
import { getMypage, updateMyPage } from '@/apis/services/mypage';
import { uploadFile } from '@/apis/services/upload-file';
import { BlankUserIcon, SymbolIcon } from '@/components/icons';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import RankingBadge from '@/components/ui/ranking-badge';
import { removeSession } from '@/lib/auth';
import { PATH } from '@/lib/path';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronLeftIcon, EditIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const myPageSchema = z.object({
  nickname: z.string().min(1),
  loginId: z.string().min(1),
  field: z.string(),
  age: z.number(),
  imageUrl: z.string().optional(),
  interests: z.array(z.string()),
});

const Mypage = () => {
  const { data } = useQuery({
    queryKey: queryKeyFactory.myPage.my,
    queryFn: getMypage,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const router = useRouter();

  const { data: categories } = useQuery({
    queryKey: queryKeyFactory.categories.list,
    queryFn: getCategories,
  });

  const methods = useForm<z.infer<typeof myPageSchema>>({
    resolver: zodResolver(myPageSchema),
    defaultValues: data,
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateMyPage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.myPage.my,
      });
      toast.success('프로필이 수정되었습니다.');
    },
    onError: () => {
      toast.error('프로필 수정에 실패했습니다.');
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data: string) => {
      methods.setValue('imageUrl', data);
      onSubmit({ ...methods.getValues(), imageUrl: data });
    },
    onError: () => {
      toast.error('프로필 이미지 업로드에 실패했습니다.');
    },
  });

  const onSubmit = (data: z.infer<typeof myPageSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loginId, ...payload } = data;
    updateMutation.mutate(payload);
  };

  const onInvalid = (errors: FieldErrors<z.infer<typeof myPageSchema>>) => {
    console.log(errors);
  };

  const toggleInterestsCategory = (category: string) => {
    const interests = methods.watch('interests') ?? [];
    const isSelected = interests.includes(category);

    if (isSelected) {
      methods.setValue(
        'interests',
        interests.filter((interest) => interest !== category)
      );
    } else {
      methods.setValue('interests', [...interests, category]);
    }
  };

  const isSelectedInterestsCategory = (category: string) => {
    const interests = methods.watch('interests') ?? [];
    return interests.includes(category);
  };

  const onLogout = () => {
    removeSession();
    router.push(PATH.auth.signIn);
  };

  const onChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = '';
      uploadMutation.mutate(file);
    }
  };

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods]);

  return (
    <>
      <Header />

      <div className="px-4 flex flex-col flex-1 min-h-0 overflow-y-auto">
        <main className="flex-1 w-full max-w-5xl mx-auto">
          <section className="mt-16 flex flex-col gap-2">
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <SymbolIcon className="text-primary" /> 프로필
            </h1>

            <Link
              href={PATH.main}
              replace
              className="mt-6 flex items-center gap-2 text-gray-500"
            >
              <ChevronLeftIcon />
              이전으로
            </Link>
          </section>

          <FormProvider {...methods}>
            <form
              className="mt-16 flex flex-col"
              onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
            >
              <section className="flex gap-10">
                <div>
                  <label htmlFor="profileImage" className="cursor-pointer">
                    <Image
                      src={data?.imageUrl}
                      key={data?.imageUrl}
                      alt="profile"
                      className="rounded-full w-40 h-40"
                      fallback={
                        <BlankUserIcon className="text-secondary size-40" />
                      }
                    />
                    <input
                      type="file"
                      id="profileImage"
                      className="hidden"
                      onChange={onChangeProfileImage}
                    />
                  </label>
                </div>

                <div className="flex-1 flex flex-col gap-2 self-end">
                  <div className="flex flex-col gap-2">
                    <label className="text-black font-semibold text-xl">
                      닉네임
                    </label>

                    <div className="flex gap-4">
                      <Input
                        {...methods.register('nickname')}
                        className="h-13 px-6 text-base"
                      />
                      <button type="submit">
                        <EditIcon className="size-5 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="mt-16 flex flex-col gap-5">
                <label className="text-black font-semibold text-xl">
                  이메일
                </label>
                <span className="text-lg">{data?.loginId}</span>
              </div>

              <div className="mt-16 flex flex-col gap-5">
                <label className="text-black font-semibold text-xl">
                  랭킹 뱃지
                </label>

                <div className="relative w-40 h-40">
                  <BlankUserIcon className="text-secondary size-40" />
                  {data?.hadRankingBadge && (
                    <RankingBadge className="absolute bottom-0 right-0 size-20" />
                  )}
                </div>
              </div>

              <section className="mt-16 flex flex-col gap-5">
                <label className="text-black font-semibold text-xl">
                  관심사 카테고리
                </label>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-fit">
                  {categories?.map((category) => (
                    <div
                      key={category.mainCategoryCode}
                      role="button"
                      onClick={() =>
                        toggleInterestsCategory(category.mainCategoryCode)
                      }
                      className={cn(
                        'text-white bg-secondary rounded-lg w-[148px] py-3 text-lg font-bold text-center',
                        isSelectedInterestsCategory(
                          category.mainCategoryCode
                        ) && 'bg-primary'
                      )}
                    >
                      {category.mainCategoryLabel}
                    </div>
                  ))}
                </div>
              </section>
            </form>
          </FormProvider>

          <section className="mt-40 flex justify-end">
            <Button
              size="lg"
              onClick={onLogout}
              className="px-7.5 py-3.5 text-lg font-bold text-gray-800 bg-tertiary"
            >
              로그아웃
            </Button>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Mypage;
