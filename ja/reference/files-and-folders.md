# ファイルとフォルダ

frost は、アプリケーション、設定、キャッシュを、コンピュータ上の別々のフォルダに置いています。

## アプリケーション

| システム | アプリケーションフォルダ |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app` または `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

アプリケーションフォルダには、同梱のランタイムと、インストールした各バージョンが入っています。中身はそのままにしておいてください。

`frost` ランチャーは、インストール時に別のフォルダを選んでいなければ、macOS と Linux では `/usr/local/bin` か `~/.local/bin`、Windows では `~/bin` にあります。詳しくは[frost のインストール](#installing)を参照してください。

## 設定とキー

| ファイル | macOS と Linux | Windows |
| --- | --- | --- |
| 設定 | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| キー | `~/.config/frost/key` | `%AppData%\frost\key` |

## キャッシュ

| ファイル | macOS と Linux | Windows |
| --- | --- | --- |
| アップロード済みのものの記録 | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| バックアップを最後に開いた場所 | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| 最新のアップデート確認 | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| スケジュールされたバックアップのログ | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

systemd の場合、スケジュールされたバックアップのログは `frost.log` ではなくジャーナルに書き込まれます。スケジュールジョブの場所も含めて、[自動バックアップ](#scheduling)を参照してください。

アップロード済みのものの記録は、消えても問題ありません。削除すると、次のバックアップでストレージから作り直し、すべてのファイルを読み直します。復元にはこの記録は不要です。その隣には、2 つの frost プロセスが同時に書き込まないようにするための `.lock` ファイルがあります。ロックファイルを削除しても、実行中の frost は止まりません。

## フォルダを変える

macOS と Linux では、frost は `XDG_CONFIG_HOME` と `XDG_CACHE_HOME` に従います。`FROST_CONFIG_DIR` と `FROST_CACHE_DIR` はそれらより優先され、`--config-dir` は 1 回のコマンドだけ設定フォルダを変えます。

これらのフォルダを変えた場合は、スケジュールジョブにも反映されるように `frost init` をもう一度実行してください。
