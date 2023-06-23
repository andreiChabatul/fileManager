import { argv } from "node:process";

const getUserName = () => {
    return argv.filter(arg => arg.includes('username'))[0]
        .split('=')
        .reverse()[0]
};


const errorFunction = () => {
    console.log('Operation failed')
}

const errorInput = () => {
    console.log('Invalid input')
}


export {
    getUserName,
    errorFunction,
    errorInput,
}