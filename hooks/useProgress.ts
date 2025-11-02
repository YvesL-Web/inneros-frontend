import { useQuery } from '@tanstack/react-query';
import { api, queryKeys } from '@/lib/api';
import { ProgressResponse, type ProgressResponseT } from '@/lib/progress';

export function useProgress() {
  return useQuery({
    queryKey: queryKeys.progress,
    queryFn: async (): Promise<ProgressResponseT> => {
      const data = await api<unknown>('/progress');
      const parsed = ProgressResponse.safeParse(data);
      if (!parsed.success) {
        throw new Error('INVALID_PROGRESS_PAYLOAD');
      }
      return parsed.data;
    },
  });
}
