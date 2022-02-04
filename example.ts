import { Tail } from "https://deno.land/x/tail@1.0.1/mod.ts";

const tail = new Tail("/var/tmp/testFile.txt");
for await (const line of tail.start()) {
  console.log("Got a line:", line);
}
