# 自動バックアップ

frost は、OS に備わっているスケジューラを使って定期的にバックアップします。バックアップとバックアップの間に、バックグラウンドで動き続けるものはありません。

## スケジュールを変更する

バックアップの頻度は `frost init` で尋ねられます。あとで変更するには、次を実行します。

```sh
frost config set schedule.every 6h
```

選べるのは `hourly`、`2h`、`3h`、`4h`、`6h`、`8h`、`12h`、`daily`、`weekly` です。既定は `daily` です。

自動バックアップをオフにしたり、もう一度オンにしたりするには、次を実行します。

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

どちらの変更も、すぐにスケジュールジョブに反映されます。

## バックアップが実行される時刻

| スケジューラ | 毎日 | 毎週 | それより頻繁 |
| --- | --- | --- | --- |
| launchd (macOS) と cron (Linux) | 03:17 | 日曜日の 03:17 | 毎時 17 分 |
| タスク スケジューラ (Windows) | 03:17 | 日曜日の 03:17 | ジョブを登録した時刻から数えて数時間ごと |
| systemd (Linux) | 午前 0 時 | 月曜日の午前 0 時 | 毎時 0 分 |

時刻はコンピュータのローカル時刻です。systemd では、それぞれの実行が最大 5 分、ランダムに遅れて始まります。

## 実行されなかったバックアップ

launchd と systemd は、逃した分を追いかけて実行します。予定の時刻にコンピュータの電源が切れていたりスリープしていたりした場合、起動したときにバックアップを実行します。cron とタスク スケジューラは逃した分をとばし、次回は予定どおりに実行します。

Windows では、サインインしている間だけスケジュールされたバックアップが実行されます。バッテリーで動いている間はスケジュールされたバックアップを始めず、電源を外すと中止します。macOS と systemd では、スケジュールされたバックアップは低い優先度で動くので、コンピュータが重くなりにくくなっています。

## スケジュールジョブ

| システム | スケジューラ | ジョブ |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| systemd を使う Linux | systemd のユーザータイマー | `~/.config/systemd/user/frost-backup.service` と `frost-backup.timer` |
| systemd を使わない Linux | cron | crontab 内の、`# frost-backup` という印が付いた行 |
| Windows | タスク スケジューラ | `frost backup` という名前のタスク |

ジョブは、登録したときの設定フォルダとキャッシュフォルダを使って `frost backup` を実行します。これらのフォルダを変えた場合は、`frost init` をもう一度実行してください。

macOS では、ジョブはシステム設定 > 一般 > ログイン項目と機能拡張 (System Settings > General > Login Items & Extensions) に **Node.js Foundation** という名前で表示されます。これは frost に同梱しているランタイムの発行元です。ここでオフにするとスケジュールされたバックアップが止まり、`frost status` はジョブが見つからないと報告します。スケジュールされたバックアップを止めたいときは、代わりに `frost config set schedule.enabled false` を使ってください。

systemd では、lingering が無効だと確認できた場合に、frost がユーザーの lingering を有効にしようとします (`loginctl enable-linger`)。lingering によって、ログアウト中もバックアップを実行できます。有効にできなければ、ログアウト後はバックアップが動かなくなることがあります。タイマーを削除するときに lingering を無効に戻すのは、frost 自身が有効にしたと記録している場合だけです。

## ログ

| スケジューラ | ログの場所 |
| --- | --- |
| launchd、cron、タスク スケジューラ | frost のキャッシュフォルダにある `frost.log`。[ファイルとフォルダ](#files-and-folders)を参照してください |
| systemd | ジャーナル。`journalctl --user -u frost-backup` で読めます |

1 MiB を超えたログは、次の実行の前に空になります。前回のバックアップが成功したかどうかは、`frost status` でも確認できます。

## ジョブがなくなった場合

ジョブが削除されたりオフになったりすると、`frost status` に "scheduled job is missing" (スケジュールジョブが見つかりません) と表示されます。次のコマンドで元に戻せます。

```sh
frost config set schedule.enabled true
```
