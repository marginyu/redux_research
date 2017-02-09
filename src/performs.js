import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import identity from 'lodash/utility/identity';

const contextTypes = {
  getActions: PropTypes.func.isRequired
};

export default function performs(...actionKeys) {

  console.log("xiaomei",actionKeys);

  let mapActions = identity;

  // Last argument may be a custom mapState function
  const lastIndex = actionKeys.length - 1;
  if (typeof actionKeys[lastIndex] === 'function') {
    console.log("it is a function");
    [mapActions] = actionKeys.splice(lastIndex, 1);
  }


  console.log("xiaomei2",mapActions);

  return function (DecoratedComponent) {
    const wrappedDisplayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    console.log("displayName",wrappedDisplayName);

    return class extends Component {
      static displayName = `ReduxPerforms(${wrappedDisplayName})`;
      static contextTypes = contextTypes;

      constructor(props, context) {
        super(props, context);
        console.log("props",props);
        this.updateActions(props);
      }

      componentWillReceiveProps(nextProps) {
        console.log("nextProps",nextProps);
        this.updateActions(nextProps);
      }


      //pick的用法  https://lodash.com/docs/#pick

      updateActions(props) {
        this.actions = mapActions(
          pick(this.context.getActions(), actionKeys),
          props
        );
      }

      render() {

        console.log("装饰者加上action",this.actions);
        return (
          <DecoratedComponent {...this.actions} />
        );
      }
    };
  };
}
