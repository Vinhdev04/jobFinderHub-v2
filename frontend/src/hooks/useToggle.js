// src/hooks/useToggle.js

import { useState, useCallback } from 'react';

/**
 * Custom hook để toggle boolean state
 * @param {boolean} initialState - Giá trị khởi tạo
 * @returns {[boolean, function]} - [state, toggle function]
 */
export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);

    const toggle = useCallback(() => {
        setState((prev) => !prev);
    }, []);

    const setTrue = useCallback(() => {
        setState(true);
    }, []);

    const setFalse = useCallback(() => {
        setState(false);
    }, []);

    return [state, toggle, setTrue, setFalse];
};

export default useToggle;
