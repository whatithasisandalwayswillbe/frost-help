# frost 제거

frost에는 제거 명령어가 없지만, 몇 단계면 지울 수 있습니다.

> frost를 제거해도 백업은 삭제되지 않습니다. 언젠가 되찾을 가능성이 있다면, 이 컴퓨터의 키를 지우기 전에 복구 문구를 가지고 있는지 꼭 확인하세요. `frost key show`로 볼 수 있습니다.

## 1. 예약 작업 제거하기

```sh
frost config set schedule.enabled false
```

이 명령어는 운영 체제 스케줄러에서 작업을 제거합니다. systemd를 쓰는 Linux에서는 frost가 직접 켰다고 기록한 경우에만 lingering을 다시 끕니다.

## 2. frost 파일 삭제하기

이 단계에서는 애플리케이션, 런처, 설정, 키, frost의 캐시를 삭제합니다. 위치를 바꾸었다면 아래 경로를 frost 자체의 파일과 폴더에 맞게 수정하세요. `FROST_CONFIG_DIR`과 `FROST_CACHE_DIR`은 frost 폴더를 직접 지정합니다. `XDG_CONFIG_HOME`, `XDG_CACHE_HOME`, `XDG_DATA_HOME`에서는 그 안의 `frost` 하위 폴더를 씁니다. XDG 루트나 공유 폴더 자체는 절대 삭제하지 마세요. 모든 위치는 [파일 및 폴더](#files-and-folders)에 정리되어 있습니다.

macOS:

```sh
rm -rf ~/Library/Application\ Support/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

Linux:

```sh
rm -rf ~/.local/share/frost ~/.config/frost ~/.cache/frost
rm -f /usr/local/bin/frost ~/.local/bin/frost
```

Windows에서는 PowerShell에서:

```powershell
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\frost", "$env:APPDATA\frost"
Remove-Item -Force "$HOME\bin\frost", "$HOME\bin\frost.cmd"
```

런처를 다른 곳에 설치했다면 그곳에서 삭제하세요.

## 3. 원한다면 백업도 삭제하기

백업은 직접 삭제하기 전까지 스토리지에 남아 있습니다. S3 제공업체를 쓴다면 버킷 안의 폴더 하나에 있으며, 다른 폴더를 고르지 않았다면 `frost`입니다. 이 폴더를 삭제하면 백업이 지워집니다. 복구 문구가 없으면 남은 내용은 누구도 읽을 수 없습니다.
