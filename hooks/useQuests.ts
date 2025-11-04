import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '@/lib/api';
import { QuestsResponse, QuestsResponseT } from '@/schemas/quest';

export function useQuests() {
  return useQuery({
    queryKey: ['quests'],
    queryFn: async (): Promise<QuestsResponseT> => {
      const data = await api<unknown>('/quests');
      const parsed = QuestsResponse.safeParse(data);
      if (!parsed.success) {
        console.error('Invalid quests payload', parsed.error.flatten());
        throw new Error('INVALID_QUESTS_PAYLOAD');
      }
      return parsed.data;
    },
  });
}

export function useCompleteQuest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (slug: string) =>
      api<{ ok: true; already: boolean }>(`/quests/${encodeURIComponent(slug)}/complete`, {
        method: 'POST',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['quests'] });
      qc.invalidateQueries({ queryKey: queryKeys.progress });
    },
  });
}
