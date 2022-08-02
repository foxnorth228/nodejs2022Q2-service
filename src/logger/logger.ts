import "dotenv/config";
import { LoggerService } from "@nestjs/common";
import { isAbsolute, join } from "path";
import { mkdir } from "fs";
import { open, FileHandle, mkdir as mkdirAsync } from "fs/promises";
import { statSync } from "fs";

export class FileLogger implements LoggerService {
    dirName: string;
    logLevel: number;
    logFiles: { 
        log?: FileHandle,
        error?: FileHandle,
        warn?: FileHandle,
        debug?: FileHandle,
        verbose?: FileHandle,
    };

    getFullPathLogFile = (dir: string, value: string) => join(this.dirName, dir, FileLogger.getLogFileName(value));

    static logSize: number = Number.parseInt(process.env.LOG_SIZE);
    static fileLogName: {
        log?: string,
        error?: string,
        warn?: string,
        debug?: string,
        verbose?: string,
    } = {};

    static logFileFactor: number = 1024; //Kb
    static instances: FileLogger[] = [];
    static logLevels = [
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

    static toTwoSigns = (num: number): string => (num >= 10) ? num.toString() : `0${num}`;
    static getLogFileName = (value: string) => `${value}-${FileLogger.fileLogName[value]}.txt`;

    static async sleep(ms: number) { 
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    static createLogDataName(): string {
        const date: Date = new Date();
        let fileLogName: string = `${date.getFullYear()}${FileLogger.toTwoSigns(date.getMonth() + 1)}`;
        fileLogName += `${FileLogger.toTwoSigns(date.getDate())}`;
        fileLogName += `${FileLogger.toTwoSigns(date.getHours())}`;
        fileLogName += `${FileLogger.toTwoSigns(date.getMinutes())}`;
        fileLogName += `${FileLogger.toTwoSigns(date.getSeconds())}`;
        return fileLogName;
    }

    static async closeAllFiles() {
        for (let logger of FileLogger.instances) {
            for (let fileHandler of Object.values(logger.logFiles)) {
                await fileHandler.close();
            }
        }
    }

    constructor(dirName: string = "", logLevel: number = 1) {
        this.dirName = isAbsolute(dirName) ? join(dirName, "logs") : join(process.cwd(), dirName, "logs");
        mkdir(this.dirName, (err) => {

        });

        this.logLevel = logLevel;
        this.logFiles = {};

        FileLogger.instances.push(this);
        this.openLogFiles();
    }

    async openLogFiles() {
        for (let i = 0; i < this.logLevel + 1; ++i) {
            for (let [key, value] of Object.entries(FileLogger.logLevels[i])) {
                try { 
                    await mkdirAsync(join(this.dirName, value)); 
                } catch(err) {

                }
                FileLogger.fileLogName[value] = FileLogger.createLogDataName();
                this.logFiles[key] = await open(this.getFullPathLogFile(value, value), 'w');
            }
        }
    }

    async closeFiles() {
        for (let fileHandler of Object.values(this.logFiles)) {
            fileHandler.close();
        }
    }

    async openFile(type: string) {
        FileLogger.fileLogName[type] = FileLogger.createLogDataName();
        this.logFiles[type] = await open(this.getFullPathLogFile(type, type), 'w')
    }

    async closeFile(type: string) {
        this.logFiles[type].close();
    }

    async log (message: any, ...optionalParams: any[]) {
        throw new Error("sss");
        await reject();
        await this.sendMessage('log', 'LOG', message);
    }

    async warn (message: any, ...optionalParams: any[]) {
        await this.sendMessage('warn', 'WARNING', message);
    }

    async error (message: any, ...optionalParams: any[]) {
        await this.sendMessage('error', 'ERROR', message);
    }

    async debug(message: any, ...optionalParams: any[]) {
        await this.sendMessage('debug', 'DEBUG', message);
    }

    async verbose(message: any, ...optionalParams: any[]) {
        await this.sendMessage('verbose', 'VERBOSE', message);
    }

    async sendMessage(type: string, logType: string, message: string): Promise<boolean> {
        if (!(type in this.logFiles)) {
            return;
        }
        const maxIteration: number = 6;
        let result: boolean = false;
        let i: number = 0;
        while(!result && i < maxIteration) {
            try {
                const logMessage = await this.createMessage(logType, message);
                await this.checkSize(type, type);
                await this.logFiles[type].write(logMessage);
                result = true;
            } catch(err) {
                if (i >= maxIteration) {
                    console.log(err.message);
                } else {
                    await FileLogger.sleep(1000)
                }
            } finally {
                i += 1;
            }
        }
        return result;
    }

    async createMessage(type: string, message: string): Promise<string> {
        const date = new Date();
        let writeMessage = `[${type} ${FileLogger.toTwoSigns(date.getHours())}:`;
        writeMessage += `${FileLogger.toTwoSigns(date.getMinutes())}:`;
        writeMessage += `${FileLogger.toTwoSigns(date.getSeconds())}]: `;
        writeMessage += `${message}\n`;
        return writeMessage;
    }

    async checkSize(type: string, dir: string) {
        const file = statSync(this.getFullPathLogFile(dir, type));
        if (file.size >= FileLogger.logSize * FileLogger.logFileFactor) {
            await this.closeFile(type);
            await this.openFile(type);
        }
    }
}

process.on('exit', () => {
    FileLogger.closeAllFiles();
});

async function reject() {
    return new Promise((resolve, reject) => reject("aa"));
}