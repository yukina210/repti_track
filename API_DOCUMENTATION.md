# API Documentation

## ユーザー認証

### ユーザー登録

- **URL**: `/api/v1/users`
- **HTTPメソッド**: `POST`
- **リクエストパラメータ**:
  - `email` (string, required): ユーザーのメールアドレス
  - `password` (string, required): ユーザーのパスワード
  - `username` (string, optional): ユーザー名
- **レスポンス形式**:
```json
  {
    "id": 1,
    "email": "example@example.com",
    "username": "example",
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  }
```

### ログイン

- URL: /api/v1/users/sign_in
- HTTPメソッド: POST
- リクエストパラメータ
  - email (string, required): ユーザーのメールアドレス
  - password (string, required): ユーザーのパスワード
- レスポンス形式
```
{
  "id": 1,
  "email": "example@example.com",
  "username": "example",
  "token": "abcdefg123456",
  "created_at": "2024-06-23T10:00:00Z",
  "updated_at": "2024-06-23T10:00:00Z"
}
```

## プロフィール

### プロフィール作成
- URL: /api/v1/profiles
- HTTPメソッド: POST
- リクエストパラメータ
  - username (string, required): ユーザー名
  - date_of_birth (string, required): 誕生日
  - gender (string, required): 性別
  - avatar (file, optional): アバター画像
- レスポンス形式
```
{
  "id": 1,
  "username": "example",
  "date_of_birth": "1990-01-01",
  "gender": "male",
  "avatar_url": "/uploads/profile/avatar/1/avatar.png",
  "created_at": "2024-06-23T10:00:00Z",
  "updated_at": "2024-06-23T10:00:00Z"
}
```

### プロフィール詳細
- URL: /api/v1/profiles/:id
- HTTPメソッド: GET
- レスポンス形式:
```
{
  "id": 1,
  "username": "example",
  "date_of_birth": "1990-01-01",
  "gender": "male",
  "avatar_url": "/uploads/profile/avatar/1/avatar.png",
  "created_at": "2024-06-23T10:00:00Z",
  "updated_at": "2024-06-23T10:00:00Z"
}
```

## ペット

### ペット一覧
- URL: /api/v1/pets
- HTTPメソッド: GET
- レスポンス形式
```
[
  {
    "id": 1,
    "pet_name": "tokage",
    "category": "lizard",
    "gender": "female",
    "breed": "フトアゴヒゲトカゲ",
    "date_of_birth": "2020-01-01",
    "pet_avatar_url": "/uploads/pet/avatar/1/pet_avatar.png",
    "user_id": 1,
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  },
  {
    "id": 2,
    "pet_name": "hebi",
    "category": "snake",
    "gender": "male",
    "breed": "コーンスネーク",
    "date_of_birth": "2018-06-15",
    "pet_avatar_url": "/uploads/pet/avatar/2/pet_avatar.png",
    "user_id": 1,
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  }
]
```

### ペット作成
- URL: /api/v1/pets
- HTTPメソッド: POST
- リクエストパラメータ:
  - pet_name (string, required): ペットの名前
  - category (string, required): ペットの種類
  - breed (string, required): ペットの品種
  - gender (string, required): ペットの性別
  - date_of_birth (string, optional): ペットの誕生日
  - pet_avatar (file, optional): ペットのアバター画像
- レスポンス形式
```
{
  "id": 3,
  "pet_name": "yamori",
  "category": "gecko",
  "gender": "female",
  "breed": "ヒョウモントカゲモドキ",
  "date_of_birth": "2019-03-10",
  "pet_avatar_url": "/uploads/pet/avatar/3/pet_avatar.png",
  "user_id": 1,
  "created_at": "2024-06-23T10:00:00Z",
  "updated_at": "2024-06-23T10:00:00Z"
}
```

## 質問

### 質問一覧
- URL: /api/v1/questions
- HTTPメソッド: GET
- レスポンス形式
```
[
  {
    "id": 1,
    "title": "このトカゲの雌雄は?",
    "content": "このトカゲの雌雄を教えてください",
    "user_id": 1,
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z",
    "draft": false,
    "images": ["/uploads/question/images/1/image1.png"]
  },
  {
    "id": 2,
    "title": "ヘビの餌の頻度",
    "content": "コーンスネークアダルトの餌の頻度を教えてください",
    "user_id": 2,
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z",
    "draft": false,
    "images": ["/uploads/question/images/2/image1.png", "/uploads/question/images/2/image2.png"]
  }
]
```

### 質問作成
- URL: /api/v1/questions
- HTTPメソッド: POST
- リクエストパラメータ:
  - title (string, required): 質問のタイトル
  - content (string, required): 質問の内容
  - draft (boolean, optional): 下書きとして保存するかどうか
  - images (array of files, optional): 質問に添付する画像
- レスポンス形式
```
{
  "id": 3,
  "title": "How to train a parrot?",
  "content": "I have a parrot and I want to teach it some tricks. Any advice?",
  "user_id": 1,
  "created_at": "2024-06-23T10:00:00Z",
  "updated_at": "2024-06-23T10:00:00Z",
  "draft": false,
  "images": ["/uploads/question/images/3/image1.png"]
}
```

## 体重記録

### 体重記録一覧
- URL: /api/v1/pets/:pet_id/weight_records
- HTTPメソッド: GET
- レスポンス形式
```
[
  {
    "id": 1,
    "weight": 4.5,
    "date": "2024-06-01",
    "pet_id": 1,
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  },
  {
    "id": 2,
    "weight": 4.7,
    "date": "2024-06-15",
    "pet_id": 1,
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  }
]
```

### 体重記録作成
- URL: /api/v1/pets/:pet_id/weight_records
- HTTPメソッド: POST
- リクエストパラメータ
  - weight (float, required): ペットの体重
  - date (string, required): 記録の日付
- レスポンス形式:
```
{
  "id": 3,
  "weight": 4.8,
  "date": "2024-06-22",
  "pet_id": 1,
  "created_at": "2024-06-23T10:00:00Z",
  "updated_at": "2024-06-23T10:00:00Z"
}
```

## お世話記録

### お世話記録一覧
- URL: /api/v1/pets/:pet_id/events
- HTTPメソッド: GET
- レスポンス形式
```
[
  {
    "id": 1,
    "date": "2024-06-01",
    "feed": true,
    "excretion": false,
    "regurgitation": false,
    "bathing": false,
    "shedding": false,
    "egg_laying": false,
    "mating": false,
    "note": "Fed cat in the morning",
    "images": ["/uploads/event/images/1/image1.png"],
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  },
  {
    "id": 2,
    "date": "2024-06-15",
    "feed": true,
    "excretion": true,
    "regurgitation": false,
    "bathing": false,
    "shedding": false,
    "egg_laying": false,
    "mating": false,
    "note": "Fed cat in the afternoon",
    "images": ["/uploads/event/images/2/image1.png"],
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  }
]
```

### お世話記録作成
- URL: /api/v1/pets/:pet_id/events
- HTTPメソッド: POST
- リクエストパラメータ:
  - date (string, required): 記録の日付
  - feed (boolean, optional): 給餌
  - excretion (boolean, optional): 排泄
  - food_refusal (boolean, optional): 拒食
  - regurgitation (boolean, optional): 吐き戻し
  - bathing (boolean, optional): 温浴
  - shedding (boolean, optional): 脱皮
  - habitat_cleaning (boolean, optional): お部屋掃除
  - egg_laying (boolean, optional): 産卵
  - mating (boolean, optional): 交尾
  - note (string, optional): メモ
  - images (array of files, optional): 記録に添付する画像
- レスポンス形式:
```
{
  "id": 3,
  "date": "2024-06-22",
  "feed": true,
  "excretion": false,
  "regurgitation": false,
  "bathing": false,
  "shedding": false,
  "egg_laying": false,
  "mating": false,
  "note": "Fed parrot in the morning",
  "images": ["/uploads/event/images/3/image1.png"],
  "created_at": "2024-06-23T10:00:00Z",
  "updated_at": "2024-06-23T10:00:00Z"
}
```

## 通知

### 通知一覧取得
- URL: /api/v1/notifications
- HTTPメソッド: GET
- レスポンス形式
```
[
  {
    "id": 1,
    "user_id": 1,
    "notifiable_type": "Answer",
    "notifiable_id": 2,
    "read": false,
    "message": "Your answer received a like",
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "notifiable_type": "Question",
    "notifiable_id": 3,
    "read": true,
    "message": "Your question received a new answer",
    "created_at": "2024-06-23T10:00:00Z",
    "updated_at": "2024-06-23T10:00:00Z"
  }
]
```

### 通知を既読にする
- URL: /api/v1/notifications/:id/mark_as_read
- HTTPメソッド: PATCH
- レスポンス形式:
```
{
  "message": "Notification marked as read"
}
```

## イイネ

### イイネ作成
- URL: /api/v1/questions/:question_id/answers/:answer_id/like
- HTTPメソッド: POST
- レスポンス形式
```
{
  "likes_count": 5,
  "new_url": "/api/v1/questions/1/answers/2/like",
  "new_method": "delete"
}
```

### イイネ削除
- URL: /api/v1/questions/:question_id/answers/:answer_id/like
- HTTPメソッド: DELETE
- レスポンス形式:
```
{
  "likes_count": 4,
  "new_url": "/api/v1/questions/1/answers/2/like",
  "new_method": "post"
}
```