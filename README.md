# 배달 공구(공동구매) 사이트 기획서

## 1. 프로젝트 개요

### 1.1 프로젝트명
"배달모아" - 배달 공동구매 플랫폼

### 1.2 기획 의도 및 목적
- 배달비 절감을 위한 공동구매 플랫폼 제공
- 동일 지역 내 사용자들의 커뮤니티 활성화
- 1인 가구 증가에 따른 소량 주문 시 발생하는 경제적 부담 완화
- 음식 배달 과정에서 발생하는 환경적 영향 최소화

### 1.3 주요 기능 요약
- 위치 기반 배달 공구방 생성 및 참여
- 실시간 채팅 시스템
- 카테고리별 음식점 및 공구방 검색/필터링
- 사용자 프로필 및 평가 시스템

## 2. 주요 기능 상세

### 2.1 사용자 관리
- 회원가입/로그인 (일반)
- 사용자 프로필 관리 (닉네임, 프로필 이미지)
- 위치 정보 설정 및 관리 (기본 주소, 대략적 위치)

### 2.2 메인 화면
- 음식 카테고리 표시 (한식, 중식, 일식, 양식, 분식, 카페/디저트 등)
- 현재 내 주변에서 진행 중인 인기 공구방 하이라이트

### 2.3 공구방 목록 화면
- 선택한 카테고리의 음식점 목록 표시
- 해당 음식점에 대한 현재 진행 중인 공구방 표시
- 새 공구방 생성 버튼

### 2.4 공구방 생성 기능
- 음식점 선택
- 주문 예상 시간대 설정
- 최대 참여자 수 설정
- 최소 주문 금액 달성 여부 표시

### 2.5 공구방 상세 화면
- 공구방 정보 (음식점, 예상 주문 시간, 참여자 수 등)
- 참여자 목록 및 방장 표시
- 실시간 채팅 기능
- 메뉴 선택 및 공유 기능
- 결제 방식 조율 기능

### 2.6 주문 및 결제 과정
- 개인별 메뉴 선택 및 취합
- 총 주문 금액 계산
- 주문 확정

### 2.7 배달 완료 및 후속 처리
- 배달 완료 확인
- 공구 참여자 평가
- 음식점 평가 및 리뷰

## 3. 기술 스택

### 3.1 프론트엔드
- React (Create React App 또는 Next.js)
- JavaScript
- Session (상태 관리)
- Styled-components CSS (스타일링)
- Supabse RealTime (실시간 채팅)
- React Router (라우팅)

### 3.2 백엔드
- Node.js
- PostgreSQL (데이터베이스)
- JWT (인증)
- Socket.IO (실시간 통신)
- Geolocation API (위치 기반 서비스)

### 3.3 배포 및 인프라
- CI/CD 파이프라인 (GitHub Actions)

## 4. 데이터 구조

### 4.1 사용자 (User)
```javascript
{
  id: String,
  email: String,
  password: String (암호화),
  nickname: String,
  profileImage: String (URL),
  location: {
    address: String,
    coordinates: [Number, Number] // [longitude, latitude]
  },
  rating: Number,
}
```

### 4.2 공구방 (Room)
```javascript
{
  id: String,
  title: String,
  restaurant: {
    id: String,
    name: String,
    category: String,
    minOrderAmount: Number
  },
  host: UserId,
  participants: [UserId],
  maxParticipants: Number,
  status: String, // "모집중", "주문완료", "배달완료" 등
  orderTime: Date,
  location: {
    address: String,
    coordinates: [Number, Number]
  },
  locationOptions: [
    {
      address: String,
      votes: [UserId]
    }
  ],
  totalAmount: Number,
  messages: [MessageId],
  createdAt: Date,
  updatedAt: Date
}
```

### 4.3 메시지 (Message)
```javascript
{
  id: String,
  roomId: RoomId,
  userId: UserId,
  content: String,
  timestamp: Date,
  type: String // "text", "image", "system" 등
}
```

### 4.4 음식점 (Restaurant)
```javascript
{
  id: String,
  name: String,
  category: String,
  address: String,
  coordinates: [Number, Number],
  minOrderAmount: Number,
  deliveryFee: Number,
  menu: [
    {
      name: String,
      price: Number,
      description: String,
      image: String (URL)
    }
  ],
  rating: Number,
  reviews: [ReviewId]
}
```

## 5. 화면 설계

### 5.1 메인 페이지
- 상단 헤더: 로고, 검색창, 로그인/회원가입 버튼
- 음식 카테고리 그리드 (이미지와 함께 표시)
- 내 주변 활성화된 공구방 미리보기 (5-6개)
- 하단 푸터: 서비스 정보, 이용약관 등

### 5.2 카테고리별 음식점 & 공구방 목록
- 음식점 목록 (카드 형태로 표시)
- 음식점 이름, 별점, 최소 주문 금액, 배달비
- 현재 진행 중인 공구방 수 표시
- 공구방 목록 (음식점별로 그룹화)
- 방 제목, 참여자 수/최대 참여자 수

### 5.3 공구방 생성 화면
- 단계별 생성 프로세스
- 방 제목 입력
- 최대 참여자 수 설정
- 예상 주문 시간대 선택
- 배달 받을 기본 위치 선택

### 5.4 공구방 상세 화면
- 상단: 방 정보 (제목, 음식점, 참여자 수, 위치 등)
- 중앙 좌측: 참여자 목록
- 중앙 좌측: 실시간 채팅창
- 중앙 우측: 메뉴 선택 및 주문 현황

### 5.5 사용자 프로필
- 기본 정보 (닉네임, 프로필 이미지)
- 평가 점수

## 6. 구현 로드맵

### 6.1 1단계 (MVP - 최소 기능 제품)
- 기본 사용자 관리 (회원가입/로그인)
- 카테고리별 음식점 목록 표시
- 공구방 생성 및 참여 기능
- 기본 채팅 기능

### 6.2 2단계
- 실시간 알림 시스템
- 위치 투표 기능
- 사용자 평가 시스템
- 메뉴 선택 및 공유 기능

### 6.3 3단계
- 결제 연동
- 배달 추적 시스템
- 리뷰 및 평점 시스템
- 모바일 최적화

### 6.4 4단계 (향후 확장)
- 음식점 제휴 시스템
- 배달앱 API 연동
- 정기 공구 시스템
- 레시피 공유 및 식재료 공구 확장

## 7. ERD(Entity Relationship Diagram)

### 7.1 주요 엔티티 및 관계

#### User (사용자)
- PK: userId
- 속성: email, password, nickname, profileImage, address, coordinates, rating
- 관계:
  - User 1:N Room (생성한 방)
  - User N:M Room (참여하는 방)
  - User 1:N Review (작성한 리뷰)
  - User 1:N UserEvaluation (평가 받은 내역)
  - User 1:N UserEvaluation (평가한 내역)
  - User 1:N Message (작성한 메시지)
  - User 1:N Order (주문 내역)

#### Room (공구방)
- PK: roomId
- FK: hostId (User 참조), restaurantId (Restaurant 참조)
- 속성: title, maxParticipants, status, orderTime, address, coordinates, totalAmount, createdAt, updatedAt
- 관계:
  - Room N:1 User (방장)
  - Room N:M User (참여자)
  - Room N:1 Restaurant (음식점)
  - Room 1:N Message (채팅 메시지)
  - Room 1:N LocationVote (위치 투표)
  - Room 1:1 Order (주문 정보)

#### Restaurant (음식점)
- PK: restaurantId
- 속성: name, category, address, coordinates, minOrderAmount, deliveryFee, rating
- 관계:
  - Restaurant 1:N Room (음식점 관련 공구방)
  - Restaurant 1:N MenuItem (메뉴 항목)
  - Restaurant 1:N Review (리뷰)

#### Message (메시지)
- PK: messageId
- FK: roomId (Room 참조), userId (User 참조)
- 속성: content, timestamp, type
- 관계:
  - Message N:1 Room (속한 방)
  - Message N:1 User (작성자)

#### MenuItem (메뉴 항목)
- PK: menuItemId
- FK: restaurantId (Restaurant 참조)
- 속성: name, price, description, image
- 관계:
  - MenuItem N:1 Restaurant (음식점)
  - MenuItem 1:N OrderItem (주문 항목)

#### Order (주문)
- PK: orderId
- FK: roomId (Room 참조)
- 속성: status, totalAmount, orderTime, deliveryTime
- 관계:
  - Order N:1 Room (공구방)
  - Order 1:N OrderItem (주문 항목)
  - Order N:M User (주문 참여자)

#### OrderItem (주문 항목)
- PK: orderItemId
- FK: orderId (Order 참조), menuItemId (MenuItem 참조), userId (User 참조)
- 속성: quantity, price
- 관계:
  - OrderItem N:1 Order (주문)
  - OrderItem N:1 MenuItem (메뉴 항목)
  - OrderItem N:1 User (주문한 사용자)

#### Review (리뷰)
- PK: reviewId
- FK: userId (User 참조), restaurantId (Restaurant 참조)
- 속성: content, rating, timestamp
- 관계:
  - Review N:1 User (작성자)
  - Review N:1 Restaurant (음식점)

#### UserEvaluation (사용자 평가)
- PK: evaluationId
- FK: evaluatorId (User 참조), evaluatedId (User 참조), roomId (Room 참조)
- 속성: rating, comment, timestamp
- 관계:
  - UserEvaluation N:1 User (평가자)
  - UserEvaluation N:1 User (평가 대상)
  - UserEvaluation N:1 Room (공구방)

#### LocationVote (위치 투표)
- PK: voteId
- FK: roomId (Room 참조)
- 속성: address, coordinates
- 관계:
  - LocationVote N:1 Room (공구방)
  - LocationVote N:M User (투표한 사용자)

### 9.2 ERD 다이어그램

```
User 1 ------ N Room (방장)
 |      |
 |      N
 |      |
 N      |
UserEvaluation
 |      |
 |      |
 N      |
 |      |
User N ------ M Room (참여자)
        |
        |
        N
        |
    Message
        |
        |
        N
        |
Room 1 ------ N LocationVote
 |
 |
 N
 |
Restaurant
 |
 |
 1
 |
 N
MenuItem
 |
 |
 1
 |
 N
OrderItem
 |
 |
 N
 |
Order 1 ------ 1 Room
 |
 |
 N
 |
User
```

- 3단계 고급 기능 및 최적화: 1.5개월
- 베타 테스트 및 QA: 2주
- 출시 준비 및 안정화: 2주
