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

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const daily_exercises = args.slice(3).map(Number);

  if (isNaN(target) || daily_exercises.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    target,
    daily_exercises
  };
};

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

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, daily_exercises } = parseExerciseArguments(process.argv);
    console.log(calculateExercises({ target, daily_exercises }));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

