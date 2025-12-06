import { VNode } from "./vnode";

export interface RendererOptions<HostNode = RendererNode> {
  createElement(type: string): HostNode;
  createText(text: string): HostNode;
  setElementText(node: HostNode, text: string): void;
  insert(child: HostNode, parent: HostNode, anchor?: HostNode): void;
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
  } = options;

  function renderVnode(vnode: VNode | string): RendererNode {
    if (typeof vnode === "string") return hostCreateText(vnode);
    const el = hostCreateElement(vnode.type);

    for (const child of vnode.children) {
      const childEl = renderVnode(child);
      hostInsert(childEl, el);
    }

    return el;
  }

  const render: RootRndererFunction = (message, container) => {
    const el = renderVnode(message);
    hostInsert(el, container);
  };

  return { render };
}
