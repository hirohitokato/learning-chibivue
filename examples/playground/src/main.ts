import { createApp, h, reactive } from "chibivue";

const CounterComponent = {
  setup() {
    const state = reactive({ count: 0 });
    const increment = () => state.count++;

    return () =>
      h("div", {}, [
        h("p", {}, [`Count: ${state.count}`]),
        h(
          "button",
          {
            onClick: increment,
          },
          ["Increment"]
        ),
      ]);
  },
};

const app = createApp({
  setup() {
    return function render() {
      return h("div", { id: "my-app" }, [
        h("p", { style: "color: red; font-weight: bold;" }, [
          "Hello, ChibiVue World!",
        ]),
        h(CounterComponent, {}, []),
        h(CounterComponent, {}, []),
        h(CounterComponent, {}, []),
      ]);
    };
  },
});

app.mount("#app");
