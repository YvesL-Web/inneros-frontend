import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { WeeklySummaryResponse, WeeklySummaryResponseT } from '@/schemas/summary';

export function useWeeklySummary() {
  return useQuery({
    queryKey: ['weekly-summary'],
    queryFn: async (): Promise<WeeklySummaryResponseT> => {
      const data = await api<unknown>('/summary/weekly');
      const parsed = WeeklySummaryResponse.safeParse(data);
      if (!parsed.success) {
        console.error('Invalid weekly summary payload', parsed.error.flatten());
        throw new Error('INVALID_WEEKLY_SUMMARY_PAYLOAD');
      }
      return parsed.data;
    },
    staleTime: 60_000,
  });
}
