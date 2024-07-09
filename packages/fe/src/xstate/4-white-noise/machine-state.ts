import { createMachine, sendTo, assign, fromCallback } from "xstate";

export const machine = createMachine(
  {
    context: {
      volume: 5,
    },
    id: "White noise machine",
    initial: "Power off",
    states: {
      "Power off": {
        description:
          "We need power states because \n\nbrowsers don’t like autoplaying audio.",
        entry: {
          type: "hideButtons",
        },
        on: {
          "toggle power": {
            target: "Power on",
            reenter: false,
          },
        },
      },
      "Power on": {
        entry: [
          {
            type: "showButtons",
          },
          {
            type: "setVolume",
          },
          sendTo("audioPlayer", { type: "play" }),
        ],
        exit: [
          {
            type: "hideButtons",
          },
          sendTo("audioPlayer", { type: "pause" }),
        ],
        invoke: {
          src: "audioPlayer",
          id: "audioPlayer",
        },
        states: {
          Sound: {
            initial: "White noise",
            states: {
              "White noise": {
                entry: {
                  type: "changeToNoise",
                },
                on: {
                  "toggle sound": {
                    target: "Waves",
                    reenter: false,
                  },
                },
              },
              Waves: {
                entry: {
                  type: "changeToWaves",
                },
                on: {
                  "toggle sound": {
                    target: "Fan",
                    reenter: false,
                  },
                },
              },
              Fan: {
                entry: {
                  type: "changeToFan",
                },
                on: {
                  "toggle sound": {
                    target: "White noise",
                    reenter: false,
                  },
                },
              },
            },
          },
          Light: {
            initial: "Light off",
            exit: {
              type: "removeColour",
            },
            states: {
              "Light off": {
                entry: {
                  type: "removeColour",
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
          Volume: {
            on: {
              "volume up": {
                guard: "isNotMaxVolume",
                actions: [
                  {
                    type: "volUp",
                  },
                  assign({
                    volume: (event) => {
                      return event.context.volume + 1;
                    },
                  }),
                ],
                reenter: true,
              },
              "volume down": {
                guard: "isNotMinVolume",
                actions: [
                  {
                    type: "volDown",
                  },
                  assign({
                    volume: (event) => {
                      return event.context.volume - 1;
                    },
                  }),
                ],
                reenter: true,
              },
            },
          },
        },
        on: {
          "toggle power": {
            target: "Power off",
            reenter: false,
          },
        },
        type: "parallel",
      },
    },
  },
  {
    actions: {
      showButtons: ({ context, event }) => {},

      setVolume: ({ context, event }) => {},

      hideButtons: ({ context, event }) => {},

      changeToNoise: ({ context, event }) => {},

      changeToWaves: ({ context, event }) => {},

      changeToFan: ({ context, event }) => {},

      removeColour: ({ context, event }) => {},

      setYellow: ({ context, event }) => {},

      setBlue: ({ context, event }) => {},

      setGreen: ({ context, event }) => {},

      volUp: ({ context, event }) => {},

      volDown: ({ context, event }) => {},
    },
    actors: {
      audioPlayer: fromCallback(({ sendBack, receive }) => {}),
    },
    guards: {
      isNotMaxVolume: ({ context, event, guard }) => false,

      isNotMinVolume: ({ context, event, guard }) => false,
    },
    delays: {},
  }
);
