import { readStringDelim } from "./deps.ts";

const LF = "\n";

export class Tail {
  private fileName: string;
  private watcher: Deno.FsWatcher | undefined;

  constructor(fileName: string) {
    if (!fileName) {
      throw new Deno.errors.InvalidData("File path must be provided");
    }
    this.fileName = fileName;
  }

  private async getReader(): Promise<Deno.File> {
    const fileReader = await Deno.open(this.fileName);
    await Deno.seek(fileReader.rid, await this.getSize(), Deno.SeekMode.Start);
    return fileReader;
  }

  private async getSize() {
    return (await Deno.stat(this.fileName)).size;
  }

  public async *start() {
    const fileReader = await this.getReader();
    this.watcher = Deno.watchFs(this.fileName);
    for await (const e of this.watcher) {
      if (e.kind !== "modify") {
        continue;
      }
      for await (const line of await readStringDelim(fileReader, LF)) {
        if (!line) {
          break;
        }
        yield (line.trim());
      }
    }
  }

  public stop() {
    this.watcher?.close();
  }
}
