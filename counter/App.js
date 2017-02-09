import React, { Component } from 'react';
import Counter from './Counter';
import { provides } from 'redux'; //redux在webpack.config.js文件里配置
import dispatcher from './dispatcher';

@provides(dispatcher)
export default class App extends Component {
  render() {
    return (
      <Counter />
    );
  }
}
