export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
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
  const { setElementText: hostSetElementText } = options;

  const render: RootRndererFunction = (message, container) => {
    hostSetElementText(container, message); // 今回はメッセージを挿入するだけ
  };

  return { render };
}
