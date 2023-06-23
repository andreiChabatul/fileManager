import { createReadStream, createWriteStream, rename } from 'fs';
import { errorFunction } from '../utils.js';
import { appendFile, unlink } from 'fs/promises';
import path from 'path';
import { actualDirectory } from '../workingDirectory/directory.js';


export const readFileBasic = async (file) => {

    const readStream = createReadStream(path.join(actualDirectory.getDirectory(), file));

    readStream.on("data", function (chunk) {
        console.log(chunk.toString());
    });

    readStream.on("error", errorFunction);
}

export const createFileBasic = (file) => {
    appendFile(path.join(actualDirectory.getDirectory(), file), '', { flag: "ax" })
        .catch(errorFunction);
}

export const renameFileBasic = (name, newName) => {
    rename(path.join(actualDirectory.getDirectory(), name), path.join(actualDirectory.getDirectory(), newName), (error) => {
        if (error)
            errorFunction();
    });
}

export const deleteFileBasic = async (file) => {
    await unlink(path.join(actualDirectory.getDirectory(), file))
        .catch(errorFunction);
}

export const copyFileBasic = async (initPath, finishPath, deleteInit) => {
    const readStream = createReadStream(path.join(actualDirectory.getDirectory(), initPath));
    const writeStream = createWriteStream(path.join(actualDirectory.getDirectory(), finishPath, initPath));

    readStream.on("error", errorFunction);
    writeStream.on("error", errorFunction);

    readStream.pipe(writeStream)
        .on('finish', () => { if (deleteInit) deleteFileBasic(initPath) }
        );
}
