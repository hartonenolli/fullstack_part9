const calculateBMI = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);

  if (bmi < 18.5) {
    return "Underweight range";
  }

  if (bmi < 25) {
    return "Normal range";
  }

  if (bmi < 30) {
  return "Overweight range";
  }

  return "Obese range";
};

console.log(calculateBMI(180, 50));
console.log(calculateBMI(180, 74));
console.log(calculateBMI(180, 85));
console.log(calculateBMI(180, 120));
