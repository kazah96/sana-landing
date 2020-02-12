# sana-landing

## Необходимые инструменты и их установка

- Node js https://nodejs.org/dist/v12.15.0/node-v12.15.0-x64.msi
- surge ```npm install --global surge```

### установка админки

```
cd ~/sana-landing/api
npm i
```

### установка движка сайта

```
cd ~/sana-landing/blog
npm i
```

## Запуск админки

```
cd sana-landing/api
npm run develop
```
## Сборка сайта

```
cd sana-landing/blog
npm run build
```

# деплой (после того как успешно собрал сайт)

```
cd sana-landing/blog 
npm run deploy:test # для деплоя на тестовый сервер umirzakovs-test.surge.sh
npm run deploy:main # для деплоя на основной сервер umirzakovs.surge.sh
npm run deploy:prod # для деплоя на продуктовый сервер umirzakov.site
```