import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '@/lib/api';
import { ActivityItem, ActivityItemT } from '@/schemas/activity';
import { ProgressResponseT } from '@/schemas/progress';
import toast from 'react-hot-toast';

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
      return api<{ activity: ActivityItemT; progress: ProgressResponseT }>('/activities', {
        method: 'POST',
        body: JSON.stringify(input),
      });
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['activities'] });
      qc.invalidateQueries({ queryKey: queryKeys.progress });
      qc.invalidateQueries({ queryKey: ['quests'] });
      toast.success(
        `+${res.progress.xp} XP total • ${
          res.activity.type === 'journal_entry' ? 'Journal' : 'Méditation'
        } ajouté`
      );
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : 'Action impossible';
      toast.error(msg);
    },
  });
}
