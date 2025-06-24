import { useCallback, useState } from "react";

const READ_NOTIFICATIONS_KEY = "read-notif-ids";

function getStoredIds() {
    const stored = localStorage.getItem(READ_NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function useReadNotifications() {
    const [readIds, setReadIds] = useState(() => getStoredIds());

    const isRead = useCallback((id) => readIds.includes(id), [readIds]);

    const markAsRead = useCallback(
        (id) => {
            const updated = [...new Set([...readIds, id])];
            setReadIds(updated);
            localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(updated));
        }, [readIds],
    );

    const markAllAsRead = useCallback(
        (ids) => {
            const updated = [...new Set([...readIds, ...ids])];
            setReadIds(updated);
            localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(updated));
        }, [readIds],
    );

    const clearRead = useCallback(() => {
        setReadIds([]);
        localStorage.removeItem(READ_NOTIFICATIONS_KEY);
    }, []);

    const getReadIds = useCallback(() => readIds, [readIds]);

    return {
        isRead,
        markAsRead,
        markAllAsRead,
        clearRead,
        getReadIds,
    };
}