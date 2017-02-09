import React, { PropTypes } from 'react';

const childContextTypes = {
  observeStores: PropTypes.func.isRequired,
  getActions: PropTypes.func.isRequired
};

// http://www.liuhaihua.cn/archives/115548.html
//xiaomei https://facebook.github.io/react/docs/context.html
export default function provides(dispatcher) {
  return function (DecoratedComponent) {
    const wrappedDisplayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    return class {
      static displayName = `ReduxProvides(${wrappedDisplayName})`;
      static childContextTypes = childContextTypes;

      //传参的高及用法
      getChildContext() {
        return {
          observeStores: dispatcher.observeStores,
          getActions: dispatcher.getActions
        };
      }

      render() {
        
        console.log("装饰者加上dispatch,props属性",this.props);
        return (
          <DecoratedComponent {...this.props} />
        );
      }
    };
  };
}
