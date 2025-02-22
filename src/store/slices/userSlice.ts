import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UserState {
  user: User | null;
  trustedContacts: Contact[];
}

const initialState: UserState = {
  user: null,
  trustedContacts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.trustedContacts = [];
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.trustedContacts.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.trustedContacts = state.trustedContacts.filter(
          contact => contact.id !== action.payload
      );
    },
  },
});

export const { setUser, clearUser, addContact, removeContact } = userSlice.actions;
export default userSlice.reducer;
