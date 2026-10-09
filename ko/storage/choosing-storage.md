# 스토리지 선택

frost는 Permafrost나, 조건부 쓰기를 지원하는 S3 호환 제공업체에 백업을 저장합니다. 어느 쪽이든 모든 내용은 컴퓨터를 떠나기 전에 암호화되므로, 제공업체는 내용을 읽을 수 없습니다.

## 선택지

- **[Permafrost](#permafrost)**는 frost를 위해 만든 호스팅 스토리지입니다. 액세스 키 하나만 있으면 되고, 버킷, 리전, 엔드포인트를 설정할 필요가 없습니다.
- **S3 호환 스토리지**는 [Amazon S3](#amazon-s3), [Cloudflare R2](#cloudflare-r2), [Backblaze B2](#backblaze-b2), [Wasabi](#wasabi) 같은 제공업체에서 만든 버킷이나, [MinIO](#other-s3)처럼 직접 운영하는 서버를 사용합니다.

## 조건부 쓰기

frost에는 원자적인 조건부 쓰기(`If-None-Match: *`)를 지원하는 스토리지가 필요합니다. 조건부 쓰기는 두 컴퓨터가 서로의 백업 기록을 덮어쓰지 않게 막아 줍니다. 설정 도우미는 연결할 때 이를 테스트하며, 통과하지 못한 스토리지는 받아들이지 않습니다. 제공업체가 지원하지 않는다면 키나 설정을 바꿔도 해결되지 않습니다.

| 제공업체 | 조건부 쓰기 |
| --- | --- |
| Permafrost | 지원 |
| Amazon S3 | [문서에 명시](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html) |
| Cloudflare R2 | [문서에 명시](https://developers.cloudflare.com/r2/api/s3/api/) |
| MinIO | 서버에 구현되어 있음. 사용하는 버전이 설정 도우미의 테스트를 통과해야 합니다 |
| Backblaze B2 | 확인되지 않음. [업로드 참조 문서](https://www.backblaze.com/apidocs/s3-put-object)에 `If-None-Match`가 없습니다 |
| Wasabi | 확인되지 않음. [API 참조 문서](https://docs.wasabi.com/apidocs/operations-on-objects)로는 지원 여부를 확인할 수 없습니다 |
| Garage | 지원하지 않음(관리자 설명 기준) |

이 표는 2026년 10월 2일에 각 제공업체의 문서와 소스 코드를 기준으로 확인한 것이며, 실제 테스트는 하지 않았습니다. 최종 판단은 설정 도우미의 테스트가 내립니다.

## 고려할 점

- **복원 비용.** 다운로드에 요금을 받는 제공업체도 있습니다. 전체를 복원하면 모든 내용을 내려받고, 표본 검사를 할 때마다 소량을 내려받습니다.
- **보관용 스토리지 클래스.** frost는 청크를 바로 다시 읽으므로, 읽기 전에 복원 작업이 필요한 보관용 클래스로 frost의 객체를 옮기지 마세요.
- **삭제와 만료.** frost는 백업을 삭제하지 않습니다. 스냅샷끼리 청크를 공유하므로, frost 폴더의 객체를 삭제하거나 만료시키는 수명 주기 규칙을 추가하지 마세요.
- **권한을 제한한 키.** frost에는 전용 버킷에만 접근할 수 있는 액세스 키를 주세요.

## 나중에 스토리지 바꾸기

모든 내용을 다시 업로드하지 않고도 백업을 다른 제공업체로 옮길 수 있습니다. 자세한 내용은 [백업 옮기기](#moving-backups)를 참고하세요.
