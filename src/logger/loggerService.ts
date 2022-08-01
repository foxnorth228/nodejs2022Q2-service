import { LoggerService } from "@nestjs/common";
import { isAbsolute, join } from "path";
import { mkdir, createWriteStream } from "fs";
import { stat } from "fs/promises";

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
    getFullPathLogFile = (value: string) => join(this.dirName, FileLogger.getLogFileName(value));
    static fileLogName: string | null = null;
    static toTwoSigns = (num: number): string => (num >= 10) ? num.toString() : `0${num}`;
    static getLogFileName = (value: string) => `${value}-${FileLogger.fileLogName}.txt`;

    constructor(dirName: string = "", logLevel: number = 1, logSize: number = 16) {
        if (isAbsolute(dirName)) {
            this.dirName = join(dirName, "logs");
        } else {
            this.dirName = join(process.cwd(), dirName, "logs");
        }
        mkdir(this.dirName, (err) => {

        });
        console.log(this.dirName);
        this.logLevel = {};
        const date = new Date();
        console.log(date.getMonth());

        let fileLogName: string = `${FileLogger.toTwoSigns(date.getDate())}`;
        fileLogName += `${FileLogger.toTwoSigns(date.getMonth() + 1)}${date.getFullYear()}`;
        fileLogName += `${FileLogger.toTwoSigns(date.getHours())}`;
        fileLogName += `${FileLogger.toTwoSigns(date.getMinutes())}`;
        fileLogName += `${FileLogger.toTwoSigns(date.getSeconds())}`;
        console.log(fileLogName);
        FileLogger.fileLogName = fileLogName;
        for (let i = 0; i < logLevel + 1; i++) {
            for (let [key, value] of Object.entries(logLevels[i])) {
                this.logLevel[key] = value;
            }
        }
        this.logSize = logSize;
    }

    async log (message: any, ...optionalParams: any[]) {
        await this.checkSize('log');
        this.logLevel['log'].write(await this.createMessage("LOG", message));
    }

    async warn (message: any, ...optionalParams: any[]) {
        this.logLevel['warn'].write(await this.createMessage("WARNING", message));
    }

    async error (message: any, ...optionalParams: any[]) {
        this.logLevel['error'].write(await this.createMessage("ERROR", message));
    }

    async debug(message: any, ...optionalParams: any[]) {
        this.logLevel['debug'].write(await this.createMessage("DEBUG", message));
    }

    async verbose(message: any, ...optionalParams: any[]) {
        this.logLevel['verbose'].write(await this.createMessage("VERBOSE", message));
    }

    async createMessage(type: string, message: string): Promise<string> {
        const date = new Date();
        let writeMessage = `[${type} ${FileLogger.toTwoSigns(date.getHours())}:`;
        writeMessage += `${FileLogger.toTwoSigns(date.getMinutes())}:`;
        writeMessage += `${FileLogger.toTwoSigns(date.getSeconds())}]: `;
        writeMessage += `${message}\n`;
        return writeMessage;
    }

    async checkSize(value: string) {
        const a = await stat(join(this.dirName, `${value}-${FileLogger.fileLogName}.txt`));
        console.log(a.size);
    }
}