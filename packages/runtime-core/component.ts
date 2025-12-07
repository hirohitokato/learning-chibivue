import { ReactiveEffect } from "../reactivity/effect";
import { emit } from "./componentEmits";
import type { ComponentOptions } from "./componentOptions";
import { initProps, Props } from "./componentProps";
import { VNode, VNodeChild } from "./vnode";

export type Component = ComponentOptions;
export type Data = Record<string, unknown>;

export interface ComponentInternalInstance {
  type: Component; // 元となるユーザー定義のコンポーネント(旧 rootComponent (実際にはルートコンポーネントだけじゃないけど))
  vnode: VNode; // このコンポーネントに対応する VNode
  subTree: VNode; // このコンポーネントがレンダリングした VNode ツリーのルート。旧n1
  next: VNode | null; // 次にレンダリングされる予定の VNode。更新時に使用。旧n2
  effect: ReactiveEffect; // 旧 effect
  render: InternalRenderFunction; // コンポーネントのレンダリング関数.旧componentRender
  update: () => void; // コンポーネントの更新関数。旧updateComponent
  isMounted: boolean; // マウント済みかどうかのフラグ

  propsOptions: Props;
  props: Data;
  emit: (event: string, ...args: any[]) => void;
}

export type InternalRenderFunction = {
  (): VNodeChild;
};

type CompileFunction = (template: string) => InternalRenderFunction;
let compile: CompileFunction | undefined;

export function registerRuntimeCompiler(_compile: any) {
  compile = _compile;
}

export const setupComponent = (instance: ComponentInternalInstance) => {
  // init props
  const { props } = instance.vnode;
  initProps(instance, props);

  // setup component
  const component = instance.type as Component;
  if (component.setup) {
    instance.render = component.setup(instance.props, {
      emit: instance.emit,
    }) as InternalRenderFunction;
  }

  if (compile && !component.render) {
    const template = component.template ?? "";
    if (template) {
      instance.render = compile(template);
    }
  }
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
    propsOptions: type.props as Props,
    props: {},
    emit: null!,
  };

  instance.emit = emit.bind(null, instance);
  return instance;
}
