interface ExerciseValues {
  target: number;
  daily_exercises: number[];
}

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (exerciseValues: ExerciseValues): ExerciseResult => {
  const { target, daily_exercises } = exerciseValues;

  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter(day => day > 0).length;
  const average = daily_exercises.reduce((sum, day) => sum + day, 0) / periodLength;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average < target * 0.5) {
    rating = 1;
    ratingDescription = "Bad job! You need to work harder!";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "Not too bad but could be better.";
  } else {
    rating = 3;
    ratingDescription = "Good job! You've met your target.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

console.log(calculateExercises({ target: 2, daily_exercises: [0, 1, 2, 3, 4, 5, 6] }));
console.log(calculateExercises({target: 3, daily_exercises: [0,0,0,0,1,0,0.5]}));
console.log(calculateExercises({target: 1, daily_exercises: [0,3,0,0,1,0,0.5]}));
