import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import identity from 'lodash/utility/identity';//https://lodash.com/docs/4.17.2#identity

const contextTypes = {
  observeStores: PropTypes.func.isRequired
};

export default function connect(...storeKeys) {

  console.log("storeKeys",storeKeys);

  let mapState = identity;//identity是一个函数

  // Last argument may be a custom mapState function
  const lastIndex = storeKeys.length - 1;
  if (typeof storeKeys[lastIndex] === 'function') {
    //将函数赋值给mapState
    [mapState] = storeKeys.splice(lastIndex, 1);//http://www.jb51.net/w3school/js/jsref_splice.htm
  }

  return function (DecoratedComponent) {
    const wrappedDisplayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    return class extends Component {
      static displayName = `ReduxObserves(${wrappedDisplayName})`;
      static contextTypes = contextTypes;

      constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.unobserve = this.context.observeStores(storeKeys, this.handleChange);
      }

      handleChange(stateFromStores) {
        this.currentStateFromStores = pick(stateFromStores, storeKeys);
        this.updateState(stateFromStores, this.props);
      }

      componentWillReceiveProps(nextProps) {
        this.updateState(this.currentStateFromStores, nextProps);
      }

      //更新state
      updateState(stateFromStores, props) {
        console.log("更新state",stateFromStores,props);

        if (storeKeys.length === 1) {
          // Just give it the particular store state for convenience
          stateFromStores = stateFromStores[storeKeys[0]];
        }

        const state = mapState(stateFromStores, props);
        if (this.state) {
          this.setState(state);
        } else {
          this.state = state;
        }
      }

      componentWillUnmount() {
        this.unobserve();
      }

      render() {
        return (
          <DecoratedComponent {...this.props}
                              {...this.state} />
        );
      }
    };
  };
}
