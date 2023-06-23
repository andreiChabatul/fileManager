import os from 'os';
import { errorFunction } from '../utils.js';

export const infoOS = (param) => {

    switch (param) {
        case '--EOL':
            console.log('Default system End-Of-Line: ' + JSON.stringify(os.EOL));
            break;
        case '--homedir':
            console.log('Home directory: ' + os.homedir());
            break;
        case '--username':
            console.log('Current system user name: ' + os.userInfo().username);
            break;
        case '--architecture':
            console.log('CPU architecture: ' + os.arch());
            break;
        case '--cpus':
            let cpu_s = os.cpus();
            let no_of_logical_core = 0;
            cpu_s.forEach(element => {
                no_of_logical_core++;
                console.log("Logical core "
                    + no_of_logical_core + " :");
                console.log(element);
            });

            console.log("total number of logical core is "
                + no_of_logical_core);
            break;
        default:
            errorFunction();
            break;
    }
};
