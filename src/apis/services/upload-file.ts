import { api } from '../axios';
import { API_PATH } from '../path';

export interface UploadFilePayload {
  file: File;
}

export async function uploadFile(file: File) {
  const { data } = await api.post(
    API_PATH.uploadFile,
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
}
