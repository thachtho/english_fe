import { checkRequired } from '../../../../../untils/validate';

function validateUnit(variable: IUnit) {
  return {
    name: !checkRequired(variable.name) ? 'Tên unit không được để trống!' : '',
  };
}

export { validateUnit };
