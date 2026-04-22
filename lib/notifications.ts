/**
 * Notification and reminder utilities for Loopify
 */

/**
 * Request permission for push notifications
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }

  return false;
}

/**
 * Send a notification
 */
export function sendNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon.svg',
      ...options,
    });
  }
}

/**
 * Schedule a daily reminder notification
 */
export function scheduleDailyReminder(time: string = '09:00') {
  const [hours, minutes] = time.split(':').map(Number);
  
  const scheduleNextReminder = () => {
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (reminderTime < now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const msUntilReminder = reminderTime.getTime() - now.getTime();

    setTimeout(() => {
      sendNotification('Time to Learn!', {
        body: 'Your daily learning session awaits. Keep your streak alive!',
        tag: 'daily-reminder',
      });
      scheduleNextReminder(); // Reschedule for next day
    }, msUntilReminder);
  };

  scheduleNextReminder();
}

/**
 * Send streak loss warning notification
 */
export function sendStreakWarning(hoursLeft: number) {
  sendNotification('Streak at Risk!', {
    body: `You have ${hoursLeft} hours left to maintain your streak. Complete a challenge now!`,
    tag: 'streak-warning',
  });
}

/**
 * Send level up notification
 */
export function sendLevelUpNotification(newLevel: number) {
  sendNotification('Level Up!', {
    body: `Congratulations! You reached level ${newLevel}. Keep it up!`,
    tag: 'level-up',
  });
}

/**
 * Send achievement notification
 */
export function sendAchievementNotification(achievementName: string, description: string) {
  sendNotification(`Achievement Unlocked: ${achievementName}`, {
    body: description,
    tag: 'achievement',
  });
}

/**
 * Get time until next midnight (for streak reset)
 */
export function getHoursUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date();
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  
  const msUntilMidnight = midnight.getTime() - now.getTime();
  return Math.ceil(msUntilMidnight / (1000 * 60 * 60));
}

/**
 * Check if streak is at risk (more than 20 hours since last activity)
 */
export function isStreakAtRisk(lastActivityTime: Date): boolean {
  const now = new Date();
  const hoursSinceActivity = (now.getTime() - lastActivityTime.getTime()) / (1000 * 60 * 60);
  return hoursSinceActivity > 20;
}
