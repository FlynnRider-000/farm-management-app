export interface IUIActions {
  type: string;
  payload: boolean | null | undefined | UIErrorsTypes;
}

export type UIErrorsTypes = {
  type: string | null;
  message: string | null;
};

export interface UIStateInterface {
  internetConnection: boolean | undefined | null;
  errors: UIErrorsTypes;
  netSuiteDataLoading: boolean;
}
