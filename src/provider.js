import React, { Component } from 'react';
import createContext from 'create-react-context';

export const TinyStoreContext = createContext();

class Provider extends React.Component {
  render() {
    return <TinyStoreContext.Provider value={this.props.value}>
      {this.props.children}
    </TinyStoreContext.Provider>;
  }
}

export default Provider;
