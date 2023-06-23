import os from 'os';

class DirectoryClass {
    directory = os.homedir();

    setDirectory(newDirectory) {
        this.directory = newDirectory;
    }

    getDirectory() {
        return this.directory;
    }

    consoleDirectory() {
        process.stdout.write(`You are currently in ${this.directory}\n`)
    }
}


export const actualDirectory = new DirectoryClass();