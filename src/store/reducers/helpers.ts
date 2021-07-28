import {IList} from '../../entities/form.entities';
import * as _ from 'lodash';

export const changeFormStatus = (
  pendingForms: Array<IList>,
  form: IList | string,
): Array<IList> => {
  //@ts-ignore
  return pendingForms.filter((f) => {
    return !_.isEqual(f, form);
  });
};

export const removeForms = (
  allForms: Array<IList>,
  pendingForms: Array<IList>,
) => {
  const date = new Date().toLocaleString().split(',')[0];
  const pending = allForms.filter(
    (form) =>
      pendingForms.findIndex((f) => _.isEqual(f, form)) !== -1 &&
      String(form.date).split(',')[0] !== date,
  );
  const today = allForms.filter(
    (form) => String(form.date).split(',')[0] === date,
  );
  return [...pending, ...today];
};
