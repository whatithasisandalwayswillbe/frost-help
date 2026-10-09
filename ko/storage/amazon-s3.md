# Amazon S3

Amazon S3 버킷에 백업합니다. S3는 frost에 필요한 조건부 쓰기를 지원합니다.

## 시작하기 전에

1. AWS 콘솔에서 버킷을 만들고, `us-east-1` 같은 리전을 적어 둡니다.
2. frost용 IAM 사용자를 만들어 그 버킷에만 접근할 수 있게 하고, 액세스 키를 만듭니다. 위치는 IAM > Users > your user > Security credentials > Create access key입니다.

frost에는 버킷 안 객체의 읽기, 조회, 쓰기, 삭제 권한이 필요합니다. 다음과 같은 정책이면 충분합니다. `my-backups`는 사용하는 버킷 이름으로 바꾸세요.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::my-backups"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-backups/*"
    }
  ]
}
```

frost가 삭제하는 객체는 설정 도우미가 연결할 때 만드는 작은 테스트 객체뿐입니다.

## 설정 도우미에서

`frost init`을 실행하고 **Amazon S3**를 고릅니다.

| 설정 도우미의 질문 | 답 |
| --- | --- |
| Which region is the bucket in? | 버킷의 리전. 예: `us-east-1` |
| What's the bucket called? | 만들 때와 똑같은 버킷 이름 |
| Paste the access key ID. | IAM의 액세스 키 ID |
| Paste the secret access key. | 만들 때 액세스 키 ID 옆에 한 번만 표시됩니다 |

frost는 `s3.<region>.amazonaws.com`에 연결하고, 버킷 안의 `frost` 폴더에 백업을 저장합니다.

## 알아 두면 좋은 점

- frost의 객체는 S3 Standard나 S3 Standard-IA처럼 바로 읽을 수 있는 스토리지 클래스에 두세요. Glacier Flexible Retrieval이나 Glacier Deep Archive로 옮기거나, 만료시키는 수명 주기 규칙은 추가하지 마세요.
- 버킷 버전 관리는 필요하지 않습니다.
