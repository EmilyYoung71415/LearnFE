import { createMachine, assign } from "xstate";

const whiteBoardMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QHcAWBLALmAQgewEMAnCAOnQgBswBiABz3QDtsiARPZJgbQAYBdRKAaws6PEyEgAHogCMAJgCspAGwAWJQA4AzL3UBOXqp1KFOgDQgAnoi1zSOhQoNytRhbtVKAvj6toWLiEJKSwYNQAxpjMUKQArkzhUdgQ9IwsYOycPAJSImISUrIIzqqkAOyuqhW8BloVchWqGla2COqqDgq1WkpySjoGpsN+ARjY+MRkyWDRsWERc6npzKwcXHyCSCAFMUU7JQYVbXbDpH1KhgaaSia+-iCBkyEzS-NMcbPRkKuZRABVOhbfJ4UT7SSHRBlSrVWr1RrNVo2RDqOQOTS6dS8OTqHTuHRjJ4TYLTRYpBYQIgEKBQSnUqAAZUwxEwf1YAFk8AA3MAgnZ7cSQ0AlK4qJRXCp6VyuPRKU4ILRdUiDfRNOr9Y4GInPUmhb4xT6kKk0ulGk1MllENkMNZZLm87hybbCMGFYUyaFaBSVewKVR1dTYwyqBVeUg4u5KG7aJS8Yw6klTfXvQ1xC1m9MM5ms9lZIH813goXFRBilWS6VyWW8eUohByXg6dRqHr3Y4aIMPcZBZNvCnmhmZ41D2J5ogOvl5AVuiGlhAVLS8UjVnGqTyxyMKqoY4yeNw6JEKRO917k5b002X2lj23-AvTovu+cGFwriqafFdD-Nyz1pVaJUi6qN62IVM4WjqCeLxkga17DhaACiTBpBAEhgGELLYKQup9ueHxZleg40shECFrss4llCDa8JBFyaOiQwfjcvAKGG+hqBoUpaJcAzNn4jxMHgEBwFIuGvKCxYHCKiAALQGAqsmqNBepkBQ1CSc+1HqGx-4YpBh5Kp2FRVFBjzibBqaxJpc7UUMCpOC2cimHirH1HoPQqXhcFGokBqQDZVEyYqJz1miFSkAoOJDJctHuV5Z4+V8qYBTOUkeiU+I+ko4HDNWOiKP6-oKmiBiVNF9QSnFkEJZZA6ETenyBdJnqlM2vqKAGNzBgY67bhxtE6Do67DOo3p3LVKb1SORENTm1rNRliCmD66gVGYkE3H0NS6GGRgXPuvSDL1qjauZSaJVZxGNQ1maLfOVQqHIGjon0uI6Tce0OC0uKuI2nSMZN-YXtdCEMqR93UY2JgXOu+i8IuOmDLp7RGA4rgKM5eWeLoFQCT4QA */
  id: "whiteBoard",
  initial: "idle",
  context: {
    selectedElement: null,
    isDragging: false,
    dragStartPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
    finalPosition: { x: 0, y: 0 },
    threshold: 5,
  },
  states: {
    idle: {
      on: {
        pointerDown: "selecting",
      },
    },
    selecting: {
      initial: "unselected",
      states: {
        unselected: {
          on: {
            pointerDown: "selected",
          },
        },
        selected: {
          on: {
            pointerDown: "dragging",
            pointerUp: "unselected",
          },
        },
        dragging: {
          initial: "dragStart",
          states: {
            dragStart: {
              on: {
                pointerMove: [
                  {
                    cond: (context, event) => {
                      const { x, y } = context.dragStartPosition;
                      const distance = Math.sqrt(
                        Math.pow(event.properties.x - x, 2) +
                          Math.pow(event.properties.y - y, 2)
                      );
                      return distance >= context.threshold;
                    },
                    target: "dragging",
                    actions: assign({
                      currentPosition: (context, event) => ({
                        x: event.properties.x,
                        y: event.properties.y,
                      }),
                      isDragging: () => true,
                    }),
                  },
                  {
                    target: "dragStart",
                  },
                ],
                pointerUp: "dragEnd",
              },
            },
            dragging: {
              on: {
                pointerMove: {
                  target: "dragging",
                  actions: assign({
                    currentPosition: (context, event) => ({
                      x: event.properties.x,
                      y: event.properties.y,
                    }),
                  }),
                },
                pointerUp: {
                  target: "dragEnd",
                  actions: assign({
                    finalPosition: (context, event) => ({
                      x: event.properties.x,
                      y: event.properties.y,
                    }),
                    isDragging: () => false,
                  }),
                },
              },
            },
            dragEnd: {
              type: "final",
              onDone: {
                actions: (context) => {
                  console.log("Drag ended at:", context.finalPosition);
                },
              },
            },
          },
        },
      },
    },
  },
});
