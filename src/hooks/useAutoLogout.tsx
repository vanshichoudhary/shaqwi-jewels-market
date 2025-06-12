
import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UseAutoLogoutProps {
  timeoutMinutes?: number;
  onShowLoginPrompt: () => void;
}

export const useAutoLogout = ({ 
  timeoutMinutes = 1, 
  onShowLoginPrompt 
}: UseAutoLogoutProps) => {
  const { user, signOut } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }

    if (user) {
      // Show login prompt after the specified timeout
      timeoutRef.current = setTimeout(() => {
        signOut();
        onShowLoginPrompt();
      }, timeoutMinutes * 60 * 1000);
    }
  };

  useEffect(() => {
    if (user) {
      resetTimer();

      // Reset timer on user activity
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      const resetTimerHandler = () => {
        resetTimer();
      };

      events.forEach(event => {
        document.addEventListener(event, resetTimerHandler, true);
      });

      return () => {
        events.forEach(event => {
          document.removeEventListener(event, resetTimerHandler, true);
        });
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (warningRef.current) {
          clearTimeout(warningRef.current);
        }
      };
    }
  }, [user, timeoutMinutes, onShowLoginPrompt, signOut]);

  return { resetTimer };
};
