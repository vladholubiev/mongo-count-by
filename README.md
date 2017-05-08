# MongoDB Count By

> Like _.countBy from lodash, but over MongoDB collection

## Install

```shell
$ yarn add mongo-count-by
```

## Usage

```javascript
import {init, countBy} from 'mongo-count-by';

await init('mongodb://localhost:27017');

const counts = await countBy('type'); // {a: 1, b: 2, c: 3}
```
