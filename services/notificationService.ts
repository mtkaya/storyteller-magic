// Notification Service for bedtime reminders
export interface ReminderSettings {
    enabled: boolean;
    time: string; // "HH:MM" format
    days: number[]; // 0 = Sunday, 6 = Saturday
}

class NotificationService {
    private permission: NotificationPermission = 'default';

    async init(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.log('Notifications not supported');
            return false;
        }

        this.permission = Notification.permission;

        if (this.permission === 'default') {
            this.permission = await Notification.requestPermission();
        }

        return this.permission === 'granted';
    }

    async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) return false;

        this.permission = await Notification.requestPermission();
        return this.permission === 'granted';
    }

    isPermissionGranted(): boolean {
        return this.permission === 'granted';
    }

    // Send a local notification
    sendNotification(title: string, options?: NotificationOptions): Notification | null {
        if (this.permission !== 'granted') return null;

        return new Notification(title, {
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            ...options,
        });
    }

    // Schedule daily reminder
    scheduleDailyReminder(time: string, language: 'en' | 'tr' = 'en'): number | null {
        const [hours, minutes] = time.split(':').map(Number);

        const now = new Date();
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);

        // If time has passed today, schedule for tomorrow
        if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        const delay = scheduledTime.getTime() - now.getTime();

        const messages = {
            en: {
                title: '🌙 Bedtime Story Time!',
                body: 'Time for a magical adventure before sleep.',
            },
            tr: {
                title: '🌙 Uyku Hikayesi Vakti!',
                body: 'Uyumadan önce sihirli bir maceraya hazır mısın?',
            },
        };

        const timerId = window.setTimeout(() => {
            this.sendNotification(messages[language].title, {
                body: messages[language].body,
                tag: 'bedtime-reminder',
                requireInteraction: true,
                actions: [
                    { action: 'open', title: language === 'tr' ? 'Hikaye Oku' : 'Read Story' },
                    { action: 'snooze', title: language === 'tr' ? 'Ertele' : 'Snooze' },
                ],
            });

            // Reschedule for next day
            this.scheduleDailyReminder(time, language);
        }, delay);

        return timerId;
    }

    // Cancel scheduled reminder
    cancelReminder(timerId: number): void {
        window.clearTimeout(timerId);
    }

    // Register for push notifications (requires backend)
    async registerPushNotifications(): Promise<PushSubscription | null> {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            return null;
        }

        try {
            const registration = await navigator.serviceWorker.ready;

            // Check if already subscribed
            let subscription = await registration.pushManager.getSubscription();

            if (!subscription) {
                // Subscribe to push notifications
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    // In production, use your VAPID public key here
                    applicationServerKey: this.urlBase64ToUint8Array(
                        'YOUR_VAPID_PUBLIC_KEY_HERE'
                    ),
                });
            }

            return subscription;
        } catch (error) {
            console.error('Failed to subscribe to push notifications:', error);
            return null;
        }
    }

    private urlBase64ToUint8Array(base64String: string): Uint8Array {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    }
}

export const notificationService = new NotificationService();
