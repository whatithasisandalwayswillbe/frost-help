# コマンド

frost には 8 つのコマンドがあります。`frost -h` で、すべてのコマンドとオプションを一覧できます。

## 共通オプション

どのコマンドでも使えます。

| オプション | 動作 |
| --- | --- |
| `--config-dir <dir>` | 別の設定フォルダを使います |
| `-h`, `--help` | すべてのコマンドとオプションを含むヘルプを表示します |
| `-v`, `--version` | frost のバージョンを表示します。コマンドより前に置いてください |

## frost init

frost を設定します。何を、どこに、どのくらいの頻度でバックアップするかを決めます。設定を見直したり変えたりするときは、もう一度実行します。詳しくは[frost の設定](#setting-up)を参照してください。

```sh
frost init
```

## frost backup

今すぐバックアップします。詳しくは[バックアップ](#backing-up)を参照してください。

```sh
frost backup [--dry-run] [--path <dir>] [--exclude <pattern>] [--no-verify]
```

| オプション | 動作 |
| --- | --- |
| `-n`, `--dry-run` | 何をアップロードするかを表示し、実際にはアップロードしません |
| `--path <dir>` | いつものフォルダの代わりに、このフォルダをバックアップします。繰り返し指定できます |
| `--exclude <pattern>` | このパターンに一致するファイルも除外します。繰り返し指定できます |
| `--no-verify` | バックアップ後の抜き取りチェックを省略します |

## frost restore

スナップショットからファイルを取り戻します。引数なしで実行すると、スナップショットブラウザが開きます。詳しくは[ファイルの復元](#restoring)を参照してください。

```sh
frost restore [snapshot] [paths...] --beside | --to <dir> | --overwrite
```

| オプション | 動作 |
| --- | --- |
| `--beside` | 元のファイルの隣の新しいフォルダに復元します |
| `--to <dir>` | 指定したフォルダの中の新しいフォルダに復元します |
| `--overwrite` | 元のファイルに上書きして復元し、そこにあるものを置き換えます。事前に確認します |
| `-y`, `--yes` | 上書きの前に確認しません |

## frost status

最近のスナップショット、スケジュール、バックアップの健全性を表示します。詳しくは[バックアップの確認](#checking-backups)を参照してください。

```sh
frost status [--verify] [--all]
```

| オプション | 動作 |
| --- | --- |
| `--verify` | 先に新しくチェックを行います |
| `-a`, `--all` | 最新の 10 個だけでなく、すべてのスナップショットを表示します |

## frost browse

スナップショットブラウザを開きます。詳しくは[スナップショットブラウザ](#snapshot-browser)を参照してください。

```sh
frost browse
```

## frost config

セットアップをやり直さずに、設定を読んだり変えたりします。詳しくは[設定項目](#settings)を参照してください。

```sh
frost config [--show-secrets]
frost config get <key> [--show-secrets]
frost config set <key> <value...>
frost config edit [editor]
```

| オプション | 動作 |
| --- | --- |
| `--show-secrets` | 認証情報を伏せずに、すべて表示します |

## frost key

リカバリーフレーズを表示、確認、取り込みします。詳しくは[リカバリーフレーズ](#recovery-phrase)を参照してください。

```sh
frost key show
frost key verify
frost key import
```

## frost update

frost を最新のリリースにアップデートします。詳しくは[frost のアップデート](#updating)を参照してください。

```sh
frost update [--check]
```

| オプション | 動作 |
| --- | --- |
| `--check` | 新しいリリースがあるかどうかだけを表示します |

## 終了コード

frost は、コマンドが成功すると `0`、エラーが起きると `1` で終了します。バックアップや `frost status --verify` のチェックで問題が見つかった場合もエラーとして扱うので、スクリプトで結果を判定できます。

```sh
frost status --verify || echo "frost check failed" >&2
```
