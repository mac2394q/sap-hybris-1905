import {SeFactory} from 'smarteditcommons/di/types';
declare let $script: any;

export class ScriptUtils {
	getInjector() {
		return $script;
	}

	inject(conf: {srcs: string[], callback: SeFactory, index?: number}): void {
		const srcs = conf.srcs;
		let index = conf.index;
		const callback = conf.callback;
		if (!srcs.length) {
			callback();
			return;
		}
		if (index === undefined) {
			index = 0;
		}
		if (srcs[index] !== undefined) {
			this.getInjector()(srcs[index], () => {
				if (index + 1 < srcs.length) {
					this.inject({
						srcs,
						index: index + 1,
						callback
					});
				} else if (typeof callback === 'function') {
					callback();
				}
			});
		}
	}
}

export const scriptUtils = new ScriptUtils();
