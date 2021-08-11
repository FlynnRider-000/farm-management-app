import {IFormTypes} from '../../entities/general';

import * as _ from 'lodash';

export const changeFormStatus = (
  pendingForms: Array<IFormTypes>,
  form: IFormTypes,
): Array<IFormTypes> => {
  //@ts-ignore
  return pendingForms.filter((f) => {
    return !_.isEqual(f, form);
  });
};
