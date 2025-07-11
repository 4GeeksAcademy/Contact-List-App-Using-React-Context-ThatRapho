import {  FETCH_CONTACTS,  ADD_CONTACT,  REMOVE_CONTACT,  EDIT_CONTACT} from "./actionTypes";


export const initialState = {
  contacts: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: action.payload };
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    default:
      return state;
  }
};