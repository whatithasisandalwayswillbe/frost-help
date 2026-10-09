# 파일 및 폴더

frost는 애플리케이션, 설정, 캐시를 컴퓨터의 서로 다른 폴더에 둡니다.

## 애플리케이션

| 시스템 | 애플리케이션 폴더 |
| --- | --- |
| macOS | `~/Library/Application Support/frost/app` |
| Linux | `~/.local/share/frost/app` 또는 `$XDG_DATA_HOME/frost/app` |
| Windows | `%LocalAppData%\frost\app` |

애플리케이션 폴더에는 포함된 런타임과 설치된 각 버전이 들어 있습니다. 내용을 그대로 두세요.

`frost` 런처는 설치할 때 다른 폴더를 고르지 않았다면 macOS와 Linux에서는 `/usr/local/bin`이나 `~/.local/bin`에, Windows에서는 `~/bin`에 있습니다. 자세한 내용은 [frost 설치](#installing)를 참고하세요.

## 설정과 키

| 파일 | macOS와 Linux | Windows |
| --- | --- | --- |
| 설정 | `~/.config/frost/config.toml` | `%AppData%\frost\config.toml` |
| 키 | `~/.config/frost/key` | `%AppData%\frost\key` |

## 캐시

| 파일 | macOS와 Linux | Windows |
| --- | --- | --- |
| 업로드한 내용의 기록 | `~/.cache/frost/manifest-<repo>.jsonl` | `%LocalAppData%\frost\manifest-<repo>.jsonl` |
| 백업을 마지막으로 연 위치 | `~/.cache/frost/storage-<config>.json` | `%LocalAppData%\frost\storage-<config>.json` |
| 마지막 업데이트 확인 | `~/.cache/frost/update.json` | `%LocalAppData%\frost\update.json` |
| 예약된 백업 로그 | `~/.cache/frost/frost.log` | `%LocalAppData%\frost\frost.log` |

systemd를 쓰면 예약된 백업의 로그는 `frost.log`가 아니라 저널에 기록됩니다. 예약 작업의 위치도 함께 [자동 백업](#scheduling)에서 확인하세요.

업로드한 내용의 기록은 없어져도 괜찮습니다. 지우면 다음 백업에서 스토리지를 바탕으로 다시 만들고 모든 파일을 다시 읽습니다. 복원에는 필요하지 않습니다. 그 옆에는 두 frost 프로세스가 동시에 쓰지 못하게 막는 `.lock` 파일이 있습니다. 잠금 파일을 지워도 실행 중인 frost는 멈추지 않습니다.

## 폴더 바꾸기

macOS와 Linux에서 frost는 `XDG_CONFIG_HOME`과 `XDG_CACHE_HOME`을 따릅니다. `FROST_CONFIG_DIR`과 `FROST_CACHE_DIR`이 이 둘보다 우선하며, `--config-dir`는 명령어 한 번에 한해 설정 폴더를 바꿉니다.

이 폴더를 바꿨다면 예약 작업에도 반영되도록 `frost init`을 다시 실행하세요.
