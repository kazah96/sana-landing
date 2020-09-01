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


# Пособие по утилите deploy-manager

Использование в директории /blog

Для начала нужно создать файл .env с таким содержимым:
```
HOST=%FTP_ADDRESS%
FTPUSER=%USER%
PASSWORD=%PASSWORD%
```
где нужно подставить свои данные из регру

Использование: 
  deploy-manager publish                Опубликовывает сайт
  deploy-manager backup-last            Откатывает на последний бэкап
  deploy-manager backup-show            Показывает список всех доступных бэкапов
  deploy-manager backup-apply [backup]  Применяет указанный бэкап

