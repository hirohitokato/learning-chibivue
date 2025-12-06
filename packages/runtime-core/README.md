# runtime-core

## 概要

`runtime-core` はランタイムのプラットフォーム非依存なコア実装をまとめたパッケージです。主に次の要素を提供します。

- リアクティブ更新のスケジューリング（更新キュー）
- コンポーネントのインスタンス化とライフサイクル管理
- 仮想ノード（VNode）構造と差分（patch）ロジックの抽象
- レンダラ用の抽象インターフェース型（`RendererOptions`）と `createRenderer`

## 主な責務

- コンポーネントの作成／マウント／アンマウントの管理
- VNode の生成と再帰的なレンダリングロジック（`createRenderer` が使う）
- プラットフォーム抽象（ノード生成や挿入、プロパティ更新など）を定義すること

## 設計方針

- プラットフォーム非依存: DOM API を直接参照しない。ホスト固有の実装は別パッケージに委譲する。
- 小さく単純に: コア API は最小限に保ち、実装の差し替えを容易にする。
- テストしやすさ: ロジックを分離してユニットテストが書きやすい構造にする。

## 主要ファイル（参照）

- `apiCreateApp.ts` — `createApp` API の実装（`render` を受け取りアプリを構成）
- `renderer.ts` — `RendererOptions` 型と `createRenderer` の実装（レンダリングフロー）
- `index.ts` — パッケージのエントリ（型エクスポート等）

## 実装の境界（何を行わないか）

- DOM の直接操作（`document.createElement` 等）は行わない。
- ブラウザ固有のイベントの最適化や属性の扱いは具象実装側（例: `runtime-dom`）で行う。

## 他パッケージとの連携（高レベル）

1. `runtime-core` の `createRenderer` は `RendererOptions`（`createElement`, `createText`, `insert`, `setElementText`, `patchProp` など）を受け取る。
2. `runtime-dom` のような具象実装は `nodeOps`（`createElement`, `createText`, `insert`, `setElementText` を含む）と `patchProp` を実装して渡す。
3. `runtime-dom/index.ts` は `createRenderer({ ...nodeOps, patchProp })` のようにしてレンダラを生成する。

## 開発者向けメモ

- 新しいプラットフォームを追加する場合は、`RendererOptions` に沿って `nodeOps` 相当と `patchProp` を実装し、`createRenderer` に渡してください。
- 読む順序の推奨: `apiCreateApp.ts` → `renderer.ts` → `index.ts`。
- コードを読む際はまず `apiCreateApp.ts` → `index.ts` → `component.ts` の順で追うと理解しやすいです。
