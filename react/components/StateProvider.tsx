import React, { useReducer, createContext, ComponentType, useContext, ReactChild } from 'react'

export interface State {
  email: string
  loading: boolean
  error: boolean
  errorCode: ErrorCode | null
}

const initialState = {
  email: '',
  loading: false,
  error: false,
  errorCode: null,
}

type Action = SetEmailAction | SetLoadingAction | UserNotRegisteredAction

interface SetEmailAction {
  type: 'SET_EMAIL',
  email: string
}

interface SetLoadingAction {
  type: 'SET_LOADING',
  loading: boolean
}

export enum ErrorCode {
  BAD_USER_INPUT,
  USER_NOT_REGISTERED
}

interface UserNotRegisteredAction {
  type: 'ERROR',
  code: ErrorCode
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_EMAIL': {
      return {
        ...state,
        email: action.email,
        error: false,
        errorCode: null
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.loading
      }
    }
    case 'ERROR': {
      return {
        ...state,
        error: true,
        errorCode: action.code,
        loading: false,
      }
    }
    default: {
      return state
    }
  }
}

type Dispatch = (action: Action) => void

const StateContext = createContext<State>(initialState)
const DispatchContext = createContext<Dispatch>(() => {})

export const TelemarketingStateProvider = ({ children }: { children: ReactChild }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useTelemarketingState() {
  return useContext(StateContext)
}

export function useTelemarketingDispatch() {
  return useContext(DispatchContext)
}

export function withTelemarketingStateProvider(WrappedComponent: ComponentType) {
  return (props: any) => {
    return (
      <TelemarketingStateProvider>
        <WrappedComponent {...props} />
      </TelemarketingStateProvider>
    )
  }
}
