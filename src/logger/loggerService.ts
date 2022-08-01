import { LoggerService } from "@nestjs/common";
import { isAbsolute, join } from "path";
import { mkdir, createWriteStream } from "fs"

process.on('exit', (code) => {
    for (let logger of FileLogger.instances) {
        logger.end();
    }
});

const logLevels = [
    {
        'log': 'log'
    },
    {
        'error': 'error',
        'warn': 'error',
    },
    {
        'debug': 'debug',
        'verbose': 'debug'
    },
];

export class FileLogger implements LoggerService {
    dirName: string;
    logLevel: object;
    logSize: number;
    static instances: FileLogger[] = [];

    constructor(dirName: string = "", logLevel: number = 1, logSize: number = 16) {
        if (isAbsolute(dirName)) {
            this.dirName = join(dirName, "logs");
        } else {
            this.dirName = join(process.cwd(), dirName, "logs");
        }
        mkdir(this.dirName, (err) => {

        });
        console.log(this.dirName);
        FileLogger.instances.push(this);
        this.logLevel = {};
        const date = new Date();
        const toTwoSigns = (num: number): string => (num >= 10) ? num.toString() : `0${num}`;
        console.log(date.getMonth());

        let fileLogName: string = `${toTwoSigns(date.getDate())}${toTwoSigns(date.getMonth() + 1)}${date.getFullYear()}`;
        fileLogName += `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        console.log(fileLogName);
        for (let i = 0; i < logLevel + 1; i++) {
            for (let [key, value] of Object.entries(logLevels[i])) {
                this.logLevel[key] = createWriteStream(join(this.dirName, `${value}-${fileLogName}.txt`));
            }
        }
        this.logSize = logSize;
    }

    async log (message: any, ...optionalParams: any[]) {
        this.logLevel['log'].write(`${message}\n`);
    }

    async warn (message: any, ...optionalParams: any[]) {
        this.logLevel['warn'].write(`${message}\n`);
    }

    async error (message: any, ...optionalParams: any[]) {
        this.logLevel['error'].write(`${message}\n`);
    }

    async debug(message: any, ...optionalParams: any[]) {
        this.logLevel['debug'].write(`${message}\n`);
    }

    async verbose(message: any, ...optionalParams: any[]) {
        this.logLevel['verbose'].write(`${message}\n`);
    }

    end() {
        for(let streams of Object.values(this.logLevel)) {
            streams.close();
        }
    }
}