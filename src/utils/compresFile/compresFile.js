import fs from 'fs';
import zlib from 'zlib';
import { errorFunction } from '../utils.js';
import { actualDirectory } from '../workingDirectory/directory.js';
import path from 'path';

export const workZlibFile = (initPath, finishPath, type) => {

    const readStream = fs.createReadStream(path.join(actualDirectory.getDirectory(), initPath));
    const writeStream = fs.createWriteStream(path.join(actualDirectory.getDirectory(), finishPath));

    const brotli = type ? zlib.createBrotliCompress() : zlib.createBrotliDecompress();

    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
        console.log(`Done ${type ? 'compressing' : 'decompressing'}`);
    });

    readStream.on('error', () => {
        errorFunction()
    });
}
