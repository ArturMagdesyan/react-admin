import { useQuery } from 'react-query';
import axios from '../../../app/axios';
import { Technique } from '../types';

export const getTechniques = async (): Promise<Technique[]> => {
  const response = await axios.get<Technique[], Technique[]>('technicians');

  return response;
};

export const useTechniques = () => useQuery(
  ['techniques'],
  getTechniques,
  {
    keepPreviousData: true,
  },
);
