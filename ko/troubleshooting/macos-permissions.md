# macOS 권한

macOS는 데스크탑, 문서, 다운로드 같은 폴더와 메일, Safari 같은 앱의 데이터를 보호합니다. 프로그램이 이런 곳을 읽으려면 사용자의 허락이 필요합니다.

## 직접 실행하는 백업

터미널에서 `frost backup`을 실행하면 macOS는 사용 중인 터미널 앱(터미널, iTerm, Visual Studio Code, Warp, Ghostty 등)이 폴더에 접근하도록 허용할지 묻습니다. 허용하면 frost가 그 폴더들을 읽을 수 있습니다.

## 예약된 백업

예약된 백업은 frost에 포함된 런타임을 실행하며, macOS는 이를 별도의 프로그램으로 취급합니다.

```text
~/Library/Application Support/frost/app/runtime/bin/node
```

이 런타임이 `~/Desktop`, `~/Documents`, `~/Downloads`를 처음 읽을 때 macOS가 허락을 구합니다. `~/Library/Mail`이나 `~/Library/Safari` 같은 다른 보호된 폴더는 묻지 않고 접근을 거부합니다.

## 전체 디스크 접근 권한

백업하는 모든 폴더를 frost가 읽을 수 있게 하려면 전체 디스크 접근 권한을 주세요.

1. 시스템 설정 > 개인정보 보호 및 보안 > 전체 디스크 접근 권한(System Settings > Privacy & Security > Full Disk Access)을 엽니다.
2. 추가 버튼을 클릭하고 `Cmd+Shift+G`를 누른 다음, 위에 나온 런타임 경로를 붙여 넣습니다.
3. `node`를 선택하고 열기를 클릭한 다음, 스위치가 켜져 있는지 확인합니다.
4. 직접 실행하는 백업을 위해 터미널 앱에도 같은 작업을 합니다.

이 권한은 frost를 업데이트해도 유지됩니다.

macOS가 백업을 막으면, frost의 오류가 어떤 앱이나 파일을 허용해야 하는지 알려 줍니다.

## iCloud Drive

frost는 iCloud가 온라인에만 보관하는 파일을 내려받지 않습니다. 그래서 백업 때문에 디스크가 가득 차거나 다운로드를 기다리는 일은 없습니다. 이런 파일은 건너뛰고 목록에 표시합니다. 백업하려면 Finder에서 이 Mac에 계속 내려받아 두도록 설정하세요.

## 로그인 항목

frost의 예약 작업은 시스템 설정 > 일반 > 로그인 항목 및 확장 프로그램(System Settings > General > Login Items & Extensions)에 **Node.js Foundation**이라는 이름으로 표시됩니다. frost에 포함된 런타임의 배포자입니다. 켜 둔 상태로 두세요. 자세한 내용은 [자동 백업](#scheduling)을 참고하세요.
