# Quick Info Glossary

## プロジェクト概要

Quick Info Glossary は、高校生が情報技術とコンピュータサイエンスについて学ぶためのインタラクティブなウェブアプリケーションです。
このプラットフォームは、カテゴリーとサブカテゴリーに分類された包括的な用語集を提供し、詳細な説明とインタラクティブなクイズを含んでいます。

## 主な機能

- IT用語のカテゴリー別整理
- 各用語の詳細な説明
- 複雑な概念のためのインタラクティブな視覚化とデモ
- 理解度を確認するためのクイズ機能
- ユーザー認証（Google サインイン）
- お気に入り用語機能
- 様々なデバイスに対応したレスポンシブデザイン

## 使用技術

- React.js
- Next.js
- Tailwind CSS
- Firebase Authentication

## プロジェクト構造

プロジェクトは以下の主要コンポーネントで構成されています：

- `Header`: トップナビゲーション、検索機能、ユーザー認証を管理
- `TermList`: 用語、カテゴリー、サブカテゴリーのリストを表示
- `TermDetails`: 選択された用語の詳細情報を表示
- `Quiz`: 各用語に対するインタラクティブなクイズ機能を提供
- `MainComponents`: メインコンテンツエリアを統括し、カテゴリー、サブカテゴリー、用語の表示を管理
