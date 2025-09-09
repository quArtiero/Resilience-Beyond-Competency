import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/client'

export function useLessons() {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: api.getLessons,
    // Ensure fresh data after auth changes
    staleTime: 0,
  })
}

export function useLesson(id: number) {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: () => api.getLesson(id),
    enabled: !!id,
  })
}

export function useProgress() {
  return useQuery({
    queryKey: ['progress'],
    queryFn: api.getProgress,
    // Only fetch if user is authenticated
    enabled: !!localStorage.getItem('access_token'),
    // Ensure we always get fresh data after login
    staleTime: 0,
    // Retry on error (network issues, etc.)
    retry: 2,
  })
}

export function useCompleteLesson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.completeLesson,
    onSuccess: () => {
      console.log('✅ Lesson completed successfully!')
      // Invalidate and refetch all related data
      queryClient.invalidateQueries({ queryKey: ['progress'] })
      queryClient.invalidateQueries({ queryKey: ['lessons'] })
      
      // Show success notification if available
      if (window.alert) {
        window.alert('🎉 Lesson completed successfully!')
      }
    },
    onError: (error) => {
      console.error('❌ Error completing lesson:', error)
      // Show error notification
      if (window.alert) {
        window.alert('❌ Failed to complete lesson. Please try again.')
      }
    }
  })
} 