import { ReactiveEffect } from "../reactivity/effect";
import type { ComponentOptions } from "./componentOptions";
import { RendererElement } from "./renderer";
import { normalizeVNode, VNode, VNodeChild } from "./vnode";

export type Component = ComponentOptions;

export interface ComponentInternalInstance {
  type: Component; // 元となるユーザー定義のコンポーネント(旧 rootComponent (実際にはルートコンポーネントだけじゃないけど))
  vnode: VNode; // このコンポーネントに対応する VNode
  subTree: VNode; // このコンポーネントがレンダリングした VNode ツリーのルート。旧n1
  next: VNode | null; // 次にレンダリングされる予定の VNode。更新時に使用。旧n2
  effect: ReactiveEffect; // 旧 effect
  render: InternalRenderFunction; // コンポーネントのレンダリング関数.旧componentRender
  update: () => void; // コンポーネントの更新関数。旧updateComponent
  isMounted: boolean; // マウント済みかどうかのフラグ
}

export type InternalRenderFunction = {
  (): VNodeChild;
};

export function createComponentInstance(
  vnode: VNode
): ComponentInternalInstance {
  const type = vnode.type as Component;

  // 各プロパティの型は non-null だが，インスタンスを生成した段階では null で入れてしまう．
  // (本家の Vue.js も同様)
  const instance: ComponentInternalInstance = {
    type,
    vnode,
    next: null,
    effect: null!,
    render: null!,
    update: null!,
    subTree: null!,
    isMounted: false,
  };

  return instance;
}
