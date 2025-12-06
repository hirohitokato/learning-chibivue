import { createApp, h, reactive } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({ count: 0 });
    const increment = () => {
      state.count++;
    };
    return function render() {
      return h("div", { id: "my-app" }, [
        h("p", { style: "color: red; font-weight: bold;" }, [
          "Hello, ChibiVue World!",
        ]),
        h("p", {}, [`Count: ${state.count}`]),
        h(
          "button",
          {
            onClick: increment,
          },
          ["Click Me"]
        ),
      ]);
    };
  },
});

app.mount("#app");
