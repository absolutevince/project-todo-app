export default (function PubSub() {
  const events = {};

  function sub(event, fn) {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(fn);
    console.log(events);
  }

  function publish(event, ...value) {
    events[event].forEach((fn) => {
      fn(...value);
    });
  }

  return {
    sub,
    publish,
    events,
  };
})();
