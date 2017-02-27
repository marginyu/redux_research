import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';

const contextTypes = {
  observeStores: PropTypes.func.isRequired
};

export default function connect(...storeKeys) {

  return function (DecoratedComponent) {
    
    const wrappedDisplayName = DecoratedComponent.name;

    return class extends Component {
      static displayName = `ReduxObserves(${wrappedDisplayName})`;
      static contextTypes = contextTypes;

      constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.unobserve = this.context.observeStores(storeKeys , this.handleChange); //订阅
      }

      handleChange(stateFromStores) {
        this.currentStateFromStores = pick(stateFromStores, storeKeys);
        this.updateState(stateFromStores);
      }

      //更新state
      updateState(stateFromStores, props) {
        console.log("更新state",stateFromStores,props);
        
        stateFromStores = stateFromStores[storeKeys[0]];
        const state = stateFromStores;
        this.setState(state);//important 通过setState进行组件更新
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
