import useSWR from 'swr'
import { ApiHooks, MutationHook } from '../types/hooks'
import { useApiProvider } from '../../shopify'
import { ApiFetcher } from '../types/api'

export const useHook = <H>(fn: (apiHooks: ApiHooks) => H) => {
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

const useData = (hook: any, fetcher: ApiFetcher, ctx: any) => {
  const hookFetcher = async (query: string) => {
    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: { query },
        input: {},
      })
    } catch (error) {
      throw error
    }
  }

  const response = useSWR(hook.fetcherOptions.query, hookFetcher, ctx.swrOptions)

  return response
}

export const useSWRHook = (hook: any) => {
  const { fetcher } = useApiProvider()

  return hook.useHook({
    useData(ctx: any) {
      const data = useData(hook, fetcher, ctx)

      return data
    },
  })
}
