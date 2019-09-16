import React from 'react';
import createContext from 'create-react-context';
import PropTypes from 'prop-types';

export const TinyStoreContext = createContext();

class Provider extends React.Component {
  static propTypes = {
    value: PropTypes.any,
  }

  render() {
    const { children, value } = this.props;
    return (
      <TinyStoreContext.Provider value={value}>
        {children}
      </TinyStoreContext.Provider>
    );
  }
}

export default Provider;
