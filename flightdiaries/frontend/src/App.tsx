import axios from 'axios';
import { useState, useEffect } from 'react';

interface DiaryEntry {
  id: number;
  date: string;
  weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
  visibility: 'great' | 'good' | 'ok' | 'poor';
  comment: string;
}

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries');
        setDiaries(response.data);
      } catch (error) {
        console.error('Error fetching diaries:', error);
    }
  };

    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      <ul>
        {diaries.map(diary => (
          <li key={diary.id}>
            {diary.date} - {diary.weather} - {diary.visibility}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
