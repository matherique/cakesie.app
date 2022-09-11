import { useCallback } from "react";
import { toast } from "react-toastify";

export default function useAlert() {
  const success = useCallback((message: string) => toast.success(message), [])
  const error = useCallback((message: string) => toast.error(message), [])
  const info = useCallback((message: string) => toast.info(message), [])
  const warning = useCallback((message: string) => toast.warning(message), [])

  return {
    success,
    error,
    info,
    warning
  }
}