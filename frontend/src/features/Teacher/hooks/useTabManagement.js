// hooks/useTabManagement.js

import { useState, useCallback } from 'react';
import { TAB_IDS } from '../constants/constants.js';

export const useTabManagement = (initialTab = TAB_IDS.OVERVIEW) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [tabHistory, setTabHistory] = useState([initialTab]);

    const changeTab = useCallback((tabId) => {
        setActiveTab(tabId);
        setTabHistory((prev) => [...prev, tabId]);
    }, []);

    const goBack = useCallback(() => {
        if (tabHistory.length > 1) {
            const newHistory = [...tabHistory];
            newHistory.pop();
            const previousTab = newHistory[newHistory.length - 1];
            setActiveTab(previousTab);
            setTabHistory(newHistory);
        }
    }, [tabHistory]);

    const resetTabs = useCallback(() => {
        setActiveTab(TAB_IDS.OVERVIEW);
        setTabHistory([TAB_IDS.OVERVIEW]);
    }, []);

    return {
        activeTab,
        changeTab,
        goBack,
        resetTabs,
        canGoBack: tabHistory.length > 1
    };
};
