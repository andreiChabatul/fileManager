import { argv } from "node:process";

const getUserName = () => {
    return argv.filter(arg => arg.includes('username'))[0]
        .split('=')
        .reverse()[0]
};


const errorFunction = () => {
    console.log('Operation failed')
}

export {
    getUserName,
    errorFunction
}