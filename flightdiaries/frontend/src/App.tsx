import { useState, useEffect } from 'react';
import type { DiaryEntry, NewDiaryEntry } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: 'sunny',
    visibility: 'great',
    comment: ''
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await diaryService.getAllDiaries();
        setDiaries(response);
      } catch (error) {
        console.error('Error fetching diaries:', error);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Failed to fetch diary entries.');
        }
      }
    };

    fetchDiaries();
  }, []);
  
  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const addedDiary = await diaryService.addDiary(newDiary);
      setDiaries([...diaries, addedDiary]);
      setNewDiary({
        date: newDiary.date,
        weather: newDiary.weather,
        visibility: newDiary.visibility,
        comment: newDiary.comment
      });
      setErrorMessage(null);
    }catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Error: " + error.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={diaryCreation}>
      <div>
        <label>Date:</label>
        <input
          type="text"
          value={newDiary.date}
          onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Weather:</label>
        <input
          type="text"
          value={newDiary.weather}
          onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as NewDiaryEntry['weather'] })}
          required
        />
      </div>
      <div>
        <label>Visibility:</label>
        <input
          type="text"
          value={newDiary.visibility}
          onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as NewDiaryEntry['visibility'] })}
          required
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={newDiary.comment}
          onChange={(e) => setNewDiary({ ...newDiary, comment: e.target.value })}
        />
      </div>
      <button type="submit">Add Diary Entry</button>
    </form>
      <h2>Diary Entries</h2>
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

