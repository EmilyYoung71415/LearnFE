import { createActor } from "xstate";
import { describe, test, expect, vi } from "vitest";
import { trafficLightMachine, EVENT_TOGGLE_LIGHT } from "./state-machine";

describe("XState", () => {
  test("Status transition: current state + action => new state", () => {
    const fn0 = vi.fn();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const fn3 = vi.fn();

    const trafficLightMaker = createActor(
      trafficLightMachine.provide({
        actions: {
          removeColor: fn0,
          setYellow: fn1,
          setBlue: fn2,
          setGreen: fn3,
        },
      })
    );

    let state: { value: string } = { value: "" };
    trafficLightMaker.subscribe((_state) => {
      state = _state as unknown as { value: string };
    });

    trafficLightMaker.start();

    trafficLightMaker.send({ type: "removeColor" });
    expect(fn0).toHaveBeenCalled();
    expect(state.value).toBe("Light off");
    trafficLightMaker.send({ type: EVENT_TOGGLE_LIGHT });
    expect(fn1).toHaveBeenCalled();
    expect(state.value).toBe("Yellow");
    trafficLightMaker.send({ type: EVENT_TOGGLE_LIGHT });
    expect(fn2).toHaveBeenCalled();
    expect(state.value).toBe("Blue");
    trafficLightMaker.send({ type: EVENT_TOGGLE_LIGHT });
    expect(fn3).toHaveBeenCalled();
    expect(state.value).toBe("Green");
    trafficLightMaker.send({ type: EVENT_TOGGLE_LIGHT });
    expect(fn0).toHaveBeenCalledTimes(2);
    expect(state.value).toBe("Light off");
    trafficLightMaker.stop();
  });
});
