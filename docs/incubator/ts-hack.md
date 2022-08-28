# [工事中]TypeScript小ネタ

## 使うライブラリ

- DnD: [DataTransfer](https://developer.mozilla.org/ja/docs/Web/API/DataTransfer)
- ファイル読み取り(非同期): [File and Directory Entries API](https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API)

File and Directory Entries APIっていうやつを使うと、ディレクトリのパスなども取得できます。

このライブラリの有用な点としては、非同期なファイル読み取りができるところだと思ってます。

標準化されてないライブラリなので、気休め程度にしか使えないかも。(そもそもOS毎にファイルシステムは異なるので標準化は難しそう)

## TL;DR

### typescript コード

```typescript
/** DnDからファイル一覧のFile[]を取得する関数 */
async function readFileList(event: DragEvent): Promise<File[]> {
  const eventItems = event.dataTransfer.items;
  const entryList = [] as FileSystemEntry[];
  for (let index = 0; index < eventItems.length; index++) {
    const entry = eventItems[index].webkitGetAsEntry();
    entryList.push(entry);
  }

  return Promise.all(
    (await flattenFileEntries(entryList)).map(async fileEntry => await readFile(fileEntry))
  );
}

/** Directoryのツリーを平坦化 */
async function flattenFileEntries(entries: FileSystemEntry[]): Promise<FileSystemFileEntry[]> {
  const fileEntries = [] as FileSystemFileEntry[];
  for (const entry of entries) {
    if (entry.isFile) fileEntries.push(entry as FileSystemFileEntry);
    else if (entry.isDirectory)
      fileEntries.push(
        ...(await flattenFileEntries(await readDirectory(entry as FileSystemDirectoryEntry)))
      );
  }
  return fileEntries;
}

/** Fileの非同期読み取り */
function readFile(fileEntry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
}

/** Directory直下のファイルの非同期読み取り */
function readDirectory(directoryEntry: FileSystemDirectoryEntry): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) =>
    directoryEntry.createReader().readEntries(resolve, reject)
  );
}
```
