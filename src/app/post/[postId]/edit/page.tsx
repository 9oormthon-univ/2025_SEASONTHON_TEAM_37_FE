'use client';

import { SymbolIcon } from '@/components/icons';
import { PATH } from '@/lib/path';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import PostAddToolbar from './ui/post-add-toolbar';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PostAddTitleSection from './sections/post-add-title-section';
import PostAddCategorySection from './sections/post-add-category-section';
import PostAddTagsSection from './sections/post-add-tags-section';
import { PostEditFormData, postEditSchema } from './utils';
import PostAddContentSection from './sections/post-add-content-section';
import PostAddImagesSection from './sections/post-add-images-section';
import { getPost } from '@/apis/services/posts';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Post } from '@/types/post';
import { useParams } from 'next/navigation';
import { minutes } from '@/lib/time';
import { queryKeyFactory } from '@/apis/query-key-factory';
import PostStatusBadge from '@/components/ui/post-status-badge';
import PostPublishButton from './ui/post-publish-button';
import PostEditButton from './ui/post-edit-button';

const convertDefaultValues = (post: Post | undefined) => {
  if (!post) return {};

  return {
    ...post,
    tags: post.tags.map((tag) => ({ value: tag })),
    postImages: post.imageUrls.map((imageUrl) => ({ imageUrl })),
    mainCategory: post.category.mainCategoryCode,
    subCategory: post.category.subCategoryCode,
  };
};

const PostEditPage = () => {
  const { postId } = useParams<{ postId: string }>();

  const { data } = useQuery({
    queryKey: queryKeyFactory.post.detail(+postId),
    queryFn: () => getPost({ postId: +postId }),
    enabled: !!postId,
    gcTime: minutes(30),
    staleTime: minutes(30),
  });

  const methods = useForm<PostEditFormData>({
    resolver: zodResolver(postEditSchema),
    defaultValues: convertDefaultValues(data),
  });

  const onSubmit = () => {};

  const onInvalid = (errors: FieldErrors<PostEditFormData>) => {
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

  useEffect(() => {
    if (data) {
      methods.reset(convertDefaultValues(data));
    }
  }, [data, methods]);

  return (
    <FormProvider {...methods}>
      <section className="mt-16 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <SymbolIcon className="text-primary" /> 실패담 수정
          {data?.status && (
            <div className="ml-2">
              <PostStatusBadge status={data?.status} />
            </div>
          )}
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
            <PostEditButton className="w-auto text-base px-4 py-2 h-auto" />
            <PostPublishButton className="w-auto text-base px-4 py-2 h-auto" />
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

export default PostEditPage;
