import { setup } from "xstate";

export const machine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "leave home" }
      | { type: "wagging starts" }
      | { type: "wagging stops" }
      | { type: "arrive home" }
      | { type: "speed up" }
      | { type: "slow down" },
  },
  schemas: {
    events: {
      "leave home": {
        type: "object",
        properties: {},
      },
      "wagging starts": {
        type: "object",
        properties: {},
      },
      "wagging stops": {
        type: "object",
        properties: {},
      },
      "arrive home": {
        type: "object",
        properties: {},
      },
      "speed up": {
        type: "object",
        properties: {},
      },
      "slow down": {
        type: "object",
        properties: {},
      },
    },
  },
}).createMachine({
  context: {},
  id: "dog walk",
  initial: "waiting",
  states: {
    waiting: {
      on: {
        "leave home": {
          target: "on a walk",
        },
      },
    },
    "on a walk": {
      type: "parallel",
      on: {
        "arrive home": {
          target: "walk complete",
        },
      },
      states: {
        activity: {
          initial: "walking",
          states: {
            walking: {
              on: {
                "speed up": {
                  target: "running",
                },
              },
            },
            running: {
              on: {
                "slow down": {
                  target: "walking",
                },
              },
            },
          },
        },
        tail: {
          initial: "not wagging",
          states: {
            "not wagging": {
              on: {
                "wagging starts": {
                  target: "wagging",
                },
              },
            },
            wagging: {
              on: {
                "wagging stops": {
                  target: "not wagging",
                },
              },
            },
          },
        },
      },
    },
    "walk complete": {
      type: "final",
    },
  },
});
