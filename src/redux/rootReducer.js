import {TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  let prevState
  let field
  console.log('action', action);
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      prevState = state[field] || {}
      console.log('field', field);
      prevState[action.data.id] = action.data.value
      return {...state, [field]: prevState}
    default: return state
  }
}
