import {IFarm} from '../entities/general';

type THeaders = {
  [key: string]: string;
};

export const ID = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const postRequest = async (
  url: string,
  headers: THeaders,
  data?: object,
) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    // console.log(e.message);
    return;
  }
};

export const filterPoints = (facilities: Array<IFarm>, search: string) => {
  const template: string = Array.from(search.toLowerCase()).reduce(
    (acc, val, i) => `${acc}[^${search.substr(i)}]*?${val === '+' ? '.' : val}`,
    '',
  );
  const reg = RegExp(template);
  if (search.length < 1) {
    return facilities;
  }
  return facilities.filter((facility: IFarm) =>
    facility.name.toLowerCase().match(reg),
  );
};

const getOnlyDate = (date: string): string => date.split(',')[0];
const splitValues = (val: string): string[] => val.split('/');
const reverseValues = (val: string[]): string[] => val.reverse();
const joinValues = (val: string[]): string => val.join('-');
export const getUSADateFormat = (date: string): string =>
  joinValues(reverseValues(splitValues(getOnlyDate(date))));
export const getNetSuiteDateFormat = (date: Date) => 
  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate())