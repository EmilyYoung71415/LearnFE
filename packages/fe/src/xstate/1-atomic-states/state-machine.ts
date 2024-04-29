import { createMachine } from "xstate";

export const EVENT_TOGGLE_LIGHT = "toggle light";
export const trafficLightMachine = createMachine(
  {
    initial: "Light off",
    exit: {
      type: "removeColor",
    },
    states: {
      "Light off": {
        entry: {
          type: "removeColor",
        },
        on: {
          "toggle light": {
            target: "Yellow",
            reenter: false,
          },
        },
      },
      Yellow: {
        entry: {
          type: "setYellow",
        },
        on: {
          "toggle light": {
            target: "Blue",
            reenter: false,
          },
        },
      },
      Blue: {
        entry: {
          type: "setBlue",
        },
        on: {
          "toggle light": {
            target: "Green",
            reenter: false,
          },
        },
      },
      Green: {
        entry: {
          type: "setGreen",
        },
        on: {
          "toggle light": {
            target: "Light off",
            reenter: false,
          },
        },
      },
    },
  },
  {
    actions: {
      // @ts-ignore
      removeColor: ({ context, event }) => {},
      // @ts-ignore
      setYellow: ({ context, event }) => {},
      // @ts-ignore
      setBlue: ({ context, event }) => {},
      // @ts-ignore
      setGreen: ({ context, event }) => {},
    },
  }
);
