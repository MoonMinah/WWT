# What Was Today

'What Was Today'는 날씨, 위치, 지도 API를 이용하여 기상에 따른 데이틀 코스를 공유하는 SNS입니다.

 프로젝트 로고 넣기

## 프로젝트 정보
> (도봉 SW 1기) 풀스텍 웹 개발자 취업 부트캠프
> 개발기간: 20240226 ~ 20240313

## 배포 주소
 http://49.50.167.42:8000

## 팀 소개

* **추수연** - *Front* - [CHUSUYEON](https://github.com/CHUSUEYEON)
* **이기혁** - *Front* - [leekihyeok](https://github.com/leekihyeok)
* **신동운** - *Back* - [tlsdla1235](https://github.com/tlsdla1235)
* **문민아** - *Back* - [MoonMiah](https://github.com/MoonMinah)

## 프로젝트 소개
저희 ready4는 일반적인 블로그와 차별화를 두기 위해 날씨를 이용한 SNS입니다. 

날씨와 위치 API를 이용하여 현재 위치의 날씨를 파악하고, 게시글들을 날씨(맑음, 흐림, 비, 눈)로 분류하였습니다. 
 또한, 지도 API를 이용하여 각 위치를 연결하여 하나의 코스를 만들어 사용자들에게 보여줍니다. 

위와 같이 “What Was Today”는 날씨에 맞는 데이트 코스를 공유하는 SNS입니다.

## 시작 가이드

When you start the project you will push 'npm i start' int terminal
We use axios, bcrypt, cross-env, ejs, express, express-session, multer, mysql2, nodemon, sequelize, sequelize-cli

### Installation
```
$git clone http://github.com/CHUSUEYEON/WWT.git 
```

```
$npm i start
$npm run dev
$npm nodemon
```

### Prerequisites

```
        "@elastic/elasticsearch": "^8.12.2",
        "axios": "^1.6.7",
        "bcrypt": "^5.1.1",
        "cross-env": "^7.0.3",
        "ejs": "^3.1.9",
        "express": "^4.18.2",
        "express-session": "^1.18.0",
        "multer": "^1.4.5-lts.1",
        "mysql2": "^3.9.2",
        "nodemon": "^3.1.0",
        "sequelize": "^6.37.1",
        "sequelize-cli": "^6.6.2"
```

## 기술 스택
**Environment**
> <img src="https://img.shields.io/badge/visual studio code-2b68a7?style=for-the-badge&logo=visualstudiocode&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

**Config**
> <img src="https://img.shields.io/badge/npm-ff0000?style=for-the-badge&logo=npm&logoColor=white">

**Development**
> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

**Communication**
><img src="https://img.shields.io/badge/slack-7952B3?style=for-the-badge&logo=slack&logoColor=white"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

## 화면 구성
> ### 화면
![image](https://github.com/CHUSUEYEON/WWT/assets/80684118/490b2a00-3a25-4913-8227-76c2316870e2)


> ### api 명세서
![image](https://github.com/CHUSUEYEON/WWT/assets/80684118/98dafbe0-3bab-4007-9c97-18d4d515e42b)


## 주요 기능

> ### 일기예보
+ 날씨 api를 이용하여 현재 위치에 대한 날씨를 보여줍니다.
+ 주요 도시들의 위도, 경도를 이용하여 각 도시들의 날씨를 실시간으로 보여줍니다.

> ### 코스 Mapping
+ 글 등록 시 넣었던 위도, 경도를 LeafLet api 를 사용하여 지도에 띄웁니다.
+ 띄운 위치들을 실제 도로로 연결하여 하나의 코스를 보여줍니다.(거리, 시간 등을 보여준다)
+ 각 위치 설명 밑에 각 지역의 위치를 보여줍니다.

> ### Multer
+ 게시글 등록, 프로필 이미지 등 각 이미지를 서버에 전달하고 보여주기 위해 Multer를 사용합니다.

> ### 문의 글
+ 실제 고객들 대상으로 문의가 있으면 QNA를 통해 문의 글을 보내면 실제 이메일로 발송됩니다.

## Architecture

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


