import { combineReducers } from 'redux';
import tournaments from '../features/tournaments';

const rootReducer = combineReducers({
  tournaments,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
