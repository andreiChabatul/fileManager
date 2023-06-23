import readline from 'readline';
import { errorFunction, getUserName } from './utils/utils.js';
import os from 'os';
import { listDirectory } from './utils/workingDirectory/workingDirectory.js';
import path from 'path';
import { createFileBasic, deleteFileBasic, readFileBasic, renameFileBasic } from './utils/operationFiles/basicOperation.js';
import { infoOS } from './utils/OSInfo/OSInfo.js';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const userHomeDir = os.homedir();
const username = getUserName();
let directory = userHomeDir;

const exitPhrase = `Thank you for using File Manager, ${username}, goodbye!`;
const pathPhrase = `You are currently in ${directory}\n`;


process.stdout.write(`Welcome to the File Manager, ${username}!\n`)
process.stdout.write(pathPhrase)

rl.on('line', (input) => {
    const inputEnter = input.split(' ');
    switch (inputEnter[0]) {
        case ('.exit'): {
            closeStream();
            break;
        }
        case ('ls'): {
            listDirectory(directory);
            break;
        }
        case ('cat'): {
            readFileBasic(path.join(directory, inputEnter[1]))
            break;
        }
        case ('add'): {
            if (inputEnter[1]) {
                createFileBasic(path.join(directory, inputEnter[1]));
            } else {
                errorFunction();
            }
            break;
        }
        case ('rn'): {
            if (inputEnter[1] && inputEnter[2]) {
                renameFileBasic(path.join(directory, inputEnter[1]), path.join(directory, inputEnter[2]));
            }
            else {
                errorFunction();
            }
            break;
        }
        case ('rm'): {
            if (inputEnter[1]) {
                deleteFileBasic(path.join(directory, inputEnter[1]));
            } else {
                errorFunction();
            }
            break;
        }
        case ('os'): {
            if (inputEnter[1]) {
                infoOS(inputEnter[1]);
            } else {
                errorFunction();
            }
            break;
        }
    }


    try {
        checkCommand()
    } catch (e) {

    }
    process.stdout.write(pathPhrase)
});

rl.on('SIGINT', () => {
    closeStream();
});

const closeStream = () => {
    process.stdout.write(exitPhrase)
    rl.close();
    return;
}