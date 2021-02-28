# fastify-fauna

[Getting started with Fauna and Node.js using Fastify](https://fauna.com/blog/getting-started-with-fauna-and-node-js-using-fastify) に沿って作成する。

## Required versions

- Node.js 14.15.5
- nodemon 2.0.7 or later

```shell script
# set up
npm install --engine-strict

# run lint
npm run lint

# run developer mode
npm run dev

# build
npm run build

# run
npm run start
```

## JSON Schemaを追加する

`json2ts`により、型定義ファイルを生成する。

```shell script
touch schemas/NewSchema.json

npm run compile-schemas
```

ソースコードで必要に応じてインポートする。

```typescript
import NewSchema from "@schemas/NewSchema.json";
import { NewSchema as NewSchemaInterface } from "types/NewSchema";
```
