import { RendererOptions } from "../runtime-core";

export const nodeOps: RendererOptions<Node> = {
  createElement: (type: string): Node => {
    return document.createElement(type);
  },

  createText: (text: string): Node => {
    return document.createTextNode(text);
  },

  setElementText(node: Node, text: string) {
    node.textContent = text;
  },

  insert: (child: Node, parent: Node, anchor?: Node | undefined): void => {
    parent.insertBefore(child, anchor || null);
  },
};
