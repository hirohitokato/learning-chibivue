import { createApp, h } from "chibivue";

const app = createApp({
  render() {
    return h("div", {}, [
      h("p", {}, ["Hello, ChibiVue World!"]),
      h("button", {}, ["Click Me"]),
    ]);
  },
});

app.mount("#app");
