import { createHash } from 'crypto';
import { readFile } from 'fs';
import { errorFunction } from '../utils.js';
import { actualDirectory } from '../workingDirectory/directory.js';
import path from 'path';

export const hashCalc = async (file) => {

    readFile(path.join(actualDirectory.getDirectory(), file), function (error, data) {
        if (error) {
            errorFunction();
        } else {
            const hash = createHash('sha256').update(data);
            console.log('Hash for file: ' + hash.digest('hex'));
        }
    });
};
