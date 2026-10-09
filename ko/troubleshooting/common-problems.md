# 자주 발생하는 문제

이 페이지에는 자주 보는 메시지와 문제를 모았습니다. 각 제목은 frost가 표시하는 메시지이거나, 사용자가 겪는 증상입니다.

## "frost isn't set up yet, run `frost init`"

frost가 `config.toml`을 찾지 못했습니다. `frost init`을 실행하세요. `--config-dir`나 `FROST_CONFIG_DIR`을 쓴다면 올바른 폴더를 가리키는지 확인하세요.

## "no key on this machine"

키 파일이 없습니다. 이 컴퓨터에 스토리지가 이미 설정되어 있다면 `frost key import`를 실행하고 복구 문구를 입력하세요. 그렇지 않다면 `frost init`을 실행하세요.

## "a backup or restore is already running"

다른 frost 프로세스가 백업을 사용하고 있습니다. 대개 예약된 백업입니다. 끝날 때까지 기다렸다가 다시 시도하세요. frost의 잠금 파일을 지워도 그 프로세스는 멈추지 않습니다.

## "the key on this machine doesn't match"

스토리지에 다른 키로 만든 백업이 있습니다. `frost key verify`를 실행하고 적어 둔 복구 문구를 입력해 어떤 키인지 확인하세요. 올바른 키라면 그 문구로 `frost key import`를 실행하세요.

## frost가 백업을 찾지 못함

"has no frost repository" 같은 메시지는 frost가 찾는 곳에 백업이 없다는 뜻입니다. 오류에는 백업을 마지막으로 연 위치와 되돌아가는 방법이 표시됩니다. 자세한 내용은 [백업 옮기기](#moving-backups)를 참고하세요.

## 설정 도우미가 연결하지 못함

설정 도우미는 문제를 설명하고, 원인일 가능성이 가장 큰 답으로 돌아갑니다.

| 설정 도우미의 메시지 | 확인할 것 |
| --- | --- |
| That access key ID wasn't recognised | 액세스 키 ID를 빠짐없이 복사했는지 |
| The secret key doesn't match the access key ID | 비밀 키를 빠짐없이 복사했는지, 그 키 ID의 것인지 |
| There's no bucket with that name | 버킷 이름. 또는 버킷을 먼저 만드세요 |
| That key doesn't have the bucket permissions frost needs | 키에 버킷 객체의 읽기, 조회, 쓰기, 삭제 권한이 있는지 |
| The bucket is in a different region | 리전 또는 엔드포인트 |
| Can't find ... | 주소와 인터넷 연결 |
| Nothing answered at that address | 주소와 포트 |
| The server's certificate isn't valid for that address | 주소, 그리고 서버 인증서가 그 주소를 포함하는지 |
| the storage didn't answer in time | 인터넷 연결. 그런 다음 다시 시도하세요 |

## "This storage doesn't support conditional writes"

컴퓨터끼리 서로의 백업 기록을 덮어쓰지 않도록 frost에 필요한 기능을 제공업체가 지원하지 않습니다. 키나 설정을 바꿔도 해결되지 않습니다. 다른 제공업체를 고르세요. 자세한 내용은 [스토리지 선택](#choosing-storage)을 참고하세요.

## "the Permafrost access key was rejected"

키가 잘못되었거나 만료되었을 수 있습니다. `frost init`을 실행해 스토리지를 다시 설정하고 작동하는 키를 받으세요. 자세한 내용은 [Permafrost](#permafrost)를 참고하세요.

## 백업이 폴더를 읽지 못함

macOS에서는 대개 개인정보 보호 권한 문제입니다. 오류에 무엇을 허용해야 하는지 나옵니다. 자세한 내용은 [macOS 권한](#macos-permissions)을 참고하세요. 다른 시스템에서는 사용자가 그 폴더를 읽을 수 있는지 확인하세요.

## "couldn't be read"로 표시된 파일

frost는 그 파일들을 건너뛰고 나머지를 저장했습니다. 흔한 원인은 읽기 권한이 없는 파일, 백업 중에 삭제된 파일, 그리고 macOS에서 iCloud가 온라인에만 보관하는 파일입니다.

## "kept changing while they were read"로 표시된 파일

백업하는 동안 어떤 프로그램이 그 파일에 쓰고 있었기 때문에, 스냅샷에는 이전 사본이 남았습니다. 프로그램을 닫고 다시 백업하거나, 다음 백업에 맡기세요.

## 폴더가 "not found"로 표시됨

목록에 있는 폴더가 없어서 frost가 나머지만 백업했습니다. 드라이브를 다시 연결하거나, 폴더를 옮겼다면 `frost init`으로 목록을 고치세요.

## "scheduled job is missing"

예약 작업이 삭제되었거나 꺼졌습니다. `frost config set schedule.enabled true`로 되살리세요.

## 예약된 백업이 실행되지 않음

- `frost status`의 "next backup" 줄을 확인하세요.
- macOS에서는 시스템 설정 > 일반 > 로그인 항목 및 확장 프로그램(System Settings > General > Login Items & Extensions)에서 frost의 스위치를 확인하세요. Node.js Foundation이라는 이름으로 표시됩니다.
- Windows에서는 예약된 백업을 실행하려면 로그인한 상태여야 하며, 배터리로 동작하는 동안에는 실행되지 않습니다.
- cron이나 작업 스케줄러에서는 컴퓨터가 꺼져 있거나 잠자기 상태일 때 예정된 백업을 건너뜁니다.
- 로그를 확인하세요. 자세한 내용은 [자동 백업](#scheduling)을 참고하세요.

## "verification failed"

표본 검사에서 스토리지의 데이터가 빠졌거나 손상된 것을 발견했습니다. 자세한 내용은 [백업 확인](#checking-backups)을 참고하세요.

## "can't restore beside the originals"

원본 옆의 폴더를 쓸 수 없습니다. 스냅샷이 다른 컴퓨터에서 온 경우가 많습니다. 대신 `--to <dir>`를 쓰세요. 자세한 내용은 [파일 복원](#restoring)을 참고하세요.

## "can't overwrite the originals"

스냅샷이 다른 종류의 컴퓨터에서 왔거나, 원본으로 가는 경로가 frost가 신뢰하지 않는 링크를 거칩니다. 대신 `--beside`나 `--to <dir>`를 쓰세요.

## 지정한 스냅샷을 찾지 못함

| frost의 메시지 | 시도할 것 |
| --- | --- |
| no snapshot at or before ... | 더 나중의 시각. 메시지에 가장 오래된 스냅샷이 표시됩니다 |
| "maple" matches 2 snapshots, use more of the ID | `maple-absurd`처럼 ID를 더 길게 입력하기 |
| can't read "..." as a snapshot ID or time | `"3 days ago"`처럼 공백이 있는 시각을 따옴표로 감싸기 |

## frost가 스스로 업데이트하지 못함

frost를 패키지 관리자로 설치했거나, 폴더에 쓸 수 없거나, 소스에서 빌드한 경우입니다. 자세한 내용은 [frost 업데이트](#updating)를 참고하세요.

## 설치 프로그램이 멈춤

| 설치 프로그램의 메시지 | 할 일 |
| --- | --- |
| need OpenSSH 8.1+ to verify the frost release signature | OpenSSH를 설치하거나 업데이트하세요. Windows에서는 Git for Windows에 포함되어 있습니다 |
| checksums.txt isn't signed by the frost release key. Don't install this. | 설치하지 마세요. 나중에 다시 시도하고, 계속 발생하면 [신고](#getting-help)하세요 |
| checksum mismatch | 내려받은 파일이 손상되었습니다. 설치 프로그램을 다시 실행하세요 |
| 32-bit ARM isn't supported by the bundled runtime | 이 컴퓨터용 frost 패키지는 없습니다 |
