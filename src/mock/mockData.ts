import {
  GeneralFormType,
  IDebrisForm,
  IFloatForm,
  ISpotterForm,
  IFeedbackForm,
} from '../entities/general';

export const compliantForm: GeneralFormType = {
  'Vessel Name': {
    netsuite: 'custrecord_mfa_vessel_name_audit',
    text: '',
    data: {},
  },
  'Audit Company': {
    netsuite: 'custrecord_mfa_audit_company',
    text: '',
    data: {},
  },
  'Rubbish bins': {
    netsuite: 'custrecord_mfa_rubbish_bins_avail',
    text: '',
    type: 'select-beans',
  },
  'Bins emptied': {
    netsuite: 'custrecord_mfa_bins_emptied',
    text: '',
    type: 'select-empty',
  },
  'Retrieval nets': {
    netsuite: 'custrecord_mfa_retrieval_nets',
    text: '',
    type: 'select-nets',
  },
  'Environmental signs displayed': {
    netsuite: 'custrecord_mfa_env_signs',
    text: '',
    type: 'select',
  },
  'Crew aware of programme': {
    netsuite: 'custrecord_mfa_crew_aware',
    text: '',
    type: 'select',
  },
  'Visual of debris in bins': {
    netsuite: 'custrecord_mfa_visual_vessel',
    text: '',
    type: 'select',
  },
  'Vessel pack available for understood': {
    netsuite: 'custrecord_mfa_vessel_pack_avail',
    text: '',
    type: 'select',
  },
  Notes: {
    netsuite: 'custrecord_mfa_vessel_audit_notes',
    text: '',
    type: 'area',
  },
  'Audit Result': {
    netsuite: 'custrecord_mfa_result',
    text: '',
    type: 'select-audit-result',
  },
};

export const checklist: GeneralFormType = {
  'Cut ties - line # & how many per line': {
    netsuite: 'custrecord_mfa_info_cut_ties',
    text: '',
    type: 'area',
  },
  'Cut ties on backbone': {
    netsuite: 'custrecord_mfa_cut_ties',
    text: '',
    type: 'select',
  },
  'Floats tied correctly': {
    netsuite: 'custrecord_mfa_floats_correct',
    text: '',
    type: 'select',
  },
  'Black & Orange floats only?': {
    netsuite: 'custrecord_mfa_float_colour',
    text: '',
    type: 'select',
  },
  'Farm I.D. visible': {
    netsuite: 'custrecord_mfa_farm_id',
    text: '',
    type: 'select',
  },
  'Farm (Site Number / I.D.)': {
    netsuite: 'custrecord_mfa_audit_farm',
    text: '',
    data: {},
  },
  Notes: {
    netsuite: 'custrecord_mfa_comments',
    text: '',
    type: 'area',
  },
  'Audit Result': {
    netsuite: 'custrecord_mfa_farm_audit_result',
    text: '',
    type: 'select-audit-result',
  },
};

export const floatCollection: IFloatForm = {
  custrecord_mfa_collection_bay: '',
  // custrecord_mfa_vessel_collection_time: '',
  custrecord_mfa_no_floats_collected: [],
  custrecord_mfa_float_id_collected: [],
  custrecord_mfa_floats_delivered_to: '',
  custrecord_mfa_float_collection_comments: '',
  custrecord_mfa_collection_company: '',
  custrecord_mfa_contact_detail: '',
  custrecord_collection_date: '',
  name: '',
};

export const spotterForm: ISpotterForm = {
  name: '',
  custrecord_mfa_fs_email: '',
  custrecord_mfa_fs_phone: '',
  custrecord_mfa_fs_method_of_contact: '1',
  custrecord_mfa_fs_approx_no_floats: '',
  custrecord_mfa_fs_location_of_floats: '',
  custrecord_mfa_fs_float_id: '',
  custrecord_mfa_fs_extra_info: '',
};

export const feedbackForm: IFeedbackForm = {
  custrecord_mfa_feedback_date: '',
  name: '',
  custrecord_mfa_contact_email: '',
  custrecord_mfa_contact_phone: '',
  custrecord_mfa_preferred_contact: '',
  custrecord_mfa_feedback_type: '',
  custrecord_mfa_feedback_location: '',
  custrecord_mfa_extra_location_details: '',
  custrecord_mfa_extra_info_feedback: '',
};

export const debris: IDebrisForm = {
  custrecord_mfa_no_people: '',
  name: '',
  custrecord_mfa_total_time: '',
  custrecord_mfa_no_hours: '',
  custrecord_mfa_vessel_time: '',
  'Estimated Percentage': '',
  custrecord_mfa_total_aq_debris: '',
  'Rope/Ties/Lashings': '',
  custrecord_mfa_no_floats: '',
  custrecord_mfa_rope_found: [],
  custrecord_mfa_id_on_float: '',
  'Non aquaculture Estimated Percentage': '',
  custrecord_mfa_total_other_debris: '',
  'Plastic bags/bottles': '',
  custrecord_mfa_most_interestin_find: '',
  custrecord_mfa_debris_comment: '',
  custrecord_mfa_company_beach_clean: '',
  custrecord_mfa_contact_number: '',
  custrecord_mfa_bay: '',
  custrecord_mfa_vessel_audit_date: '',
};

export const BAYS = [
  {
    name: 'Admiralty Bay_PS',
    net_suite_id: 654,
  },
  {
    name: 'Anakoha Bay_PS~',
    net_suite_id: 655,
  },
  {
    name: 'Beatrix Bay_PS',
    net_suite_id: 656,
  },
  {
    name: 'Boulder Bank_TB',
    net_suite_id: 757,
  },
  {
    name: 'Brightlands Bay_PS*',
    net_suite_id: 648,
  },
  {
    name: 'Bulwer - Waihinau Bay_PS',
    net_suite_id: 657,
  },
  {
    name: 'Cable Bay_TB',
    net_suite_id: 758,
  },
  {
    name: 'Camel Point_PS',
    net_suite_id: 658,
  },
  {
    name: 'Camp Bay_PS',
    net_suite_id: 659,
  },
  {
    name: 'Canoe Bay_PS',
    net_suite_id: 660,
  },
  {
    name: 'Catherine Cove_PS',
    net_suite_id: 661,
  },
  {
    name: 'Cherry Tree Bay_PS',
    net_suite_id: 662,
  },
  {
    name: 'Clay Point_QCS',
    net_suite_id: 622,
  },
  {
    name: 'Clova Bay, Manaroa Beach_PS*',
    net_suite_id: 808,
  },
  {
    name: 'Clova Bay_PS*',
    net_suite_id: 649,
  },
  {
    name: 'Collingwood Wharf_GB',
    net_suite_id: 743,
  },
  {
    name: 'Crail Bay (not hot spots)_PS',
    net_suite_id: 663,
  },
  {
    name: 'Croisilles Harbour Other_CH',
    net_suite_id: 739,
  },
  {
    name: 'Cutters Bay _PU*',
    net_suite_id: 604,
  },
  {
    name: 'Deep Bay_PS',
    net_suite_id: 664,
  },
  {
    name: 'Deep Bright_PU',
    net_suite_id: 605,
  },
  {
    name: 'Double Bay_KS',
    net_suite_id: 635,
  },
  {
    name: 'Durville Island Other_PS',
    net_suite_id: 665,
  },
  {
    name: 'East Bay Other_QCS',
    net_suite_id: 628,
  },
  {
    name: 'Elaine Bay_PS',
    net_suite_id: 666,
  },
  {
    name: 'Elie Bay _PS*',
    net_suite_id: 650,
  },
  {
    name: 'Elsie Bay_PS',
    net_suite_id: 667,
  },
  {
    name: 'Fairy Bay_PS',
    net_suite_id: 668,
  },
  {
    name: 'Farewell Spit_GB',
    net_suite_id: 744,
  },
  {
    name: 'Fish Bay_KS',
    net_suite_id: 641,
  },
  {
    name: 'Fishing Bay_PS',
    net_suite_id: 669,
  },
  {
    name: 'Fitzroy Bay_PS',
    net_suite_id: 670,
  },
  {
    name: 'Forsyth Bay _PS',
    net_suite_id: 671,
  },
  {
    name: 'Four Fathom Bay_PS',
    net_suite_id: 672,
  },
  {
    name: 'French Pass_PS',
    net_suite_id: 673,
  },
  {
    name: 'Garden Bay_PS',
    net_suite_id: 674,
  },
  {
    name: 'Garnes Bay_PS',
    net_suite_id: 675,
  },
  {
    name: 'Golden Bay Other_GB',
    net_suite_id: 745,
  },
  {
    name: 'Goulter Bay _KS~',
    net_suite_id: 642,
  },
  {
    name: 'Grant Bay_PS',
    net_suite_id: 676,
  },
  {
    name: 'Hakana Bay _PU*',
    net_suite_id: 606,
  },
  {
    name: 'Hallam Cove_PS',
    net_suite_id: 677,
  },
  {
    name: 'Hamilton Bay_PS',
    net_suite_id: 678,
  },
  {
    name: 'Hamilton Cove_PS',
    net_suite_id: 679,
  },
  {
    name: 'Havelock Marina_PS',
    net_suite_id: 680,
  },
  {
    name: 'Hikapu Reach_PS',
    net_suite_id: 681,
  },
  {
    name: 'Hikoekoea Bay_PS',
    net_suite_id: 682,
  },
  {
    name: 'Hitaua Bay_QCS',
    net_suite_id: 629,
  },
  {
    name: 'Homewood Bay_PS',
    net_suite_id: 683,
  },
  {
    name: 'Horseshoe Bay _PS*',
    net_suite_id: 651,
  },
  {
    name: 'Island Bay (Huritini)_PS',
    net_suite_id: 684,
  },
  {
    name: 'Jackett Island_TB',
    net_suite_id: 759,
  },
  {
    name: 'Jerdans Bay _PU*',
    net_suite_id: 607,
  },
  {
    name: 'Kaikoura Bay _PU*',
    net_suite_id: 608,
  },
  {
    name: 'Kaiuma Bay_PS',
    net_suite_id: 729,
  },
  {
    name: 'Kanae Bay_PU*',
    net_suite_id: 609,
  },
  {
    name: 'Kauauroa Bay_PS',
    net_suite_id: 685,
  },
  {
    name: 'Kenepuru Sound Entrance (North)_KS',
    net_suite_id: 638,
  },
  {
    name: 'Kenepuru Sound Entrance (South)_KS',
    net_suite_id: 636,
  },
  {
    name: 'Kenepuru Sound Other_KS',
    net_suite_id: 637,
  },
  {
    name: 'Ketu Bay_PS',
    net_suite_id: 686,
  },
  {
    name: 'Kingfish Bay_PU',
    net_suite_id: 614,
  },
  {
    name: 'Kokowhai Bay (Turners Bay)_PS',
    net_suite_id: 687,
  },
  {
    name: 'Laverique Bay_PS',
    net_suite_id: 688,
  },
  {
    name: 'Ligar Bay_GB',
    net_suite_id: 746,
  },
  {
    name: 'Mahau Sound Other_PS',
    net_suite_id: 730,
  },
  {
    name: 'Maori Bay_PS',
    net_suite_id: 689,
  },
  {
    name: 'Marys Bay_PS',
    net_suite_id: 691,
  },
  {
    name: 'Matarau Point (Gravel/Boulder Bank) _CH*',
    net_suite_id: 737,
  },
  {
    name: 'Maud Island_PS',
    net_suite_id: 690,
  },
  {
    name: 'McLaren bay_CH',
    net_suite_id: 734,
  },
  {
    name: 'Melville Cove_PS',
    net_suite_id: 692,
  },
  {
    name: 'Mills Bay_KS',
    net_suite_id: 643,
  },
  {
    name: 'Milnthorpe Wharf_GB',
    net_suite_id: 747,
  },
  {
    name: 'Mokopeke Bay_QCS',
    net_suite_id: 630,
  },
  {
    name: 'Motupipi River_GB',
    net_suite_id: 748,
  },
  {
    name: 'Moutere Bluff_TB',
    net_suite_id: 760,
  },
  {
    name: 'Ngamahau Bay_QCS',
    net_suite_id: 623,
  },
  {
    name: 'Ngaruru Bay_QCS',
    net_suite_id: 619,
  },
  {
    name: 'Nikau Bay_PS',
    net_suite_id: 693,
  },
  {
    name: 'Nydia Bay_PS',
    net_suite_id: 694,
  },
  {
    name: 'Okiwi Bay Foreshore _CH*',
    net_suite_id: 733,
  },
  {
    name: 'Okuri bay_PS',
    net_suite_id: 695,
  },
  {
    name: 'Old Homewood Bay_PS',
    net_suite_id: 696,
  },
  {
    name: 'Onauku Bay_QCS',
    net_suite_id: 621,
  },
  {
    name: 'Opihi Bay_PU',
    net_suite_id: 615,
  },
  {
    name: 'Orchard Bay_PS',
    net_suite_id: 697,
  },
  {
    name: 'Otanerau Bay_QCS',
    net_suite_id: 624,
  },
  {
    name: 'Otarawao Bay _CH*',
    net_suite_id: 738,
  },
  {
    name: 'Otatara Bay_PS',
    net_suite_id: 698,
  },
  {
    name: 'Oyster Bay_CH',
    net_suite_id: 740,
  },
  {
    name: 'Oyster Bay_QCS',
    net_suite_id: 620,
  },
  {
    name: 'Pakawau_GB',
    net_suite_id: 749,
  },
  {
    name: 'Papakaraka Bay_QCS',
    net_suite_id: 631,
  },
  {
    name: 'Parapara_GB',
    net_suite_id: 750,
  },
  {
    name: 'Pelorus Sound Other_PS',
    net_suite_id: 699,
  },
  {
    name: 'Picnic Bay_PS',
    net_suite_id: 700,
  },
  {
    name: 'Pigeon Bay_PS',
    net_suite_id: 701,
  },
  {
    name: 'Pigyard Bay_KS',
    net_suite_id: 644,
  },
  {
    name: 'Pipi Bay _PU*',
    net_suite_id: 610,
  },
  {
    name: 'Pipitea Bay_PS',
    net_suite_id: 702,
  },
  {
    name: 'Piripaua - The Neck_PS',
    net_suite_id: 703,
  },
  {
    name: 'Pohara Beach_GB',
    net_suite_id: 751,
  },
  {
    name: 'Port Gore_PS',
    net_suite_id: 704,
  },
  {
    name: 'Port Ligar_PS',
    net_suite_id: 705,
  },
  {
    name: 'Port Motueka_TB',
    net_suite_id: 761,
  },
  {
    name: 'Port Underwood Other_PU',
    net_suite_id: 616,
  },
  {
    name: 'Queen Charlotte Sound Other_QCS',
    net_suite_id: 632,
  },
  {
    name: 'Rabbit Island_TB',
    net_suite_id: 762,
  },
  {
    name: 'Rams Head_PS',
    net_suite_id: 706,
  },
  {
    name: 'Rangihaeata Head_GB',
    net_suite_id: 752,
  },
  {
    name: 'Rerekarua Bay_PS',
    net_suite_id: 707,
  },
  {
    name: 'Richmond Bay_PS',
    net_suite_id: 708,
  },
  {
    name: 'Riwaka_TB',
    net_suite_id: 763,
  },
  {
    name: 'Ruakaka Bay_QCS',
    net_suite_id: 625,
  },
  {
    name: 'Samson Bay_CH',
    net_suite_id: 735,
  },
  {
    name: 'Savill Bay_PS',
    net_suite_id: 709,
  },
  {
    name: 'Schnapper Point_KS',
    net_suite_id: 645,
  },
  {
    name: 'Scotts Bay_KS',
    net_suite_id: 646,
  },
  {
    name: 'Separation Point_GB',
    net_suite_id: 753,
  },
  {
    name: 'Sheep Pen Bay_PS*',
    net_suite_id: 710,
  },
  {
    name: 'Sheep Point_PS',
    net_suite_id: 711,
  },
  {
    name: 'Skiddaw Bay_KS',
    net_suite_id: 647,
  },
  {
    name: 'South East Bay_PS',
    net_suite_id: 712,
  },
  {
    name: 'Squally Cove_CH',
    net_suite_id: 741,
  },
  {
    name: 'Steamboat Bay_PS',
    net_suite_id: 713,
  },
  {
    name: 'Sunday Bay_PS',
    net_suite_id: 714,
  },
  {
    name: 'Symonds Bay_CH',
    net_suite_id: 736,
  },
  {
    name: 'Tahunanui Beach_TB',
    net_suite_id: 764,
  },
  {
    name: 'Takaka River_GB',
    net_suite_id: 754,
  },
  {
    name: 'Tasman Bay Other_TB',
    net_suite_id: 765,
  },
  {
    name: 'Tata Bay_GB',
    net_suite_id: 755,
  },
  {
    name: 'Tawa Bay_PS',
    net_suite_id: 807,
  },
  {
    name: 'Tawhitinui Bay_PS',
    net_suite_id: 715,
  },
  {
    name: 'Tawhitinui Reach (not hot spots)_PS',
    net_suite_id: 716,
  },
  {
    name: 'Te Aroha Bay_QCS',
    net_suite_id: 633,
  },
  {
    name: 'Te Pangu Bay_QCS',
    net_suite_id: 626,
  },
  {
    name: 'Te Puraka Point _PS*',
    net_suite_id: 652,
  },
  {
    name: 'TEST Bay** Developer use only',
    net_suite_id: 809,
  },
  {
    name: 'The Neck - Beatrix Bay_PS',
    net_suite_id: 806,
  },
  {
    name: 'Tio Point_QCS',
    net_suite_id: 627,
  },
  {
    name: 'Tongue Bay_PU',
    net_suite_id: 617,
  },
  {
    name: 'Tory Channel Other_QCS',
    net_suite_id: 634,
  },
  {
    name: 'Treble Tree Point_PS',
    net_suite_id: 717,
  },
  {
    name: 'Tuhitarata Bay_PS',
    net_suite_id: 718,
  },
  {
    name: 'Tumbledown Bay _PU*',
    net_suite_id: 611,
  },
  {
    name: 'Turner Bay_PS',
    net_suite_id: 719,
  },
  {
    name: 'Waihinau Bay (not Bulwer - NZKS)_PS',
    net_suite_id: 720,
  },
  {
    name: 'Waikawa Bay_PS',
    net_suite_id: 721,
  },
  {
    name: 'Waimaru Bay_PS',
    net_suite_id: 722,
  },
  {
    name: 'Wainui Bay _GB*',
    net_suite_id: 742,
  },
  {
    name: 'Waiona Bay_PS',
    net_suite_id: 723,
  },
  {
    name: 'Wairangi Bay _CH*',
    net_suite_id: 731,
  },
  {
    name: 'Waitaria Bay_KS',
    net_suite_id: 639,
  },
  {
    name: 'Waitata Bay_PS',
    net_suite_id: 724,
  },
  {
    name: 'Weka Point_KS',
    net_suite_id: 640,
  },
  {
    name: 'Wet Inlet _PS*',
    net_suite_id: 653,
  },
  {
    name: 'Whakitenga Bay _CH*',
    net_suite_id: 732,
  },
  {
    name: 'Whangakoko Bay_PU',
    net_suite_id: 618,
  },
  {
    name: 'Whangatoetoe Bay _PU*',
    net_suite_id: 612,
  },
  {
    name: 'Whariwharangi Bay_GB',
    net_suite_id: 756,
  },
  {
    name: 'Whataroa Bay _PU*',
    net_suite_id: 613,
  },
  {
    name: 'White Horse Rock_PS',
    net_suite_id: 725,
  },
  {
    name: 'Wilson Bay_PS',
    net_suite_id: 726,
  },
  {
    name: 'Wynens Bay_PS',
    net_suite_id: 727,
  },
  {
    name: 'Yncyca Bay_PS',
    net_suite_id: 728,
  },
];
