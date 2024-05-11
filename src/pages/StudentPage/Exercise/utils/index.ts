import { checkRequired } from '../../../../untils/validate';

type ExerciseType = {
  name: string;
};

function validateBeforeSumitExercise(exercise: ExerciseType) {
  return {
    name: !checkRequired(exercise.name) ? 'Từ vựng không được để trống!' : '',
  };
}

function getItemRandom(exercise: IExerciseVariables[]) {
  const filteredArray = exercise.filter((item) => item.count < 10);

  // Sau đó, nếu mảng lọc không rỗng, chọn ngẫu nhiên một phần tử từ mảng đó
  let randomElement = null;
  if (filteredArray.length > 0) {
    randomElement =
      filteredArray[Math.floor(Math.random() * filteredArray.length)];
  }

  return randomElement;
}
export { validateBeforeSumitExercise, getItemRandom };
