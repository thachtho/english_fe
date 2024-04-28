import { checkRequired } from '../../../../untils/validate';

function validateVariable(variable: IVariable) {
  return {
    name: !checkRequired(variable.name) ? 'Từ vựng không được để trống!' : '',
    vi: !checkRequired(variable.vi) ? 'Nghĩa không được để trống' : '',
  };
}

export { validateVariable };
