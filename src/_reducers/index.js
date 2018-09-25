import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { addForm } from './add.form.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
	addForm,
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;