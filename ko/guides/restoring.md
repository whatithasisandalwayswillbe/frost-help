# 파일 복원

어떤 스냅샷에서든 파일을 되찾을 수 있습니다. 새 폴더에 복원하거나, 원본 위에 덮어쓸 수 있습니다.

가장 쉬운 방법은 스냅샷 브라우저입니다. `frost browse`를 실행하고 필요한 항목을 찾아 `[space]`로 선택한 다음 `[r]`을 누르세요. 자세한 내용은 [스냅샷 브라우저](#snapshot-browser)를 참고하세요. 이 페이지에서는 명령줄에서 복원하는 방법을 설명합니다.

## restore 명령어

```sh
frost restore <snapshot> [paths...] --beside | --to <dir> | --overwrite
```

- **스냅샷**: 어느 스냅샷에서 복원할지 정합니다. 아래의 "스냅샷 고르기"를 참고하세요.
- **경로**: 복원할 파일이나 폴더입니다. 각각 그 안의 모든 내용을 포함합니다. 생략하면 스냅샷 전체를 복원합니다.
- **복원 위치**: `--beside`, `--to`, `--overwrite` 중 정확히 하나를 지정합니다.

예:

```sh
frost restore latest ~/Documents/taxes --beside
frost restore yesterday ~/notes.txt --to ~/Desktop
frost restore maple-absurd-3f1c --overwrite
```

`frost restore`를 인자 없이 실행하면 스냅샷 브라우저가 열립니다.

## 스냅샷 고르기

| 입력 | 선택되는 스냅샷 |
| --- | --- |
| `latest` | 가장 최근 스냅샷 |
| `maple-absurd-3f1c` 또는 `maple`만 | 그 ID의 스냅샷, 또는 ID가 입력한 내용으로 시작하는 유일한 스냅샷 |
| `3 days ago`, `12h`, `2w`, `1 month ago` | 그 시점이나 그 이전의 가장 최근 스냅샷 |
| `yesterday`, `today` | 그날이 끝날 때까지의 가장 최근 스냅샷 |
| `2026-09-20`, `2026-09-20 14:30` | 그날이나 그 분, 또는 그 이전의 가장 최근 스냅샷(현지 시각 기준) |

상대적인 시간은 영어로 씁니다. 분(`m`), 시간(`h`), 일(`d`), 주(`w`), 개월(`mo`), 년(`y`)을 쓸 수 있고, 단어를 그대로 써도 됩니다. `"3 days ago"`처럼 공백이 있는 값은 따옴표로 감싸세요.

`frost status`로 스냅샷과 ID 목록을 볼 수 있습니다. 입력한 내용이 여러 ID와 일치하면 frost가 더 길게 입력하라고 요청합니다.

## 복원 위치

| 옵션 | 복원 위치 |
| --- | --- |
| `--beside` | 원본 옆에 만드는 새 `frost-restore-<id>` 폴더 |
| `--to <dir>` | `<dir>` 안에 만드는 새 `frost-restore-<id>` 폴더. `<dir>`은 이미 있어야 합니다 |
| `--overwrite` | 원래 위치. 그곳에 있는 것을 대체합니다. frost가 먼저 확인하며, `-y`를 쓰면 확인을 건너뜁니다 |

새 폴더에 복원할 때는 아무것도 덮어쓰지 않습니다. 새 폴더 안에서 복원한 항목은 원래 이름을 유지하며, 선택한 항목들이 공통으로 속한 폴더를 기준으로 배치됩니다.

| 복원하는 항목 | `--beside`의 결과 |
| --- | --- |
| `~/Documents/taxes` | `~/Documents/frost-restore-<id>/taxes/...` |
| `~/notes.txt` | `~/frost-restore-<id>/notes.txt` |
| `~/Documents/a`와 `~/Pictures/b` | `~/frost-restore-<id>/Documents/a`와 `~/frost-restore-<id>/Pictures/b` |

새 폴더 이름에는 스냅샷의 짧은 ID가 쓰입니다. 그 이름이 이미 있으면 frost가 `-1`, `-2` 같은 번호를 붙입니다.

선택한 항목들이 공통으로 속한 곳이 드라이브 최상위뿐인 경우, 그 폴더가 이 컴퓨터에 없는 경우(다른 컴퓨터의 스냅샷 등), 그곳에 쓰기 권한이 없는 경우에는 `--beside`를 쓸 수 없습니다. 예를 들어 홈 폴더 전체의 스냅샷을 원래 위치 옆에 복원하면 `/Users`나 `/home`에 새 폴더를 만들어야 합니다. 이럴 때는 `--to`를 쓰세요.

## 원본 위에 복원하기

`--overwrite`는 파일을 원래 위치로 되돌리고 그곳에 있는 것을 대체합니다. frost는 할 작업을 보여 주고 먼저 확인합니다.

```text
┌  restore maple-absurd-3f1c  2026-10-07 03:17 (1d ago)
│
│  paths        /home/you/Documents/taxes
▲  into         original locations (existing files will be replaced)
│
│  Go ahead? [y/N]
```

- 이미 스냅샷과 같은 파일은 확인한 뒤 건너뛰므로, 다시 내려받지 않습니다.
- 스냅샷에 없는 파일은 그대로 둡니다.
- 각 파일은 먼저 바로 옆의 숨겨진 임시 파일에 쓴 다음 교체됩니다. 복원 중인 파일의 사본 두 개가 들어갈 공간이 필요합니다.
- 스냅샷은 같은 종류의 컴퓨터에서 만든 것이어야 합니다. macOS와 Linux의 스냅샷은 macOS나 Linux에, Windows의 스냅샷은 Windows에 덮어쓸 수 있습니다.
- 다른 사용자가 바꿀 수 있었던 폴더 링크를 거쳐야 한다면 frost는 복원하지 않습니다. 이것이 문제라면 확인하기 전에 알려 주고, 브라우저에서는 "Overwrite original files"가 회색으로 표시됩니다.

## 안전 점검

각 청크는 쓰기 전에 복호화하고 ID와 대조합니다. 각 파일은 완성된 뒤에야 원래 이름을 갖게 되므로, 복원이 실패해도 진짜 파일이 있던 자리에 쓰다 만 파일이 남지 않습니다.

복원한 심볼릭 링크는 원래 대상을 유지하며, 그 대상이 복원 폴더 밖을 가리킬 수도 있습니다.

## 중단된 복원

연결이 끊기거나, `Ctrl+C`를 누르거나, 컴퓨터가 잠자기에 들어가서 복원이 멈추면, frost는 이어서 진행하는 명령어를 출력합니다.

```text
What's restored so far was kept. To carry on from there, run:

  frost restore maple-absurd-3f1c9a0b2e7 /home/you/Documents/taxes --beside
```

같은 복원을 `latest`나 시각 대신 스냅샷의 전체 ID로 지정한 명령어입니다. 그래서 중간에 백업이 이루어져도 대상 스냅샷은 바뀌지 않습니다. 이미 복원한 파일은 확인한 뒤 건너뛰고, 쓰던 파일은 마지막으로 온전한 청크부터 이어서 씁니다.

복원이 끝날 때까지 복원 폴더에는 `.frost-restore` 표시 파일과 `.frost-partial-...` 파일이 있습니다. 그대로 두세요. 끝나면 frost가 지웁니다.

컴퓨터를 잃어버린 뒤 복원하는 방법은 [새 컴퓨터에서 복구](#new-computer)를 참고하세요.
