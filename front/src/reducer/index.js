import { combineReducers } from 'redux';

import user from './user'
import artists from './artists'
import acts from './acts'

const allReducer = combineReducers({
  user,
  artists,
  acts,
})

export default allReducer;