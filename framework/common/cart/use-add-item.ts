import { useHook, useMutationHook } from '../../../components/common/utils/use-hook'

export const useAddItem = () => {
  const hook = useHook((hook) => hook.cart.useAddItem)

  return useMutationHook({ ...hook })
}
