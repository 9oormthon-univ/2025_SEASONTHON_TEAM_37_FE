'use client';

import { SymbolIcon } from '@/components/icons';
import { PATH } from '@/lib/path';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import PostAddToolbar from './ui/post-add-toolbar';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PostAddTitleSection from './sections/post-add-title-section';
import PostAddCategorySection from './sections/post-add-category-section';
import PostAddTagsSection from './sections/post-add-tags-section';
import { PostAddFormData } from './utils';
import PostAddContentSection from './sections/post-add-content-section';
import PostAddImagesSection from './sections/post-add-images-section';
import { toast } from 'sonner';
import { postAddSchema } from './utils';
import PostAddButton from './ui/post-add-button';
import PostDraftButton from './ui/post-draft-button';

const PostAddPage = () => {
  const methods = useForm<PostAddFormData>({
    resolver: zodResolver(postAddSchema),
  });

  const onSubmit = () => {
    // const payload = {
    //   ...data,
    //   tags: data.tags?.map((tag) => tag.value),
    // };
    // console.log(payload);
    // addMutation.mutate(payload as unknown as Post);
  };

  const onInvalid = (errors: FieldErrors<PostAddFormData>) => {
    console.log(errors);
    // 순서대로
    if (errors.title) {
      toast.error(errors.title.message);
      return;
    }
    if (errors.mainCategory || errors.subCategory) {
      toast.error('카테고리를 선택해주세요.');
      return;
    }
    // if (errors.tags) {
    //   toast.error(errors.tags.message);
    //   return;
    // }
    if (errors.situationContent) {
      toast.error(errors.situationContent.message);
      return;
    }
    if (errors.failureContent) {
      toast.error(errors.failureContent.message);
      return;
    }
    if (errors.learningContent) {
      toast.error(errors.learningContent.message);
      return;
    }
    if (errors.nextStepContent) {
      toast.error(errors.nextStepContent.message);
      return;
    }
    // if (errors.postImages) {
    //   toast.error(errors.postImages.message);
    //   return;
    // }
  };

  return (
    <FormProvider {...methods}>
      <section className="mt-16 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <SymbolIcon className="text-primary" /> 실패담 작성
        </h1>

        <div className="mt-6 flex items-center justify-between">
          <Link
            href={PATH.main}
            replace
            className="flex items-center gap-2 text-gray-500"
          >
            <ChevronLeftIcon />
            이전으로
          </Link>

          <div className="flex lg:hidden items-center gap-2">
            <PostDraftButton className="w-auto text-base px-4 py-2 h-auto" />
            <PostAddButton className="w-auto text-base px-4 py-2 h-auto" />
          </div>
        </div>
      </section>
      <form
        className="mt-12 flex-1 flex gap-4"
        onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
      >
        <div className="flex-1 flex flex-col gap-16">
          <PostAddTitleSection id="title-section" />
          <PostAddCategorySection id="category-section" />
          <PostAddTagsSection id="tag-section" />
          <PostAddContentSection
            title="상황"
            subTitle="실패나 도전을 겪은 경험을 구체적으로 작성해 주세요"
            name="situationContent"
            id="situation-section"
          />
          <PostAddContentSection
            title="실패/좌절"
            subTitle="실패 당시 느낀 감정과 한계를 솔직하게 작성해 주세요"
            name="failureContent"
            id="failure-section"
          />
          <PostAddContentSection
            title="핵심 배움"
            subTitle="경험에서 얻은 깨달음과 성장 포인트를 정리해 주세요"
            name="learningContent"
            id="learning-section"
          />
          <PostAddContentSection
            title="다음 단계"
            subTitle="앞으로의 개선 방향이나 실행 계획을 적어주세요."
            name="nextStepContent"
            id="nextStep-section"
          />
          <PostAddImagesSection id="image-section" />
        </div>
        <PostAddToolbar />
      </form>
    </FormProvider>
  );
};

export default PostAddPage;
