import moment from 'moment';
import {apiUrl} from '../config/api';

export const getFormUrl = () => {
  return apiUrl + 'api/farm/sync-data-from-app';
};

export const validationForZeroMinus = (value: string | number): string => {
  const newValue = value.toString().split('');
  const validValue = newValue
    .filter((word, i) => {
      if (i === 0) {
        return Number(word) !== 0;
      }

      return word;
    })
    .filter(word => word !== '-')
    .join('');

  return validValue;
};

export const validationForMinus = (value: string | number): string => {
  const newValue = value.toString().split('');
  const validValue = newValue
    .filter((word, i) => {
      if (i === 0 && word === '0') return !(newValue.length - 1);
      return word;
    })
    .filter(word => word !== '-')
    .join('');

  return validValue;
};

export const toggleSecondMillisecond = (date: string | number): number => {
  if (date) {
    if (date.toString().length === 10) {
      const millisecond = (Number(date) * 1000).toFixed();
      return Number(millisecond);
    }

    if (date.toString().length === 13) {
      const second = (Number(date) / 1000).toFixed();
      return Number(second);
    }
  }

  return moment().toDate().getTime();
};
