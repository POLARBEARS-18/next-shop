import { createContext, FC, useContext, useMemo, useReducer } from 'react'

export interface StateModifies {
  openSidebar: () => void
  closeSidebar: () => void
}

export interface StateValues {
  isSidebarOpen: boolean
}

const stateModifiers = {
  openSidebar: () => {},
  closeSidebar: () => {},
}

const initialState = { isSidebarOpen: false }

type State = StateValues & StateModifies

const UIContext = createContext<State>({
  ...stateModifiers,
  ...initialState,
})

type Action = { type: 'OPEN_SIDEBAR' | 'CLOSE_SIDEBAR' }

const uiReducer = (state: StateValues, action: Action) => {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        isSidebarOpen: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        isSidebarOpen: false,
      }
    }
    default:
      return null
  }
}

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })

  const value = useMemo(
    () => ({
      openSidebar,
      closeSidebar,
      ...state,
    }),
    [state.isSidebarOpen]
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export const useUI = () => {
  const context = useContext(UIContext)
  return context
}
