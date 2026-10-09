# 설정 항목

frost는 설정 폴더의 `config.toml`에 설정을 저장합니다. 설정은 `frost init`, `frost config set`, `frost config edit`로 바꿀 수 있습니다.

## 설정 읽기와 바꾸기

| 명령어 | 동작 |
| --- | --- |
| `frost config` | 모든 설정을 보여 줍니다. `--show-secrets`를 붙이지 않으면 자격 증명은 가려집니다 |
| `frost config get <key>` | 설정 하나를 보여 줍니다. 목록은 한 줄에 한 항목씩 표시됩니다 |
| `frost config set <key> <value...>` | 설정 하나를 바꾸고, 무엇이 바뀌었는지 보여 줍니다 |
| `frost config edit [editor]` | 편집기에서 `config.toml`을 엽니다 |

예:

```sh
frost config get schedule.every
frost config set schedule.every 6h
frost config set paths ~/Documents ~/Pictures
```

- 목록은 항목마다 값을 하나씩 받으며, `set`은 목록 전체를 대체합니다.
- `true`와 `false`로 설정을 켜고 끕니다.
- `schedule.enabled`나 `schedule.every`를 바꾸면 예약 작업에 바로 반영됩니다.
- 스토리지 위치를 바꾸면 frost가 저장하기 전에 새 위치를 확인합니다. 자세한 내용은 [백업 옮기기](#moving-backups)를 참고하세요.

## 파일 편집하기

```sh
frost config edit
```

frost는 지정한 편집기에서 `config.toml`의 사본을 엽니다. 지정하지 않으면 `$VISUAL`이나 `$EDITOR`를 쓰고, 그것도 없으면 nano, vim, vi 중 하나를 씁니다. Windows에서는 메모장을 씁니다. 편집기를 닫으면 frost가 바뀐 내용을 보여 주고, `yes`를 입력하면 사본을 저장합니다.

파일을 해석할 수 없으면 frost가 이유를 알려 주고 다시 열지 묻습니다. 그래서 오타 하나로 예약된 백업이 멈추는 일은 없습니다. 알 수 없는 설정도 오류로 처리하므로, 이름을 잘못 쓴 설정이 그냥 지나가지 않습니다.

## 모든 설정

| 키 | 기본값 | 의미 |
| --- | --- | --- |
| `paths` | | 백업할 폴더 |
| `exclude` | `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `node_modules`, `.cache` | 제외할 이름과 패턴. [파일 제외](#excluding-files)를 참고하세요 |
| `schedule.enabled` | `true` | 자동으로 백업할지 |
| `schedule.every` | `daily` | `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily`, `weekly` 중 하나 |
| `verify.sample` | `20` | 표본 검사에서 내려받을 청크 수. `0`이면 검사를 끕니다 |
| `update.auto` | `true` | 예약된 백업 후 새 릴리스를 설치할지. `false`면 알려 주기만 합니다 |
| `storage.backend` | | `permafrost` 또는 `s3` |
| `storage.permafrost.url` | | 비워 두면 기본 서버를 씁니다. 그 밖에는 `https://` 주소, 또는 자신의 컴퓨터에서 도는 서버라면 `http://` 주소 |
| `storage.permafrost.token` | | Permafrost 액세스 키 |
| `storage.s3.endpoint` | | `s3.us-east-1.amazonaws.com` 등. 전체 `https://` 주소도 쓸 수 있으며, `http://` 주소를 쓰면 TLS가 꺼집니다 |
| `storage.s3.region` | | 제공업체가 리전을 쓰지 않으면 비워 둡니다 |
| `storage.s3.bucket` | | 버킷 이름. 미리 만들어 두어야 합니다 |
| `storage.s3.prefix` | `frost` | 백업을 담는 버킷 안의 폴더. 비워 두면 버킷 최상위입니다 |
| `storage.s3.access_key_id` | | 액세스 키 ID |
| `storage.s3.secret_access_key` | | 비밀 액세스 키 |
| `storage.s3.insecure` | `false` | 엔드포인트에 스킴이 없을 때 암호화하지 않은 HTTP를 씁니다. 로컬 테스트 전용입니다 |

## 환경 변수

| 변수 | 대체하는 설정 |
| --- | --- |
| `FROST_S3_ACCESS_KEY_ID` 또는 `AWS_ACCESS_KEY_ID` | `storage.s3.access_key_id` |
| `FROST_S3_SECRET_ACCESS_KEY` 또는 `AWS_SECRET_ACCESS_KEY` | `storage.s3.secret_access_key` |
| `FROST_PERMAFROST_TOKEN` | `storage.permafrost.token` |
| `FROST_CONFIG_DIR` | 설정 폴더. `--config-dir`와 같습니다 |
| `FROST_CACHE_DIR` | 캐시 폴더 |

frost는 환경 변수의 값을 `config.toml`에 쓰지 않습니다. 예약된 백업은 셸에서 설정한 변수를 볼 수 없으므로, `config.toml`에도 자격 증명이 있어야 합니다.
