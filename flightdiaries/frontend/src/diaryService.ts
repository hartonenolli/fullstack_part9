import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const addDiary = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;
};

export default { getAllDiaries, addDiary };