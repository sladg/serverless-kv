# ServerlessKV

Simple implementation of a key-value store using DynamoDB (more in future?).
Overcomes the need for creating complicated models and schemas.

Inspired by @vercel/kv

## Usage

### Standalone

```ts
import kvClient from "@sladg/serverless-kv"

const userKv = kvClient({
  model: "user",
  tableName: process.env.KV_TABLE_NAME!,
})

userKv.insert({ id: "user-id", other: "values", and: "fields" })
userKv.get("user-id")
userKv.delete("user-id")
```

And you can also use standalone commands:

```ts
import { kvCommands } from "@sladg/serverless-kv"

kvCommands.get("table-name", "user-id", "user-model")
```

### SST

This is primarily targeted to be used with SST, in order to do so, we recommend following:

`sst.config.ts`

```ts
import { SSTConfig } from "sst"
import { NextjsSite, Table } from "sst/constructs"

import { sst } from "@sladg/serverless-kv"

const config: SSTConfig = {
  config(_input) {
    return {
      name: "flamingo-dashboard",
      region: "eu-central-1",
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const table = new Table(stack, "table01", {
        ...sst.tableConfig,
      })

      const site = new NextjsSite(stack, "site", {
        bind: [table],
        environment: {
          KV_TABLE_NAME: table.tableName,
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
}

export default config
```

and then

`your-controller.ts`

```ts
const myKv = kvClient({ model: "user", tableName: process.env.KV_TABLE_NAME })

myKv.get("my-id")
```

This way, you can use kv outside of pages (aka. in utils folder, or in controllers, etc.)
