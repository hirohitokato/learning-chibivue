import { RendererOptions } from "../runtime-core";

export const nodeOps: Omit<RendererOptions<Node, Element>, "patchProp"> = {
  // メモ: Omitとは、型から特定のプロパティを除外するユーティリティ型
  // patchPropは意図的に別ファイルで実装しているため、ここでは除外している
  createElement: (type: string): Node => {
    return document.createElement(type);
  },

  createText: (text: string): Node => {
    return document.createTextNode(text);
  },

  setText(node: Node, text: string): void {
    node.nodeValue = text;
  },

  setElementText(node: Node, text: string) {
    node.textContent = text;
  },

  insert: (child: Node, parent: Node, anchor?: Node | undefined): void => {
    parent.insertBefore(child, anchor || null);
  },
};
