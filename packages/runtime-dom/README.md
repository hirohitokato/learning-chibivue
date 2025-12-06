# runtime-dom

## 概要

`runtime-dom` はブラウザ（DOM）向けの具象実装をまとめたパッケージです。`runtime-core` のレンダラ抽象を満たすために、低レベルのノード操作（`nodeOps`）とプロパティ差分適用関数（`patchProp`）を提供します。

## 主な責務

- DOM ノードの生成・挿入・削除（`createElement`, `createText`, `insert`, `setElementText`）
- 属性・プロパティの設定や削除（`patchProp` 経由で `modules/attrs.ts` を使用）
- イベントリスナーの登録と更新（`modules/events.ts` を使用して冪等に管理）
- テキストノードやコメントノードの管理

## 主要ファイル（参照）

- `index.ts` — `createRenderer({ ...nodeOps, patchProp })` を呼び出してレンダラを組み立て、`createApp` をエクスポートします。
- `nodeOps.ts` — DOM の低レベル操作（実際は `Omit<RendererOptions, 'patchProp'>` 型で宣言）
- `patchProp.ts` — `RendererOptions['patchProp']` と互換のある関数。内部で `modules/attrs.ts` と `modules/events.ts` を使って属性／イベントを分けて処理します。
- `modules/attrs.ts`, `modules/events.ts` — 属性更新とイベント管理の補助モジュール。

## core との接続（高レベル）

1. `runtime-dom` は `nodeOps`（ノード操作群）と `patchProp` を実装する。
2. `runtime-dom/index.ts` で `createRenderer({ ...nodeOps, patchProp })` として渡すと、`runtime-core` の `createRenderer` が DOM と連携したレンダラを作成します。

簡易的な接続例（実際は `runtime-dom/index.ts` を参照してください）:

```ts
import { createRenderer } from "../runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

const { render } = createRenderer({ ...nodeOps, patchProp });
```

## 実装上の注意点

- `patchProp` は `onClick` のようなイベントハンドラ名を判別して `modules/events.ts` を使います（`isOn` の正規表現に基づく）。
- `modules/events.ts` は要素ごとに invoker を保持して、イベントの再登録を避ける工夫をしています（`_vei` フィールド）。
- SVG や属性/プロパティの違いなど、DOM の細かい挙動はここで扱う必要があります。

## 開発者向けメモ

- 新しい機能を追加するときは、まず `runtime-core/renderer.ts` の `RendererOptions` の契約を確認してください。
- `nodeOps` は `Omit<RendererOptions, 'patchProp'>` 型で定義されているため、`patchProp` は別ファイルで実装してから `createRenderer` に合成してください。
