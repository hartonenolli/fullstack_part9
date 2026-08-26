import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry, ErrorResponse } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const addDiary = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error) && error.response) {
      const validationError = error.response.data.error[0];

      if (validationError.path[0] === 'date') {
        throw new Error(`Incorrect date: ${newDiary.date}`);
      }

      if (validationError.path[0] === 'weather') {
        throw new Error(`Incorrect weather: ${newDiary.weather}`);
      }

      if (validationError.path[0] === 'visibility') {
        throw new Error(`Incorrect visibility: ${newDiary.visibility}`);
      }

      throw new Error(validationError.message);
    } else {
      throw new Error('An unexpected error occurred while adding a diary entry.');
    }
  }
};

export default { getAllDiaries, addDiary };