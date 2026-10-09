# 명령어

frost에는 명령어가 8개 있습니다. `frost -h`로 모든 명령어와 옵션을 볼 수 있습니다.

## 공통 옵션

모든 명령어에서 쓸 수 있습니다.

| 옵션 | 동작 |
| --- | --- |
| `--config-dir <dir>` | 다른 설정 폴더를 사용합니다 |
| `-h`, `--help` | 모든 명령어와 옵션이 담긴 도움말을 보여 줍니다 |
| `-v`, `--version` | frost 버전을 보여 줍니다. 명령어보다 앞에 써야 합니다 |

## frost init

무엇을, 어디에, 얼마나 자주 백업할지 frost를 설정합니다. 설정을 다시 보거나 바꾸려면 다시 실행하세요. 자세한 내용은 [frost 설정](#setting-up)을 참고하세요.

```sh
frost init
```

## frost backup

지금 바로 백업합니다. 자세한 내용은 [백업](#backing-up)을 참고하세요.

```sh
frost backup [--dry-run] [--path <dir>] [--exclude <pattern>] [--no-verify]
```

| 옵션 | 동작 |
| --- | --- |
| `-n`, `--dry-run` | 무엇을 업로드할지 보여 주기만 하고 실제로는 업로드하지 않습니다 |
| `--path <dir>` | 평소 폴더 대신 이 폴더를 백업합니다. 여러 번 쓸 수 있습니다 |
| `--exclude <pattern>` | 이 패턴과 일치하는 파일도 제외합니다. 여러 번 쓸 수 있습니다 |
| `--no-verify` | 백업 후 표본 검사를 건너뜁니다 |

## frost restore

스냅샷에서 파일을 되찾습니다. 인자 없이 실행하면 스냅샷 브라우저가 열립니다. 자세한 내용은 [파일 복원](#restoring)을 참고하세요.

```sh
frost restore [snapshot] [paths...] --beside | --to <dir> | --overwrite
```

| 옵션 | 동작 |
| --- | --- |
| `--beside` | 원본 옆의 새 폴더에 복원합니다 |
| `--to <dir>` | 지정한 폴더 안의 새 폴더에 복원합니다 |
| `--overwrite` | 원본 위에 복원해 그곳에 있는 것을 대체합니다. 먼저 확인합니다 |
| `-y`, `--yes` | 덮어쓰기 전에 확인하지 않습니다 |

## frost status

최근 스냅샷, 일정, 백업 상태를 보여 줍니다. 자세한 내용은 [백업 확인](#checking-backups)을 참고하세요.

```sh
frost status [--verify] [--all]
```

| 옵션 | 동작 |
| --- | --- |
| `--verify` | 먼저 새로 검사합니다 |
| `-a`, `--all` | 최신 10개만이 아니라 모든 스냅샷을 보여 줍니다 |

## frost browse

스냅샷 브라우저를 엽니다. 자세한 내용은 [스냅샷 브라우저](#snapshot-browser)를 참고하세요.

```sh
frost browse
```

## frost config

설정 도우미를 다시 거치지 않고 설정을 읽거나 바꿉니다. 자세한 내용은 [설정 항목](#settings)을 참고하세요.

```sh
frost config [--show-secrets]
frost config get <key> [--show-secrets]
frost config set <key> <value...>
frost config edit [editor]
```

| 옵션 | 동작 |
| --- | --- |
| `--show-secrets` | 자격 증명을 가리지 않고 전부 보여 줍니다 |

## frost key

복구 문구를 보여 주거나, 확인하거나, 가져옵니다. 자세한 내용은 [복구 문구](#recovery-phrase)를 참고하세요.

```sh
frost key show
frost key verify
frost key import
```

## frost update

frost를 최신 릴리스로 업데이트합니다. 자세한 내용은 [frost 업데이트](#updating)를 참고하세요.

```sh
frost update [--check]
```

| 옵션 | 동작 |
| --- | --- |
| `--check` | 새 릴리스가 있는지만 알려 줍니다 |

## 종료 코드

frost는 명령어가 성공하면 `0`, 오류가 나면 `1`로 종료합니다. 백업이나 `frost status --verify`의 검사에서 문제가 발견된 경우도 오류에 포함되므로, 스크립트에서 결과를 확인할 수 있습니다.

```sh
frost status --verify || echo "frost check failed" >&2
```
