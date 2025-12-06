# runtime-dom

## 概要

`runtime-dom` はブラウザ上で動作するための具象プラットフォーム実装を提供します。`runtime-core` が定義するレンダラ抽象（ノードの生成、属性更新、イベント登録、ノード差し替え等）を DOM API で満たす役割を持ちます。

## 責務

- HTML DOM ノードの作成・破棄
- 属性／プロパティの差し替え・更新
- イベントリスナーの登録・解除
- テキストノード／コメントノードの管理
- プラットフォーム固有の最適化（バブリング最適化、イベントハンドリングの委譲など）

## 主な実装ファイル

- `index.ts`: runtime-dom のエントリ。`runtime-core` のレンダラ抽象に具象実装を渡してレンダラを生成するコードが置かれる。
- `nodeOps.ts`: DOM 上の低レベル操作（createElement, insert, remove, setAttribute など）を集約したモジュール。

## core との接続方法（高レベル）

1. `runtime-dom` は `nodeOps` や `patchProp` のような関数を提供する。
2. これらを `runtime-core` のレンダラ生成ロジックに渡すことで、コアの `render` / `patch` が DOM に反映される。

簡易的な例（擬似コード）:

```ts
// runtime-dom/index.ts
import { createRenderer } from "../runtime-core";
import { nodeOps, patchProp } from "./nodeOps";

const renderer = createRenderer({ nodeOps, patchProp });
export const createApp = (rootComponent) => renderer.createApp(rootComponent);
```

## 注意点・開発メモ

- DOM 実装はブラウザ固有の挙動やエッジケース（例: 属性とプロパティの違い、SVG の扱い等）に注意する。
- イベント登録はデリゲーション（委譲）でまとめるとパフォーマンス上有利になる場合がある。
- 新しい DOM 機能を使うときは `runtime-core` の期待するインターフェースに影響がないか確認する。

```

```
