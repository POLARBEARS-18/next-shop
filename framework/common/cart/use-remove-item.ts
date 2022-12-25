import { MutationHook } from '../types/hooks'
import { useHook, useMutationHook } from '../utils/use-hook'

export type UseRemoveItem<H extends MutationHook = MutationHook<any>> = ReturnType<H['useHook']>

export const useRemoveItem: UseRemoveItem = () => {
  const hook = useHook((hooks) => hooks.cart.useRemoveItem)

  return useMutationHook({ ...hook })()
}
