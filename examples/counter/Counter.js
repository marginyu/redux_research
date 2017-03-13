import React from 'react';
import { performs, observes } from 'redux';


// @performs('increment', 'decrement')
// @observes('CounterStore')
// export default

class Counter {
    
  render() {
    
    console.debug("Counter的props",this.props);

    const { increment, decrement,double } = this.props;
    return (
      <p>
        Clicked: {this.props.counter} times
        {' '}
        <button onClick={() => increment()}>+</button>
        {' '}
        <button onClick={() => decrement()}>-</button>
          {' '}
          <button onClick={() => double()}>double</button>
      </p>
    );
  }
}

export default performs('increment','decrement','double')( observes('CounterStore')(Counter) );