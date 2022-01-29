export function clickOutside(element: HTMLElement, callbackFunction: () => void) {
    function onClick(event: MouseEvent) {
        if (!element.contains(event.target as Node)) {
            callbackFunction();
        }
    }

    // don't listen to first click (ex: the one that opens the dropdown)
    setTimeout(() => document.body.addEventListener('click', onClick));

    return {
        update(newCallbackFunction) {
            callbackFunction = newCallbackFunction;
        },
        destroy() {
            document.body.removeEventListener('click', onClick);
        }
    }
}