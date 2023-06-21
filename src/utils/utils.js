import { argv } from "node:process";

export const getUserName = () => {
    return argv.filter(arg => arg.includes('username'))[0]
        .split('=')
        .reverse()[0]
};
