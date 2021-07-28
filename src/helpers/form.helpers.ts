import {
  IDebrisForm,
  IFloatForm,
  ISpotterForm,
  IFeedbackForm,
} from '../entities/general';
import * as _ from 'lodash';
import {apiUrl} from '../config/api';

export const editDebrisForm = (
  f: IDebrisForm,
  allCompanies: Array<any>,
  allBays: Array<any>,
) => {
  const newForm = {
    ...f,
    custrecord_mfa_no_hours: Number(f.custrecord_mfa_no_hours),
    custrecord_mfa_no_people: Number(f.custrecord_mfa_no_people),
    custrecord_mfa_company_beach_clean: {
      items: [
        {
          id: allCompanies.find(
            (company) => company.name === f.custrecord_mfa_company_beach_clean,
          )?.net_suite_id,
        },
      ],
    },
    custrecord_mfa_bay: {
      items: [
        {
          id: allBays.find((company) => company.name === f.custrecord_mfa_bay)
            ?.net_suite_id,
        },
      ],
    },
  };
  //@ts-ignore
  delete newForm['Estimated Percentage'];
  //@ts-ignore
  delete newForm['Rope/Ties/Lashings'];
  //@ts-ignore
  delete newForm['Non aquaculture Estimated Percentage'];
  //@ts-ignore
  delete newForm['Plastic bags/bottles'];

  return newForm;
};

export const editFloatForm = (
  f: IFloatForm,
  allCompanies: Array<any>,
  allBays: Array<any>,
  allFloats: Array<any>,
) => {
  const floatIDs = f.custrecord_mfa_float_id_collected.map(id => {
    return allFloats.find((floats) => floats.name === id)?.net_suite_id;
  });
  const newForm = {
    ...f,
    custrecord_mfa_collection_bay: {
      id: allBays.find((bay) => bay.name === f.custrecord_mfa_collection_bay)
        ?.net_suite_id,
    },
    // custrecord_mfa_vessel_collection_time: Number(f.custrecord_mfa_vessel_collection_time),
    custrecord_mfa_no_floats_collected: f.custrecord_mfa_no_floats_collected.map(no => 
      Number(no),
    ),
    custrecord_mfa_float_id_collected: floatIDs,
    custrecord_mfa_collection_company: {
      id: allCompanies.find(
        (company) => company.name === f.custrecord_mfa_collection_company,
      )?.net_suite_id,
    }
  };
  return newForm;
}

export const editSpotterFloatForm = (f: ISpotterForm) => {
  const newForm = {
    ...f,
    custrecord_mfa_fs_approx_no_floats: parseInt(f.custrecord_mfa_fs_approx_no_floats),
    custrecord_mfa_fs_method_of_contact: {
      id: parseInt(f.custrecord_mfa_fs_method_of_contact),
    },
  };
  return newForm;
}

export const editFeedbackForm = (f: IFeedbackForm) => {
  
  let newForm = {
    ...f,
    custrecord_mfa_feedback_location: f.custrecord_mfa_feedback_location ? {
      id: parseInt(f.custrecord_mfa_feedback_location),
    } : '',
    custrecord_mfa_feedback_type: f.custrecord_mfa_feedback_type ? {
      id: parseInt(f.custrecord_mfa_feedback_type),
    } : '',
    custrecord_mfa_preferred_contact: f.custrecord_mfa_preferred_contact ? {
      id: parseInt(f.custrecord_mfa_preferred_contact),
    } : '',
  };
  return newForm;
}

export const editComplianceForm = (f: any) =>
  Object.keys(f).reduce((acc, current) => {
    if (f[current].netsuite === 'custrecord_mfa_vessel_name_audit') {
      return {
        ...acc,
        custrecord_mfa_vessel_name_audit: String(f[current].data.net_suite_id),
      };
    }
    if (f[current].netsuite === 'custrecord_mfa_audit_farm') {
      return {
        ...acc,
        custrecord_mfa_audit_farm: String(f[current].data.net_suite_id),
      };
    }
    if (f[current].netsuite === 'custrecord_mfa_audit_company') {
      return {
        ...acc,
        custrecord_mfa_audit_company: String(f[current].data.net_suite_id),
      };
    }
    return {
      ...acc,
      [f[current].netsuite]: f[current].text,
    };
  }, {});

export const getUrlAddress = (form: any): string => {
  if (form.custrecord_mfa_audit_farm) {
    return apiUrl + '/api/v1/farms/store';
  }
  else if (form.custrecord_mfa_vessel_name_audit) {
    return apiUrl + '/api/v1/vessels/store';
  }
  else if (form.custrecord_mfa_collection_bay) {
    return apiUrl + '/api/v1/floats/store';
  }
  else if (form.custrecord_mfa_fs_method_of_contact) {
    return apiUrl + '/api/v1/spotters/store';
  }
  else if (form.custrecord_mfa_feedback_date) {
    return apiUrl + '/api/v1/feedbacks/store';
  }
  return apiUrl + '/api/v1/forms/store';
};

const removeEmptyObjects = (obj: any): object =>
  Object.keys(obj)
    .filter((k) => !_.isEqual(obj[k], {}))
    .reduce((newObj, k) => {
      return {
        ...newObj,
        [k]: obj[k],
      };
    }, {});

const removeEmptyStrings = (obj: any): object =>
  Object.keys(obj)
    .filter((k) => obj[k] !== null && obj[k] !== undefined && obj[k] !== '')
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object'
          ? Object.assign(newObj, {[k]: removeEmptyStrings(obj[k])})
          : Object.assign(newObj, {[k]: obj[k]}),
      {},
    );

const removeUnusedEntities = _.flowRight(
  removeEmptyObjects,
  removeEmptyStrings,
);

export const editSendingChecklistForm = (f: any) => {
  Object.keys(f).map(function(key, index) {
    if (f[key] === '' && key !== 'custrecord_mfa_info_cut_ties' && key !== 'custrecord_mfa_comments')
      f[key] = '1';
  });
  const newObj = {
    ...f,
    custrecord_mfa_farm_id: {
      id: f.custrecord_mfa_farm_id,
    },
    custrecord_mfa_cut_ties: {
      id: f.custrecord_mfa_cut_ties,
    },
    custrecord_mfa_floats_correct: {
      id: f.custrecord_mfa_floats_correct,
    },
    custrecord_mfa_audit_farm: {
      id: f.custrecord_mfa_audit_farm,
    },
  };
  return removeUnusedEntities(newObj);
};

export const editSendingComplianceForm = (f: any) => {
  Object.keys(f).map(function(key, index) {
    if (f[key] === '' && key !== 'custrecord_mfa_vessel_audit_notes')
      f[key] = '1';
  });
  
  const newObj = {
    ...f,
    custrecord_mfa_rubbish_bins_avail: {
      id: f.custrecord_mfa_rubbish_bins_avail,
    },
    custrecord_mfa_bins_emptied: {
      id: f.custrecord_mfa_bins_emptied,
    },
    custrecord_mfa_retrieval_nets: {
      id: f.custrecord_mfa_retrieval_nets,
    },
    custrecord_mfa_env_signs: {
      id: f.custrecord_mfa_env_signs,
    },
    custrecord_mfa_crew_aware: {
      id: f.custrecord_mfa_crew_aware,
    },
    custrecord_mfa_visual_vessel: {
      id: f.custrecord_mfa_visual_vessel,
    },
    custrecord_mfa_vessel_pack_avail: {
      id: f.custrecord_mfa_vessel_pack_avail,
    },
    custrecord_mfa_vessel_name_audit: {
      id: f.custrecord_mfa_vessel_name_audit,
    },
    custrecord_mfa_audit_company: {
      id: f.custrecord_mfa_audit_company,
    },
    custrecord_mfa_result: {
      id: f.custrecord_mfa_result,
    }
  };

  return removeUnusedEntities(newObj);
};
