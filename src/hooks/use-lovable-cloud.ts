import { useState, useCallback } from 'react';
import { getLovableService } from '@/lib/lovable';
import type { LovableUser } from '@/lib/lovable';
import type { UserRole } from '@/lib/rbac';

export const useLovableCloud = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lovable = getLovableService();

  // User Management
  const getUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const users = await lovable.getUsers();
      return users;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [lovable]);

  const createUser = useCallback(
    async (userData: Partial<LovableUser>) => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await lovable.createUser(userData);
        return user;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create user';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [lovable]
  );

  const updateUser = useCallback(
    async (userId: string, userData: Partial<LovableUser>) => {
      try {
        setIsLoading(true);
        setError(null);
        const user = await lovable.updateUser(userId, userData);
        return user;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update user';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [lovable]
  );

  const deleteUser = useCallback(
    async (userId: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await lovable.deleteUser(userId);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete user';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [lovable]
  );

  // Quote Management
  const getQuotes = useCallback(
    async (filters?: Record<string, any>) => {
      try {
        setIsLoading(true);
        setError(null);
        const quotes = await lovable.getQuotes(filters);
        return quotes;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch quotes';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [lovable]
  );

  const updateQuote = useCallback(
    async (quoteId: string, quoteData: any) => {
      try {
        setIsLoading(true);
        setError(null);
        const quote = await lovable.updateQuote(quoteId, quoteData);
        return quote;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update quote';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [lovable]
  );

  // Analytics
  const getAnalytics = useCallback(
    async (startDate: string, endDate: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const analytics = await lovable.getAnalytics(startDate, endDate);
        return analytics;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch analytics';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [lovable]
  );

  const healthCheck = useCallback(async () => {
    try {
      const health = await lovable.healthCheck();
      return health.status === 'ok';
    } catch {
      return false;
    }
  }, [lovable]);

  return {
    isLoading,
    error,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getQuotes,
    updateQuote,
    getAnalytics,
    healthCheck,
  };
};

export default useLovableCloud;
