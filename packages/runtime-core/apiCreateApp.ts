import { Component } from "./component";
import { RootRndererFunction } from "./renderer";

export interface App<HostElement = any> {
  mount: (rootContainer: HostElement | string) => void;
}

export type CreateAppFunciton<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

export function createAppAPI<HostElement>(
  render: RootRndererFunction<HostElement>
): CreateAppFunciton<HostElement> {
  return function createApp(rootComponent: Component): App<HostElement> {
    const app: App = {
      mount: (rootContainer: HostElement) => {
        const message = rootComponent.render!();
        render(message, rootContainer);
      },
    };
    return app;
  };
}
