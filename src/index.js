import readline from 'readline';
import { errorInput, getUserName } from './utils/utils.js';
import { listDirectory, pathDirectory, upDirectory } from './utils/workingDirectory/workingDirectory.js';
import { copyFileBasic, createFileBasic, deleteFileBasic, readFileBasic, renameFileBasic } from './utils/operationFiles/basicOperation.js';
import { infoOS } from './utils/OSInfo/OSInfo.js';
import { hashCalc } from './utils/hashCalc/hashCalc.js';
import { workZlibFile } from './utils/compresFile/compresFile.js';
import { actualDirectory } from './utils/workingDirectory/directory.js';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const username = getUserName();
const exitPhrase = `Thank you for using File Manager, ${username}, goodbye!`;

process.stdout.write(`Welcome to the File Manager, ${username}!\n`)
actualDirectory.consoleDirectory();

rl.on('line', async (input) => {
    const inputEnter = input.split(' ');
    switch (inputEnter[0]) {
        case ('.exit'): {
            closeStream();
            break;
        }
        case ('ls'): {
            await listDirectory();
            break;
        }
        case ('cat'): {
            inputEnter[1] ? await readFileBasic(inputEnter[1]) : errorInput();
            break;
        }
        case ('add'): {
            inputEnter[1] ? createFileBasic(inputEnter[1]) : errorInput();
            break;
        }
        case ('rn'): {
            (inputEnter[1] && inputEnter[2]) ? renameFileBasic(inputEnter[1], inputEnter[2]) : errorInput();
            break;
        }
        case ('rm'): {
            inputEnter[1] ? deleteFileBasic(inputEnter[1]) : errorInput();
            break;
        }
        case ('os'): {
            inputEnter[1] ? infoOS(inputEnter[1]) : errorInput();
            break;
        }
        case ('hash'): {
            inputEnter[1] ? hashCalc(inputEnter[1]) : errorInput();
            break;
        }
        case ('compress'): {
            (inputEnter[1] && inputEnter[2]) ? workZlibFile(inputEnter[1], inputEnter[2], true) : errorInput();
            break;
        }
        case ('decompress'): {
            (inputEnter[1] && inputEnter[2]) ? workZlibFile(inputEnter[1], inputEnter[2], false) : errorInput();
            break;
        }
        case ('cd'): {
            inputEnter[1] ? await pathDirectory(inputEnter[1]) : errorInput();
            break;
        }
        case ('up'): {
            upDirectory();
            break;
        }
        case ('cp'): {
            (inputEnter[1] && inputEnter[2]) ? copyFileBasic(inputEnter[1], inputEnter[2], false) : errorInput();
            break;
        }
        case ('mv'): {
            (inputEnter[1] && inputEnter[2]) ? copyFileBasic(inputEnter[1], inputEnter[2], true) : errorInput();
            break;
        }
        default: {
            errorInput();
        }
    }
    actualDirectory.consoleDirectory();
});


rl.on('SIGINT', () => {
    closeStream();
});

const closeStream = () => {
    process.stdout.write(exitPhrase)
    rl.close();
    return;
}