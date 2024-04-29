import { checkRequired } from '../../../../../untils/validate';

function validateLesson(variable: ILesson) {
  return {
    name: !checkRequired(variable.name)
      ? 'Tên Lesson không được để trống!'
      : '',
  };
}

export { validateLesson };
