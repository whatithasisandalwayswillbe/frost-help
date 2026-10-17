# 자동 백업

frost는 운영 체제에 내장된 스케줄러를 이용해 정해진 일정에 백업합니다. 백업과 백업 사이에 백그라운드에서 돌아가는 것은 없습니다.

## 일정 바꾸기

`frost init`에서 백업 주기를 묻습니다. 나중에 바꾸려면 다음을 실행합니다.

```sh
frost config set schedule.every 6h
```

고를 수 있는 값은 `hourly`, `2h`, `3h`, `4h`, `6h`, `8h`, `12h`, `daily`, `weekly`입니다. 기본값은 `daily`입니다.

백업 시각을 정하려면 24시간제로 시각을 설정하고, 매주 백업이라면 요일도 설정합니다.

```sh
frost config set schedule.time 09:30
frost config set schedule.day friday
```

기본값은 `15:00`, `sunday`입니다. 자동 백업을 끄거나 다시 켜려면 다음을 실행합니다.

```sh
frost config set schedule.enabled false
frost config set schedule.enabled true
```

어떤 변경이든 예약 작업에 바로 반영됩니다. macOS와 Windows에서는 예약 백업 중에 한 변경이 그 백업이 끝나는 대로 반영됩니다. `config.toml`을 직접 편집하면 다음 frost 명령어가 작업을 업데이트합니다.

## 백업이 실행되는 시각

백업은 `schedule.time`에, 컴퓨터의 현지 시각 기준으로 실행됩니다.

| `schedule.every` | 백업 시각 |
| --- | --- |
| `daily` | 매일 그 시각 |
| `weekly` | 매주 `schedule.day`의 그 시각 |
| `2h`부터 `12h`까지 | 그 시각과, 그 앞뒤로 간격마다. `15:00`부터 세는 `6h`는 03:00, 09:00, 15:00, 21:00에 실행됩니다 |
| `hourly` | 매시간, 그 시각의 분에 |

systemd는 각 실행을 최대 5분까지 무작위로 늦춰 시작합니다.

## 놓친 백업

백업할 시각에 컴퓨터가 꺼져 있거나 잠자기 상태였다면, frost는 컴퓨터가 돌아온 뒤 백업합니다. 몇 번을 놓쳤든 백업은 한 번만 합니다.

| 스케줄러 | 놓친 백업을 실행하는 때 |
| --- | --- |
| launchd(macOS) | Mac이 깨어날 때, 또는 꺼져 있던 뒤 로그인할 때 |
| systemd(Linux) | 컴퓨터가 깨어나거나 켜질 때. lingering이 꺼져 있으면 로그인할 때 |
| 작업 스케줄러(Windows) | 컴퓨터가 돌아오고 로그인한 상태가 되면 가능한 한 빨리 |
| cron(Linux) | 컴퓨터가 돌아온 뒤 15분 안에 |

cron에서는 frost가 15분마다 확인하고, 백업할 시각이 되었거나 놓친 백업이 있을 때만 백업합니다. 이미 백업한 시각에는, 예약된 백업이든 직접 실행한 백업이든 두 번째 백업을 하지 않습니다.

놓친 백업을 건너뛰고 제시간에만 백업하려면 다음을 실행합니다.

```sh
frost config set schedule.catch_up false
```

네트워크가 돌아오기 전에 시작한 예약 백업은 약 5분 동안 다시 시도합니다. 다른 백업이 실행 중이면 그 백업이 끝날 때까지 기다립니다.

Windows에서는 로그인한 동안에만 예약된 백업이 실행됩니다. 컴퓨터가 배터리로 동작하는 동안 예약된 백업을 시작하지 않고, 전원을 뽑으면 중단합니다. macOS와 systemd에서는 예약된 백업이 낮은 우선순위로 실행되므로 컴퓨터가 느려지지 않습니다.

## 예약 작업

| 시스템 | 스케줄러 | 작업 |
| --- | --- | --- |
| macOS | launchd | `~/Library/LaunchAgents/io.github.whatithasisandalwayswillbe.frost.plist` |
| systemd를 쓰는 Linux | systemd 사용자 타이머 | `~/.config/systemd/user/frost-backup.service`와 `frost-backup.timer` |
| systemd를 쓰지 않는 Linux | cron | crontab에서 `# frost-backup` 표시가 붙은 한 줄 |
| Windows | 작업 스케줄러 | `frost backup`이라는 이름의 작업 |

작업은 등록할 때 쓰던 설정 폴더와 캐시 폴더로 `frost backup`을 실행합니다. 이 폴더를 바꿨다면 `frost init`을 다시 실행하세요.

macOS에서는 이 작업이 시스템 설정 > 일반 > 로그인 항목 및 확장 프로그램(System Settings > General > Login Items & Extensions)에 **Node.js Foundation**이라는 이름으로 표시됩니다. frost에 포함된 런타임의 배포자입니다. 이곳에서 끄면 예약된 백업이 멈추고, `frost status`는 작업이 없다고 보고합니다. 예약된 백업을 멈추려면 대신 `frost config set schedule.enabled false`를 쓰세요.

systemd에서는 lingering이 꺼져 있다고 확인할 수 있을 때 frost가 사용자의 lingering을 켜려고 시도합니다(`loginctl enable-linger`). lingering은 로그아웃한 동안에도 백업을 실행할 수 있게 합니다. frost가 켜지 못하면 로그아웃 후 백업이 멈출 수 있습니다. 타이머를 제거할 때는 frost가 직접 켰다고 기록한 경우에만 lingering을 끕니다.

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
