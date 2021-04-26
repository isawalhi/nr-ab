class Event {
  private listeners: any[]

  constructor() {
    this.listeners = [];
  }

  addListener(listener: any) {
    this.listeners.push(listener);
  }

  trigger(params) {
    this.listeners.forEach((listener) => { listener(params); });
  }
}

export default Event;
