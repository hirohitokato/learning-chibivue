import { VNode } from "./vnode";

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement
> {
  /// createElement はホスト環境に依存した要素ノードを生成するための関数
  createElement(type: string): HostNode;
  /// createText はホスト環境に依存したテキストノードを生成するための関数
  createText(text: string): HostNode;
  /// setElementText はホスト環境に依存したノードのテキスト内容を設定するための関数
  setElementText(node: HostNode, text: string): void;
  /// insert はホスト環境に依存したノードを親ノードに挿入するための関数
  insert(child: HostNode, parent: HostNode, anchor?: HostNode): void;

  /// patchProp はホスト環境に依存したノードのプロパティを更新するための関数
  patchProp(el: HostElement, key: string, value: any): void;
}

// Renderer で扱うノードの型定義。DOM に依存しないように抽象化している。

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

export type RootRndererFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement
) => void;

export function createRenderer(options: RendererOptions) {
  const {
    createElement: hostCreateElement,
    createText: hostCreateText,
    setElementText: hostSetElementText,
    insert: hostInsert,
    patchProp: hostPatchProp,
  } = options;

  function renderVnode(vnode: VNode | string): RendererNode {
    if (typeof vnode === "string") return hostCreateText(vnode);
    const el = hostCreateElement(vnode.type);

    Object.entries(vnode.props).forEach(([key, value]) => {
      hostPatchProp(el as RendererElement, key, value);
    });
    for (const child of vnode.children) {
      const childEl = renderVnode(child);
      hostInsert(childEl, el);
    }

    return el;
  }

  const render: RootRndererFunction = (message, container) => {
    while (container.firstChild) container.removeChild(container.firstChild); // 全消し
    const el = renderVnode(message);
    hostInsert(el, container);
  };

  return { render };
}
