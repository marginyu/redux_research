import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import identity from 'lodash/utility/identity';

const contextTypes = {
  getActions: PropTypes.func.isRequired
};

export default function performs(...actionKeys) {

  console.log("xiaomei",actionKeys);

  let mapActions = identity;

  return function (DecoratedComponent) {
    //const wrappedDisplayName = DecoratedComponent.name;
    const wrappedDisplayName = "ReduxObserves(Counter)";

    console.log("displayName",wrappedDisplayName);

    return class extends Component {
      static displayName = `ReduxPerforms(${wrappedDisplayName})`;
      static contextTypes = contextTypes;

      constructor(props, context) {
        super(props, context);
        console.log("props",props);
        //this.updateActions(props);
        this.state = {
          actions:mapActions(
              pick(this.context.getActions(), actionKeys),
              props
          )
        };

      }
      
      //pick的用法  https://lodash.com/docs/#pick
      // updateActions(props) {
      //   this.actions = mapActions(
      //     pick(this.context.getActions(), actionKeys),
      //     props
      //   );
      // }

      render() {

       // console.log("装饰者加上action",this.actions);
        return (
          <DecoratedComponent {...this.state.actions} />
        );
      }
    };
  };
}