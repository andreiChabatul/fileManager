import { readdir, lstat } from 'fs/promises';
import path from 'path';

export const listDirectory = async (pathDirectory) => {
    try {
        const listFiles = await readdir(pathDirectory);

        const obj = await Promise.all(
            listFiles.map(async (item) => {
                if (await isSymbolicLink(path.join(pathDirectory, item))) {
                    return { type: 'Shortcut', Name: item }
                } else {
                    return { type: (await isDirectory(path.join(pathDirectory, item)) ? 'Directory' : 'Files'), Name: item }
                }
            })
        )

        obj.sort((a, b) => {
            if (a.type < b.type) {
                return -1;
            }
            if (a.type > b.type) {
                return 1;
            }
            return a.Name - b.Name;
        });

        console.table(obj.map((x, i) => ({ 'Name': obj[i].Name, 'type': obj[i].type })))

    } catch (err) {
        throw new Error('FS operation failed');
    }
}

async function isDirectory(pathItem) {
    try {
        return (await lstat(pathItem)).isDirectory();
    }
    catch (e) {
        return false;
    }
}

async function isSymbolicLink(pathItem) {
    try {
        return (await lstat(pathItem)).isSymbolicLink();
    }
    catch (e) {
        return false;
    }
}