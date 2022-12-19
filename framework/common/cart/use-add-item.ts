import { useHook, useMutationHook } from '../utils/use-hook'

export const useAddItem = () => {
  const hook = useHook((hooks) => hooks.cart.useAddItem)

  return useMutationHook({ ...hook })
}
