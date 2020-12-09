import {ScriptUtils} from './ScriptUtils';

describe('ScriptUtils test', () => {
	let scriptUtils: ScriptUtils;
	const appLocations = ['SEContainerLocationForAppA', 'SEContainerLocationForAppB'];

	beforeEach(() => {
		scriptUtils = new ScriptUtils();
	});

	it('injectJS will injects all sources in sequence and then call an optional callback', function() {
		const injectorMockHolder: any = jasmine.createSpyObj('injectorMockHolder', ['scriptJSMock']);
		injectorMockHolder.scriptJSMock.and.callFake(function(url: string, scriptCallback: () => void) {
			scriptCallback();
		});

		const callback = jasmine.createSpy('callback');
		spyOn(scriptUtils, 'getInjector').and.returnValue(injectorMockHolder.scriptJSMock);
		scriptUtils.inject({
			srcs: appLocations,
			callback
		});

		expect(injectorMockHolder.scriptJSMock.calls.count()).toBe(2);

		expect(injectorMockHolder.scriptJSMock.calls.argsFor(0)[0]).toEqual('SEContainerLocationForAppA', jasmine.any(Function));
		expect(injectorMockHolder.scriptJSMock.calls.argsFor(1)[0]).toEqual('SEContainerLocationForAppB', jasmine.any(Function));
		expect(callback).toHaveBeenCalled();
	});
});
