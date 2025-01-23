import { ChatAction, ChatState } from './chat-types'

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_CHATS':
      return {
        ...state,
        chats: action.payload
      }
    case 'ADD_CHAT':
      return {
        ...state,
        chats: [...state.chats, action.payload]
      }
    case 'SET_CURRENT_CHAT':
      return {
        ...state,
        currentChat: action.payload
      }
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload
      }
    case 'SET_INPUT':
      return {
        ...state,
        input: action.payload
      }
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      }
    case 'ADD_MESSAGE':
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.payload.chatId
            ? { ...chat, messages: [...chat.messages, action.payload.message] }
            : chat
        )
      }
    default:
      return state
  }
}
