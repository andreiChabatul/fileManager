import { readdir, lstat } from 'fs/promises';
import path from 'path';
import os, { homedir } from 'os';
import { errorFunction } from '../utils.js';
import { actualDirectory } from './directory.js';

export const pathDirectory = async (directory) => {
    let resultPath;

    if (directory.split(':').length > 1) {
        resultPath = directory
    } else {
        resultPath = path.join(actualDirectory.getDirectory(), directory);
    }

    if (await isDirectory(resultPath)) {
        actualDirectory.setDirectory(resultPath);
    } else {
        errorFunction();
    };
}

export const upDirectory = () => {
    const homeDir = os.homedir().split('\\');
    const actualDir = actualDirectory.getDirectory().split('\\');

    if (actualDir.length === homeDir.length) {
        actualDirectory.setDirectory(homeDir.join('\\'));
    } else {
        actualDir.pop()
        actualDirectory.setDirectory(actualDir.join('\\'));
    }
}

export const listDirectory = async () => {

    const pathDirectory = actualDirectory.getDirectory();

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
