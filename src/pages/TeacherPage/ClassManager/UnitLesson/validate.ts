import { IOptionState } from './ModalAddUnitTolass';

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
