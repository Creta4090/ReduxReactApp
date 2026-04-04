import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../authSlice'

const loadContactsFromSession = () => {
  if (typeof window === 'undefined') return []
  try {
    const raw = sessionStorage.getItem('contacts')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const initialState = {
  contacts: loadContactsFromSession(),
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('contacts', JSON.stringify(state.contacts))
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.contacts = []
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('contacts')
      }
    })
  },
})

export const { addContact } = contactSlice.actions
export default contactSlice.reducer
