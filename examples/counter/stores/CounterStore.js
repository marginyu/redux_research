import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from '../constants/ActionTypes';

const initialState = { counter: 10 };

function incremenent({ counter }) {
  return { counter: counter + 1 };
}

function decremenent({ counter }) {
  return { counter: counter - 1 };
}

function d({counter}){
  return {counter:counter * 2};
}

export default function CounterStore(state, action) {
  if (!state) {
    return initialState;
  }

  switch (action.type) {
  case INCREMENT_COUNTER:
    return incremenent(state, action);
  case DECREMENT_COUNTER:
    return decremenent(state, action);
    case "DOUBLE2":
          return d(state,action);
  default:
    return state;
  }
}
