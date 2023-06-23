import { createReadStream, rename } from 'fs';
import { errorFunction } from '../utils.js';
import { appendFile, unlink } from 'fs/promises';


export const readFileBasic = async (path) => {

    const readStream = createReadStream(path);

    readStream.on("data", function (chunk) {
        console.log(chunk.toString());
    });

    readStream.on("error", errorFunction);
}

export const createFileBasic = (path) => {
    appendFile(path, '', { flag: "ax" })
        .catch(errorFunction);
}

export const renameFileBasic = (path, newPath) => {
    rename(path, newPath, (error) => {
        if (error)
            errorFunction;
    });
}

export const deleteFileBasic = async (path) => {
    await unlink(path)
        .catch(errorFunction);
}


