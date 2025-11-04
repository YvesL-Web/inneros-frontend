import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '@/lib/api';
import { ActivityItem, ActivityItemT } from '@/schemas/activity';
import { ProgressResponseT } from '@/schemas/progress';

export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: async (): Promise<ActivityItemT[]> => {
      const data = await api<unknown>('/activities');
      const arr = Array.isArray(data) ? data : [];
      return arr.map((x) => ActivityItem.parse(x));
    },
  });
}

export function useCreateActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      type: 'journal_entry' | 'meditation';
      meta?: Record<string, unknown>;
    }) => {
      const res = await api<{ activity: ActivityItemT; progress: ProgressResponseT }>(
        '/activities',
        {
          method: 'POST',
          body: JSON.stringify(input),
        }
      );
      return res;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['activities'] });
      qc.invalidateQueries({ queryKey: queryKeys.progress });
    },
  });
}
