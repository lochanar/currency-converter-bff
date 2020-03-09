# Currency Converter BFF

This repository hosts the BFF application of the Currency Converter tool.

## Table of Contents

1. [Introduction](#introduction)
2. [Deployment Guide](#deployment-guide)
   - [How to Checkout](#how-to-checkout)
   - [How to Build](#how-to-build)
   - [How to Run Locally](#how-to-run-locally)
3. [Features](#features)

## Introduction

**Component Type** <br>
Rest API

**Dependencies** <br>

- [Express](https://www.npmjs.com/package/express)
- [Axios](https://www.npmjs.com/package/axios)
- [Config](https://www.npmjs.com/package/config)
- [Cors](https://www.npmjs.com/package/cors)
- [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)

## Deployment Guide

### How to Checkout

Checkout the codebase from GitHub:

```bash
$ git clone https://github.com/lochanar/currency-converter-bff.git
cd currency-converter-bff
```

### How to Build

Run the following command in order to generate an optimized production build of the app.

```bash
$ yarn build
```

### How to Run Locally

#### Development Mode

The package manager used in this project is `yarn`. To install yarn, you can follow the [official guide](https://classic.yarnpkg.com/en/docs/install#debian-stable).

Once yarn is installed, navigate to the project root and execute the following command:

```bash
$ yarn
```

This will initialize and install all the required dependencies.

In order to run the app in the development mode:

```bash
$ yarn start
```

Visit [http://localhost:3001/api-docs/](http://localhost:3001/api-docs/) in the browser to visit the swagger doc!
