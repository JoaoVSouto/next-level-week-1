![Ecoleta banner](https://raw.githubusercontent.com/JoaoVSouto/next-level-week-1/master/assets/ecoleta-banner.png)
♻️ Ecoleta is an application made for entities like enterprises, companies and groups to collect recyclable wastes (i.e. lamps, batteries, paperboards and etc).<br>
🚀 It was developed on the Next Level Week 1.0 created by [Rocketseat](https://github.com/rocketseat).<br>
🎯 The stack that was chosen is
|Backend|Frontend|Mobile|
|--|--|--|
|Node.js|React.js|React Native

> And it was entirely built with Typescript!

## How to run the app?

### Basic configuration

The node version that is being used for the three environments is **12.14.1**.
The package manager chosen was [Yarn](https://classic.yarnpkg.com/lang/en/) on version **1.22.4**.
Go into your terminal and invoke:

```shell
git clone https://github.com/JoaoVSouto/next-level-week-1.git
cd next-level-week-1
```

### Backend

```shell
cd server
yarn
yarn knex:migrate
yarn knex:seed
yarn dev
```

### Frontend

```shell
cd web
yarn
yarn start
```

### Mobile

```shell
yarn global add expo-cli
cd mobile
yarn
yarn start
```

With [expo](https://expo.io/) you have the choice to run the app on your phone by reading the QR Code it gives to you or you can run on the phone emulator itself.
