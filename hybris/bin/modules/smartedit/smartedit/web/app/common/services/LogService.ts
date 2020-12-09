/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
export enum LogLevel {
	log,
	debug,
	info,
	warn,
	error
}
export class LogService {

	private logLevel = LogLevel.info;

	log(...msg: any[]) {
		this._log(LogLevel.log, msg);
	}

	debug(...msg: any[]) {
		this._log(LogLevel.debug, msg);
	}

	info(...msg: any[]) {
		this._log(LogLevel.info, msg);
	}

	warn(...msg: any[]) {
		this._log(LogLevel.warn, msg);
	}

	error(...msg: any[]) {
		this._log(LogLevel.error, msg);
	}

	setLogLevel(logLevel: LogLevel) {
		this.logLevel = logLevel;
	}

	private _log(requestLevel: LogLevel, msg: any[]) {
		if (requestLevel >= this.logLevel) {
			const method = LogLevel[requestLevel] as keyof Console;
			if (this._console() && this._console()[method]) {
				this._console()[method](...msg);
			}
		}
	}

	private _console(): Console {
		return console;
	}

}