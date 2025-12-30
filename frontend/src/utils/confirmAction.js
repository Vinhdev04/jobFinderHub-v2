// confirmAction dispatches a CustomEvent that the ConfirmProvider can handle.
// If no provider listens, it falls back to `window.confirm`.
const EVENT_NAME = 'app:confirm';

const confirmAction = (message, title) => {
    return new Promise((resolve) => {
        // Create a cancellable event payload
        const payload = { message, title, resolve };
        const event = new CustomEvent(EVENT_NAME, { detail: payload });

        // Temporary listener fallback in case nobody handles the event
        let handled = false;
        const fallback = () => {
            if (handled) return;
            handled = true;
            const ok = window.confirm(message);
            resolve(!!ok);
        };

        // Dispatch the event on window
        window.dispatchEvent(event);

        // Wait a short time; if no provider resolved, fallback
        setTimeout(fallback, 50);
    });
};

export default confirmAction;
