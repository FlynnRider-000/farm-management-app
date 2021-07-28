import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList} from '../navigation/navigation';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';

export type MainScreenNavigationProp = StackNavigationProp<MainStackParamList>;
export type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

export interface GeneralFormType {
  'Vessel Name'?: {
    netsuite: string;
    text: string;
    data: object;
  };
  'Audit Company'?: {
    netsuite: string;
    text: string;
    data: object;
  };
  'Rubbish bins'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Bins emptied'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Retrieval nets'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Environmental signs displayed'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Crew aware of programme'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Visual of debris in bins'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Vessel pack available for understood'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  Notes?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Cut ties - line # & how many per line'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Cut ties on backbone'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Floats tied correctly'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Black & Orange floats only?'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Any other colour floats'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Farm I.D. visible'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Farm (Site Number / I.D.)'?: {
    netsuite: string;
    text: string;
    data: object;
  };
  'Audit Result'?: {
    netsuite: string;
    text: string;
    type: string;
  };
  'Click to choose Bay *'?: {
    netsuite: string;
    text: string;
    type: string;
  };
}

export interface IDebrisForm {
  custrecord_mfa_no_people: string;
  name: string;
  custrecord_mfa_total_time: string;
  custrecord_mfa_no_hours: string;
  custrecord_mfa_vessel_time: string;
  'Estimated Percentage': string;
  custrecord_mfa_total_aq_debris: string;
  'Rope/Ties/Lashings': string;
  custrecord_mfa_no_floats: string;
  custrecord_mfa_rope_found: Array<number>;
  custrecord_mfa_id_on_float: string;
  'Non aquaculture Estimated Percentage': string;
  custrecord_mfa_total_other_debris: string;
  'Plastic bags/bottles': string;
  custrecord_mfa_most_interestin_find: string;
  custrecord_mfa_debris_comment: string;
  custrecord_mfa_company_beach_clean: string;
  custrecord_mfa_contact_number: string;
  custrecord_mfa_bay: string;
  custrecord_mfa_vessel_audit_date: string;
}

export interface IFloatForm {
  custrecord_mfa_collection_bay: string;
  // custrecord_mfa_vessel_collection_time: string;
  custrecord_mfa_no_floats_collected: Array<string>;
  custrecord_mfa_float_id_collected: Array<string>;
  custrecord_mfa_floats_delivered_to: string;
  custrecord_mfa_float_collection_comments: string;
  custrecord_mfa_collection_company: string;
  custrecord_mfa_contact_detail: string;
  custrecord_collection_date: string;
  name: string;
}

export interface ISpotterForm {
  name: string;
  custrecord_mfa_fs_email: string;
  custrecord_mfa_fs_phone: string;
  custrecord_mfa_fs_method_of_contact: string;
  custrecord_mfa_fs_approx_no_floats: string;
  custrecord_mfa_fs_location_of_floats: string;
  custrecord_mfa_fs_float_id: string;
  custrecord_mfa_fs_extra_info: string;
}

export interface IFeedbackForm {
  custrecord_mfa_feedback_date: string;
  name: string;
  custrecord_mfa_contact_email: string;
  custrecord_mfa_contact_phone: string;
  custrecord_mfa_preferred_contact: string;
  custrecord_mfa_feedback_type: string;
  custrecord_mfa_feedback_location: string;
  custrecord_mfa_extra_location_details: string;
  custrecord_mfa_extra_info_feedback: string;
}

export interface IFarm {
  id: number;
  net_suite_id: number;
  name: string;
  isInactive: number;
  created_at?: string;
  updated_at?: string;
  content?: string | undefined;
}
