# [FEPAS] QAS - Question & Answer Service
[![Circle CI](https://circleci.com/gh/framgia/fepas-qas/tree/master.svg?style=svg)](https://circleci.com/gh/framgia/fepas-qas/tree/master)

## Install
Clone the repo and then:
```javascript
npm i
```  
## Dev
Run an express server using Webpack with Hot Module Replacement:
```javascript
npm run dev
```
## Prod
Build the production version of your assets in the 'static' directory
```javascript
npm run build
```

## Use Docker & C9 IDE
- Install `docker`
- Install `docker-compose`

For first running time:
```sh
docker-compose up --build
```
And next time, run without `--build`

Access IDE: `http://localhost/ide.html`
Access web: `http://localhost:5000`
