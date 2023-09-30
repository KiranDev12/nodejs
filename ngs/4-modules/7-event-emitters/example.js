const { log } = require("console");
const EventEmitter = require("events");

// Streams are Event Emitters
// process.stdin, process.stdout

const myEmitter = new EventEmitter();

setImmediate(() => {
  myEmitter.emit("test-event");
});

myEmitter.on("test-event", () => {
  console.log("test-event was fired");
});

myEmitter.on("test-event", () => {
  console.log("test-event was fired");
});

myEmitter.on("test-event", () => {
  console.log("test-event was fired");
});
