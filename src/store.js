import { isFunction } from './utils';

export default class TinyStore {
  constructor(props) {
    this.events = [];

    this.state = {
      ...props,
    };
  }

  subscribe(callback) {
    if (isFunction(callback) && this.events.indexOf(callback) === -1) {
      this.events.push(callback);
    }
  }

  unsubscribe(callback) {
    const index = this.events.indexOf(callback);
    if (index > -1) {
      this.events.splice(index, 1);
    }
  }

  notify() {
    this.events.forEach((event) => {
      if (isFunction(event)) {
        event(this);
      }
    });
  }

  setState(list) {
    this.state = {
      ...this.state,
      ...list,
    };
    this.notify();
  }
}
