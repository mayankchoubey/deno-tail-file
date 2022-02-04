# Tail a file in Deno
This module provides facility to tail a file in Deno.

## Dependencies

This module uses a single dependency from Deno's standard library: 
- readStringDelim

## Usage
To tail a file, import the Tail class & create a tail object by providing the file name.

```ts
import { Tail } from "./mod.ts";

const tail = new Tail("/var/tmp/testFile.txt");
```

To start tailing, use the start API that returns an async iterable:

```ts
for await (const line of tail.start()) {
  //Process line
}
```

To stop tailing, use the stop API:

```ts
tail.stop();
```

## Example
Here is a complete example:

```ts
import { Tail } from "https://deno.land/x/tail@1.0.1/mod.ts";

const tail = new Tail("/var/tmp/testFile.txt");
for await (const line of tail.start()) {
  console.log("Got a line:", line);
}
```
