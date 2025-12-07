import { createApp, h, reactive } from "chibivue";

// const CounterComponent = {
//   setup() {
//     const state = reactive({ count: 0 });
//     const increment = () => state.count++;

//     return () =>
//       h("div", {}, [
//         h("p", {}, [`Count: ${state.count}`]),
//         h(
//           "button",
//           {
//             onClick: increment,
//           },
//           ["Increment"]
//         ),
//       ]);
//   },
// };

// const MyComponent = {
//   props: { someMessage: { type: String } },
//   setup(props: { someMessage: string }, { emit }: any) {
//     return () =>
//       h("div", {}, [
//         h("p", {}, [`Message: ${props.someMessage}`]),
//         h("button", { onClick: () => emit("click:change-message") }, [
//           "Change Message",
//         ]),
//       ]);
//   },
// };

// const app = createApp({
//   setup() {
//     const state = reactive({ message: "Hello" });
//     const changeMessage = () => {
//       state.message += "!";
//     };

//     return function render() {
//       return h("div", { id: "my-app" }, [
//         h("p", { style: "color: red; font-weight: bold;" }, [
//           "Hello, ChibiVue World!",
//         ]),
//         h(
//           MyComponent,
//           {
//             "some-message": state.message,
//             "onClick:change-message": changeMessage,
//           },
//           []
//         ),
//         h(CounterComponent, {}, []),
//       ]);
//     };
//   },
// });
const app = createApp({
  template: `<b class="hello" style="color: red;">Hello World!!</b>`,
});
app.mount("#app");
