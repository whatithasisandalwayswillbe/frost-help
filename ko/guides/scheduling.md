# 자동 백업

frost는 운영 체제에 내장된 스케줄러를 이용해 정해진 일정에 백업합니다. 백업과 백업 사이에 백그라운드에서 돌아가는 것은 없습니다.

## 일정 바꾸기

`frost init`에서 백업 주기를 묻습니다. 나중에 바꾸려면 다음을 실행합니다.

```sh
frost config set schedule.every 6h
```

고를 수 있는 값은 `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily`, `weekly`입니다. 기본값은 `daily`입니다.

자동 백업을 끄거나 다시 켜려면 다음을 실행합니다.

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

어느 쪽이든 예약 작업에 바로 반영됩니다.

## 백업이 실행되는 시각

| 스케줄러 | 매일 | 매주 | 더 자주 |
| --- | --- | --- | --- |
| launchd(macOS)와 cron(Linux) | 03:17 | 일요일 03:17 | 매시 17분 |
| 작업 스케줄러(Windows) | 03:17 | 일요일 03:17 | 작업을 등록한 시각부터 몇 시간마다 |
| systemd(Linux) | 자정 | 월요일 자정 | 매시 정각 |

시각은 컴퓨터의 현지 시각 기준입니다. systemd는 각 실행을 최대 5분까지 무작위로 늦춰 시작합니다.

## 놓친 백업

launchd와 systemd는 놓친 백업을 따라잡습니다. 백업할 시각에 컴퓨터가 꺼져 있거나 잠자기 상태였다면, 깨어났을 때 백업을 실행합니다. cron과 작업 스케줄러는 놓친 실행을 건너뛰고, 다음 실행은 제시간에 합니다.

Windows에서는 컴퓨터가 배터리로 동작하는 동안 예약된 백업을 시작하지 않고, 전원을 뽑으면 중단합니다. macOS와 systemd에서는 예약된 백업이 낮은 우선순위로 실행되므로 컴퓨터가 느려지지 않습니다.

## 예약 작업

| 시스템 | 스케줄러 | 작업 |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| systemd를 쓰는 Linux | systemd 사용자 타이머 | `~/.config/systemd/user/frost-backup.service`와 `frost-backup.timer` |
| systemd를 쓰지 않는 Linux | cron | crontab에서 `# frost-backup` 표시가 붙은 한 줄 |
| Windows | 작업 스케줄러 | `frost backup`이라는 이름의 작업 |

작업은 등록할 때 쓰던 설정 폴더와 캐시 폴더로 `frost backup`을 실행합니다. 이 폴더를 바꿨다면 `frost init`을 다시 실행하세요.

macOS에서는 이 작업이 시스템 설정 > 일반 > 로그인 항목 및 확장 프로그램(System Settings > General > Login Items & Extensions)에 **Node.js Foundation**이라는 이름으로 표시됩니다. frost에 포함된 런타임의 배포자입니다. 이곳에서 끄면 예약된 백업이 멈추고, `frost status`는 작업이 없다고 보고합니다. 예약된 백업을 멈추려면 대신 `frost config set schedule.enabled false`를 쓰세요.

systemd에서는 로그아웃한 동안에도 백업이 실행되도록 frost가 사용자의 lingering을 켭니다(`loginctl enable-linger`). 타이머를 제거할 때는 lingering을 다시 끕니다. 단, frost를 쓰기 전부터 켜져 있었다면 그대로 둡니다.

## 로그

| 스케줄러 | 로그 위치 |
| --- | --- |
| launchd, cron, 작업 스케줄러 | frost 캐시 폴더의 `frost.log`. [파일 및 폴더](#files-and-folders)를 참고하세요 |
| systemd | 저널. `journalctl --user -u frost-backup`으로 볼 수 있습니다 |

1 MiB를 넘는 로그는 다음 실행 전에 비워집니다. 마지막 백업의 성공 여부는 `frost status`에서도 볼 수 있습니다.

## 작업이 사라졌을 때

작업이 삭제되거나 꺼지면 `frost status`에 "scheduled job is missing"(예약 작업이 없음)이 표시됩니다. 다음 명령어로 되살릴 수 있습니다.

```sh
frost config set schedule.enabled true
```
