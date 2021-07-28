import {combineReducers} from 'redux';
import {userReducer, formReducer, uiReducer, farmReducer} from './reducers';

export const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  ui: uiReducer,
  farm: farmReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
