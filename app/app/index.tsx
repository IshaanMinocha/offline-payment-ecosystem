import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
    useEffect(() => {
        // Redirect to login screen when app starts
        router.replace('/login');
    }, []);

    return null;
} 