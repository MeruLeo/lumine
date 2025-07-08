type BMI = {
  w: number;
  h: number;
};

export const CalcBMI = ({ w, h }: BMI) => {
  const convertCM_To_M = h / 100;
  const calculatingBMI = w / (convertCM_To_M * convertCM_To_M);

  const round2 = calculatingBMI.toFixed(2);

  return round2;
};
