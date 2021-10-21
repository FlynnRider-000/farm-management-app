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
  last_assess: IAssessmentForm | string;
  status: string;
}
export interface IFarm {
  id: string;
  name: string;
  number: string;
  acc_id: string;
  lines: Array<ILine>;
}

export interface IAssessmentForm {
  type?: string;
  farm_id: string;
  account_id: string;
  blues: string;
  color: string;
  comment: string;
  condition_avg: string;
  condition_max: string;
  condition_min: string;
  condition_score: string;
  date_assessment: string;
  harvest_group_id: string;
  line_id: string;
  planned_date_harvest: string;
  tones: string;
  images: Array<String>;
}

export interface ISeedingForm {
  type?: string;
  name: string;
  planned_date: string;
  planned_date_harvest: string;
  line_length: string;
  seed_id: string;
  drop: string;
  spat_size: string;
  submersion: string;
  spacing: string;
  density: string;
  floats: string;
  account_id: string;
  farm_id: string;
  line_id: string;
}
export interface IHarvestForm {
  type?: string;
  company: string;
  vessel: string;
  harvest_number: string;
  number_of_bags: string;
  tag_color: string;
  port_of_unload: string;
  crop_owner: string;
  farm_id: string;
  line_id: string;
  growing_area: string;
  delivered_to: string;
  packhouse: string;
  start_time: string;
  finish_time: string;
  budgeted_harvest_income_actual: string;
  date: string;
  bags_clean: boolean;
  area_open_for_harvest: boolean;
  trucks_booked: boolean;
  more_clean_bags_on_truck: boolean;
  shell_length: string;
  shell_condition: string;
  mussels: string;
  meat_yield: string;
  blues: string;
  marine_waste: string;
  backbone_ok: boolean;
  backbone_replace: boolean;
  lights_ids_in_place: boolean;
  flotation_on_farm: boolean;
  number_of_rope_bags: string;
  product_left_on_line: string;
  harvestor_name: string;
  signature: string;
  comments: string;
}

export type IFormTypes = IAssessmentForm | ISeedingForm | IHarvestForm;
