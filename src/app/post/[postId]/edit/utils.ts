import { FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const postEditSchema = z.object({
  mainCategory: z.string().min(1, '카테고리를 선택해주세요.'),
  subCategory: z.string().min(1, '카테고리를 선택해주세요.'),
  title: z.string().min(1, '제목을 입력해주세요.'),
  isAnonymous: z.boolean(),
  situationContent: z.string().min(1, '상황을 입력해주세요.'),
  failureContent: z.string().min(1, '실패/좌절을 입력해주세요.'),
  learningContent: z.string().min(1, '핵심 배움을 입력해주세요.'),
  nextStepContent: z.string().min(1, '다음 단계를 입력해주세요.'),
  tags: z.array(z.object({ value: z.string() })).optional(),
  postImages: z.array(z.object({ imageUrl: z.string() })).optional(),
});

export type PostEditFormData = z.infer<typeof postEditSchema>;

export const onEditPostInvalid = (errors: FieldErrors<PostEditFormData>) => {
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
