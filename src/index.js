import readline from 'readline';
import { getUserName } from './utils/utils.js';
import os from 'os';

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
if (input.toLowerCase() === '.exit') return closeStream();

try {
checkCommand()
} catch(e) {

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