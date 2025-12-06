import { ReactiveEffect } from "../reactivity/effect";
import { Component } from "./component";
import { RootRndererFunction } from "./renderer";

export interface App<HostElement = any> {
  mount: (rootContainer: HostElement | string) => void;
}

export type CreateAppFunction<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

export function createAppAPI<HostElement>(
  render: RootRndererFunction<HostElement>
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent: Component): App<HostElement> {
    const app: App = {
      mount: (rootContainer: HostElement) => {
        // rootComponentを渡すだけに
        render(rootComponent, rootContainer);
      },
    };

    return app;
  };
}
