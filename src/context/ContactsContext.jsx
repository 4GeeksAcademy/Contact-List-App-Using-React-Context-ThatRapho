import React, { createContext, useContext, useReducer, useEffect } from "react";
import { reducer, initialState } from './ContactReducer';
import {  FETCH_CONTACTS,  ADD_CONTACT,  REMOVE_CONTACT,  EDIT_CONTACT} from "./actionTypes";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchContacts = async () => {
    const res = await fetch("https://playground.4geeks.com/contact/agendas/thatrapho/contacts");
    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      console.log("Creating user");
      await fetch("https://playground.4geeks.com/contact/agendas/thatrapho", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "slug": "thatrapho",
        })
      });
    }
    const data = await res.json();
    dispatch({ type: FETCH_CONTACTS, payload: data.contacts });
  };

  const createContact = async (name, email, phone, address) => {
    const res = await fetch("https://playground.4geeks.com/contact/agendas/thatrapho/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, address })
    });
    const data = await res.json();
    dispatch({ type: ADD_CONTACT, payload: data });
    alert("Contact created!")
  };

  const deleteContact = async (id) => {
    await fetch(`https://playground.4geeks.com/contact/agendas/thatrapho/contacts/${id}`, {
      method: "DELETE"
    });
    dispatch({ type: REMOVE_CONTACT, payload: id });
  };

  const editContact = async (id, updatedData) => {
    const res = await fetch(`https://playground.4geeks.com/contact/agendas/thatrapho/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
    const data = await res.json();
    dispatch({ type: EDIT_CONTACT, payload: data });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts: state.contacts,
        fetchContacts,
        createContact,
        deleteContact,
        editContact
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => useContext(ContactsContext);
