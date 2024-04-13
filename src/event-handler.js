const EventHandler = (() => {
  const events = new Map();

  const on = (eventName, listener, priority = 0) => {
    if (!events.has(eventName)) {
      events.set(eventName, []);
    }
    events.get(eventName).push({ listener, priority });
  };

  const off = (eventName, listenerToRemove) => {
    if (!events.has(eventName)) {
      return;
    }
    const listeners = events
      .get(eventName)
      .filter(listener => listener !== listenerToRemove);
    events.set(eventName, listeners);
  };

  const emit = (eventName, ...args) => {
    if (events.has(eventName)) {
      const listeners = events.get(eventName);
      listeners.sort((a, b) => b.priority - a.priority);
      listeners.forEach(({ listener }) => {
        listener(...args);
      });
    }
  };

  return {
    on,
    off,
    emit,
  };
})();

export default EventHandler;
