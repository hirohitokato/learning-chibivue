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
        const componentRender = rootComponent.setup!();

        const updateComponent = () => {
          const vnode = componentRender();
          render(vnode, rootContainer);
        };

        const effect = new ReactiveEffect(updateComponent);
        effect.run();
      },
    };

    return app;
  };
}
