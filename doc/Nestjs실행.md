git 명령어
-------------
<1> git 폴더 생성 
```bash
> git init 
```

<2> git remote 연동
```bash 
> git remote add "url" 
```

<3> git clone
```bash 
> git pull origin master 
```

<4> git on stage
```bash 
> git add * 
```

<5> git commit
```bash
> git commit -m "message" 
```

<6> git push
```bash 
> git push origin master 
```


npm 명령어
-------------
<1> 현재 package.json 에 있는 dependencies install
```bash 
> npm install 
```

nestjs 명령어
-------------
<1> 생성
```bash
> nest generate <element> <name> 
```

<2> 서버 start
```bash 
> nest start 
```


node 프로젝트 생성 과정
----------
1. git에서 pull받는다.
2. node_modules 폴더가 존재할 경우 제거하고 npm install 한다.
3. nest g res <모듈명> 으로 모듈을 생성한다. ( res생성 시 m,co,s,dto,entity 포함 )
