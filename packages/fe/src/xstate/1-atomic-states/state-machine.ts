import { createMachine } from "xstate";

export const EVENT_TOGGLE_LIGHT = "toggle light";
export const trafficLightMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBlcpsAXAAgHsAzRgYmvqigBsxavKaAbQAMAXUSgADvVi5quevgkgAHogBMAVmEkAnAHYAjAGYAbMIAswzeoAcFi6YA0IAJ4ajJfba2mLt3WMzO1MAX1CXNCw8QlIATTAuLnoAdzYObl5+KmoRcSQQaVl5RWU1BE1vEnV9cwcLTVM-QwsXdwQawy8fRv9A4NswiJAonAJiEgAhLgBXMHTOHj4BXLFlIrkFJQLygOM9YUNLIPVjbU1jNo8u718+oNMQ8MiMMdiSAHEAJzAwfAXMsscnl1jJNqUdog9gcjhYTmdrJc3IhDHYSCYarpbPphLZDLp1IZbOFhvh6BA4MpRjFiKDilsyogALTOZEIFnPEavGmkCg5BjMOng7agcoWdRXDrGdQkUyaTQ+WzCXSOeUXTnU8bxRLJFJCkoi1SIYwqkiNTRHLGHWzGfRaSXqfxmk2WTQE3S42zE4aa97TOb6hmQhB2rqDAyBWwXfHih1Oi4ehruz14jXcrWfH5-QMQ0Uo4S2kgWFX6Al24TWWwOs7o+WDc02UuGfQk0JAA */
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
