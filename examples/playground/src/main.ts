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

const MyComponent = {
  props: { someMessage: { type: String } },
  setup(props: { someMessage: string }) {
    return () => h("div", {}, [`Message: ${props.someMessage}`]);
  },
};

const app = createApp({
  setup() {
    const state = reactive({ message: "Hello" });
    const changeMessage = () => {
      state.message += "!";
    };

    return function render() {
      return h("div", { id: "my-app" }, [
        h("p", { style: "color: red; font-weight: bold;" }, [
          "Hello, ChibiVue World!",
        ]),
        h(MyComponent, { "some-message": state.message }, []),
        h(CounterComponent, {}, []),
        h("button", { onClick: changeMessage }, ["Change Message"]),
      ]);
    };
  },
});

app.mount("#app");
