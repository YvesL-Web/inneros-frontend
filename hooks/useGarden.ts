import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
  GardenItem,
  GardenItemT,
  GardenSummaryResponse,
  GardenSummaryResponseT,
} from '@/schemas/garden';

export function useGardenSummary() {
  return useQuery({
    queryKey: ['garden', 'summary'],
    queryFn: async (): Promise<GardenSummaryResponseT> => {
      const data = await api<unknown>('/garden/summary');
      const parsed = GardenSummaryResponse.safeParse(data);
      if (!parsed.success) {
        console.error('Invalid garden summary', parsed.error.flatten());
        throw new Error('INVALID_GARDEN_SUMMARY');
      }
      return parsed.data;
    },
    staleTime: 60_000,
  });
}

export function useGardenItems() {
  return useQuery({
    queryKey: ['garden', 'items'],
    queryFn: async (): Promise<GardenItemT[]> => {
      const data = await api<unknown>('/garden/items');
      if (!Array.isArray(data)) throw new Error('INVALID_GARDEN_ITEMS');
      return data.map((d) => GardenItem.parse(d));
    },
    staleTime: 30_000,
  });
}
