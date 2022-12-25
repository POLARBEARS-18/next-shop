import { MutationHook } from '../types/hooks'
import { useHook, useMutationHook } from '../utils/use-hook'

export type UseUpdateItem<H extends MutationHook = MutationHook<any>> = ReturnType<H['useHook']>

export const useUpdateItem: UseUpdateItem = () => {
  const hook = useHook((hooks) => hooks.cart.useUpdateItem)

  return useMutationHook({ ...hook })()
}
