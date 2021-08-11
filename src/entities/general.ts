import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../navigation/navigation';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';

export type MainScreenNavigationProp = StackNavigationProp<MainStackParamList>;
export type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

export interface IUtil {
  id: string;
  name: string;
  type: string;
  account_id: string;
}

export interface ILine {
  id: string;
  line_name: string;
  harvest_id: string;
}
export interface IFarm {
  id: string;
  name: string;
  number: string;
  acc_id: string;
  lines: Array<ILine>;
}

export interface IAssessmentForm {
  type?: string,
  farm_id: string,
  account_id: string,
  blues: string,
  color: string,
  comment: string,
  condition_average: string,
  condition_max: string,
  condition_min: string,
  condition_score: string,
  date_assessment: string,
  harvest_group_id: string,
  line_id: string,
  planned_date_harvest: string,
  tones: string,
}

export type IFormTypes =
  | IAssessmentForm;
