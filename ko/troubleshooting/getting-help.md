# 도움 받기

이 문서에서 다루지 않는 문제라면, 다음 방법으로 더 알아보고 도움을 요청할 수 있습니다.

## 먼저 확인할 것

- `frost status`는 마지막 백업 결과, 백업 상태, 스토리지 연결 문제를 보여 줍니다.
- `frost -h`는 모든 명령어와 옵션을 보여 줍니다.
- 예약된 백업 로그에는 자동 백업 중에 일어난 일이 기록됩니다. 자세한 내용은 [자동 백업](#scheduling)을 참고하세요.
- [자주 발생하는 문제](#common-problems)에 자주 보는 메시지를 모았습니다.

## GitHub에 질문하기

[github.com/whatithasisandalwayswillbe/frost/issues](https://github.com/whatithasisandalwayswillbe/frost/issues)에서 issue를 열고 다음 내용을 적어 주세요.

- frost 버전(`frost --version`으로 확인)과 운영 체제.
- 무엇을 실행했고, 어떻게 되기를 기대했는지.
- 실제로 무슨 일이 일어났는지. 메시지는 그대로 적어 주세요.
- 관련된 `frost status`나 로그의 내용.

> 복구 문구, 키 파일, 액세스 키, 자격 증명이 들어 있는 `config.toml`은 절대 올리지 마세요. `frost config`는 `--show-secrets`를 붙이지 않으면 자격 증명을 가려서 보여 줍니다. 올리기 전에 붙여 넣은 내용을 꼭 확인하세요.

## 보안 문제

보안 문제는 공개 issue로 신고하지 마세요. 비공개로 신고하는 방법은 [보안 및 개인정보 보호](#security)를 참고하세요.
