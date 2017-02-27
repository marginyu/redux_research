import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from '../constants/ActionTypes';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}


export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}


export function double(){
  return{
    type:"DOUBLE2"
  };
}