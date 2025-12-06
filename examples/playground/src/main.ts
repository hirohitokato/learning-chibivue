import { createApp, h } from "chibivue";

const app = createApp({
  render() {
    return h("div", {}, [
      h("p", { style: "color: red; font-weight: bold;" }, [
        "Hello, ChibiVue World!",
      ]),
      h(
        "button",
        {
          onClick: () => alert("Button clicked!"),
        },
        ["Click Me"]
      ),
    ]);
  },
});

app.mount("#app");
