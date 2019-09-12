// https://github.com/reduxjs/react-redux/blob/master/src/components/connectAdvanced.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import hoistStatics from 'hoist-non-react-statics';
import { isFunction, isObject, isEmptyObject } from './utils'

import { TinyStoreContext } from './provider'

class Connect extends Component {
  static propTypes = {
    store: PropTypes.object,
    hook: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = this.getComponentProps()
  }

  componentDidMount() {
    if (!isEmptyObject(this.state)) {
      this.props.store.subscribe(this.handleSubscribe)
    }
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.handleSubscribe)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(nextState, this.state) || !shallowEqual(nextProps, this.props)
  }

  getComponentProps = (store = this.props.store) => {
    const { hook } = this.props
    const props = isFunction(hook) ? hook(store) : {}

    return isObject(props) ? props : {}
  }

  handleSubscribe = (store) => {
    this.setState(this.getComponentProps(store))
  }

  render() {
    return React.cloneElement(this.props.children, {
      ...this.state,
      store: this.props.store
    })
  }
}

export default function (hook) {
  return function (WrappedComponent) {

    class Wrapper extends Component {
      static WrappedComponent = WrappedComponent

      render() {
        return <TinyStoreContext.Consumer>
          {
            (store) => {
              return <Connect store={store} hook={hook}>
                <WrappedComponent {...this.props} />
              </Connect>
            }
          }
        </TinyStoreContext.Consumer>
      }
    }

    return hoistStatics(Wrapper, WrappedComponent)
  }
}