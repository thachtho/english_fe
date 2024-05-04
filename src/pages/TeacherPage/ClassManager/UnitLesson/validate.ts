import { IOptionState } from './ModalAddUnitTolass';

interface IPropsDataAddLesson {
  unitId: number | null;
  lessonId: number | null;
}

export function validateAddUnitLesson(options: IOptionState) {
  const message = {
    studyProgram: '',
    unit: '',
  };
  if (options.studyProgramId === null) {
    message.studyProgram = 'Chương trình học không được bỏ trống!';
  }

  if (options.unitId === null) {
    message.unit = 'Unit không được bỏ trống!';
  }

  return message;
}

export function validateAddLesson(options: IPropsDataAddLesson) {
  const message = {
    lesson: '',
    unit: '',
  };
  if (options.lessonId === null) {
    message.lesson = 'Lesson không được bỏ trống!';
  }

  if (options.unitId === null) {
    message.unit = 'Unit không được bỏ trống!';
  }

  return message;
}
