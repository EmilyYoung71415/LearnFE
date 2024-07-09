import { createActor, fromCallback } from "xstate";
import { machine } from "./machine-state";

// https://stackblitz.com/edit/nnbfjk?file=index.js
// 业务逻辑
const noiseMaker = createActor(
  machine.provide({
    actions: {
      setVolume: ({ context }) => {
        const defaultVolume = convertVolume(context.volume);
        audio.volume = defaultVolume;
      },
      showButtons: ({ context, event }) => {
        enableButtons();
      },
      hideButtons: ({ context, event }) => {
        disableButtons();
      },
      removeColour: ({ context, event }) => {
        const colour = "none";
        setLightColour(colour);
      },
      setYellow: ({ context, event }) => {
        const colour = "yellow";
        setLightColour(colour);
      },
      setBlue: ({ context, event }) => {
        const colour = "blue";
        setLightColour(colour);
      },
      setGreen: ({ context, event }) => {
        const colour = "green";
        setLightColour(colour);
      },
      changeToNoise: ({ context, event }) => {
        const soundTrack = "noise";
        changeTrack(soundTrack);
      },
      changeToWaves: ({ context, event }) => {
        const soundTrack = "waves";
        changeTrack(soundTrack);
      },
      changeToFan: ({ context, event }) => {
        const soundTrack = "fan";
        changeTrack(soundTrack);
      },
      volUp: ({ context }) => {
        const upVolume = convertVolume(context.volume);
        audio.volume = upVolume;
      },
      volDown: ({ context }) => {
        const downVolume = convertVolume(context.volume);
        audio.volume = downVolume;
      },
    },
    actors: {
      audioPlayer: fromCallback(({ receive }) => {
        let playStatus = "paused";
        receive((event) => {
          if (event.type === "play") {
            playStatus = "playing";
            audio.play();
          } else if (event.type === "pause") {
            playStatus = "paused";
            audio.pause();
          }
        });
      }),
    },
    guards: {
      isNotMaxVolume: ({ context }) => {
        return context.volume < maxVolume;
      },
      isNotMinVolume: ({ context }) => {
        return context.volume > minVolume;
      },
    },
  })
);
