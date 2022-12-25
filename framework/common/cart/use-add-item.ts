import { MutationHook } from '../types/hooks'
import { useHook, useMutationHook } from '../utils/use-hook'

export type UseAddItem<H extends MutationHook = MutationHook<any>> = ReturnType<H['useHook']>

export const useAddItem: UseAddItem = () => {
  const hook = useHook((hooks) => hooks.cart.useAddItem)

  return useMutationHook({ ...hook })()
}
