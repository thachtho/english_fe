import { checkRequired } from '../../../../untils/validate';

type ExerciseType = {
  name: string;
  currentName: string;
};

function validateBeforeSumitExercise(exercise: ExerciseType) {
  let message = '';

  if (!checkRequired(exercise.name)) {
    message = 'Từ vựng không được để trống!';
  } else if (
    exercise.name.trim().toLowerCase() !==
    exercise?.currentName.trim().toLowerCase()
  ) {
    message = 'Từ nhập vào chưa đúng!';
  }

  return {
    name: message,
  };
}

function getItemRandom(exercise: IExerciseVariable[]) {
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
