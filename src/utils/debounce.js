let lastCallback;
let lastTimeExecuted = 0;
let futureCallback;

const debounce = (callback, timeout, retryTimeout) => {
    if (!retryTimeout) {
        retryTimeout = 500;
    }

    if (new Date() - lastTimeExecuted >= timeout) {
        lastTimeExecuted = new Date();
        callback();
    } else {
        lastCallback = callback;

        if (futureCallback !== undefined) {
            clearTimeout(futureCallback);
            futureCallback = undefined;
        }

        futureCallback = setTimeout(function () {
            debounce(lastCallback, timeout, retryTimeout)
        }, retryTimeout);

    }
};

export default debounce