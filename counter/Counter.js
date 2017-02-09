import React from 'react';
import { performs, observes } from 'redux';

@performs('increment', 'decrement')
@observes('CounterStore')
export default class Counter {


  render() {
      console.debug("Counter的props",this.props);

      //console.log('Counter module',module);
    const { increment, decrement } = this.props;
    return (
      <p>
        Clicked: {this.props.counter} times
        {' '}
        <button onClick={() => increment()}>+</button>
        {' '}
        <button onClick={() => decrement()}>-</button>
      </p>
    );
  }
}
