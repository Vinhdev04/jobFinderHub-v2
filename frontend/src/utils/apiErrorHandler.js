export function handleApiError(toast, err, fallback = 'Đã có lỗi xảy ra') {
    try {
        // err may be a string, an Error, or an object { message, status }
        const message =
            (err && (err.message || err.msg)) ||
            (typeof err === 'string' ? err : null) ||
            fallback;

        // If server returned status property, detect 403
        const status =
            err && (err.status || (err.response && err.response.status));

        if (status === 403 || /quyền/i.test(message)) {
            toast.error('Bạn không có quyền thực hiện hành động này');
            return;
        }

        toast.error(message);
    } catch (e) {
        try {
            toast.error(fallback);
        } catch (ee) {
            // swallow
            console.error('Toast failed', ee);
        }
    }
}

export default handleApiError;
