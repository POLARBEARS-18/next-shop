import { ApiHooks } from '../../../framework/common/types/api'
import { MutationHook } from '../../../framework/common/types/hooks'
import { useApiProvider } from '../../../framework/shopify'

export const useHook = (fn: (apiHooks: ApiHooks) => MutationHook) => {
  const { hooks } = useApiProvider()
  return fn(hooks)
}

export const useMutationHook = (hook: MutationHook) => {
  const { fetcher } = useApiProvider()

  return hook.useHook({
    fetch: (input: any) =>
      hook.fetcher({
        input,
        fetch: fetcher,
        options: hook.fetcherOptions,
      }),
  })
}
