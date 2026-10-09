# Amazon S3

Резервное копирование в бакет Amazon S3. S3 поддерживает условную запись, которая нужна frost.

## Перед началом

1. Создайте бакет в консоли AWS и запишите его регион, например `us-east-1`.
2. Создайте для frost пользователя IAM с доступом только к этому бакету и создайте для него ключ доступа: IAM > Users > your user > Security credentials > Create access key.

frost нужно читать, перечислять, записывать и удалять объекты в бакете. Такой политики достаточно. Замените `my-backups` на имя своего бакета:

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

frost удаляет только небольшой тестовый объект, который мастер создаёт при подключении.

## В мастере настройки

Выполните `frost init` и выберите **Amazon S3**.

| Вопрос мастера | Ответ |
| --- | --- |
| Which region is the bucket in? | Регион бакета, например `us-east-1` |
| What's the bucket called? | Имя бакета, точно как при создании |
| Paste the access key ID. | Идентификатор ключа доступа из IAM |
| Paste the secret access key. | Показывается один раз, рядом с идентификатором ключа, при его создании |

frost подключается к `s3.<region>.amazonaws.com` и хранит копии в папке `frost` внутри бакета.

## Полезно знать

- Держите объекты frost в классе хранения, который можно читать сразу, например S3 Standard или S3 Standard-IA. Не добавляйте правила жизненного цикла, которые переносят их в Glacier Flexible Retrieval или Glacier Deep Archive или удаляют по истечении срока.
- Версионирование бакета не нужно.
