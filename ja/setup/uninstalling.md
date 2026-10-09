# frost のアンインストール

frost にはアンインストール用のコマンドはありませんが、数ステップで削除できます。

> frost をアンインストールしても、バックアップは削除されません。いつか取り戻す可能性があるなら、このコンピュータのキーを削除する前に、リカバリーフレーズが手元にあることを確認してください。`frost key show` で表示できます。

## 1. スケジュールジョブを削除する

```sh
frost config set schedule.enabled false
```

これで、OS のスケジューラからジョブが削除されます。systemd を使う Linux では、frost 自身が有効にしたと記録している場合は、lingering も無効に戻します。

## 2. frost のファイルを削除する

この手順で、アプリケーション、ランチャー、設定、キー、frost のキャッシュを削除します。場所を変えた場合は、以下のパスを frost 自身のファイルやフォルダに合わせて変更してください。`FROST_CONFIG_DIR` と `FROST_CACHE_DIR` は frost のフォルダを直接指定します。`XDG_CONFIG_HOME`、`XDG_CACHE_HOME`、`XDG_DATA_HOME` では、その中の `frost` サブフォルダを使います。XDG のルートフォルダや共有フォルダそのものは、決して削除しないでください。すべての場所は[ファイルとフォルダ](#files-and-folders)にまとめています。

macOS の場合:

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

Linux の場合:

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

Windows の場合は PowerShell で:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd"
```

ランチャーを別の場所にインストールした場合は、そこから削除してください。

## 3. 必要ならバックアップも削除する

バックアップは、削除するまでストレージに残ります。S3 プロバイダーの場合は、バケット内の 1 つのフォルダにあります。別のフォルダを選んでいなければ `frost` です。バックアップを消すにはこのフォルダを削除します。リカバリーフレーズがなければ、残ったデータを誰も読むことはできません。
