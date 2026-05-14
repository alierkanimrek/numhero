import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import type { Contact, Page } from '../types';
import { loadContacts, saveContacts, generateId } from '../utils/storage';

interface ContactContextType {
  contacts: Contact[];
  selectedContactId: string | null;
  selectedContact2Id: string | null;
  currentPage: Page;
  addContact: (c: { fullName: string; birthDate: string }) => void;
  updateContact: (id: string, c: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  setSelectedContactId: (id: string | null) => void;
  setSelectedContact2Id: (id: string | null) => void;
  setCurrentPage: (p: Page) => void;
  importContacts: (contacts: Contact[], replace: boolean) => void;
  exportContacts: () => Contact[];
}

const ContactContext = createContext<ContactContextType | null>(null);

type Action =
  | { type: 'SET'; contacts: Contact[] }
  | { type: 'ADD'; contact: Contact }
  | { type: 'UPDATE'; id: string; data: Partial<Contact> }
  | { type: 'DELETE'; id: string };

function reducer(state: Contact[], action: Action): Contact[] {
  switch (action.type) {
    case 'SET': return action.contacts;
    case 'ADD': return [...state, action.contact];
    case 'UPDATE': return state.map(c => c.id === action.id ? { ...c, ...action.data } : c);
    case 'DELETE': return state.filter(c => c.id !== action.id);
    default: return state;
  }
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [contacts, dispatch] = useReducer(reducer, [], loadContacts);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectedContact2Id, setSelectedContact2Id] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('rehber');

  useEffect(() => { saveContacts(contacts); }, [contacts]);

  useEffect(() => {
    if (contacts.length > 0 && !selectedContactId) setSelectedContactId(contacts[0].id);
    if (selectedContactId && !contacts.find(c => c.id === selectedContactId))
      setSelectedContactId(contacts[0]?.id ?? null);
  }, [contacts, selectedContactId]);

  const addContact = ({ fullName, birthDate }: { fullName: string; birthDate: string }) => {
    const contact: Contact = {
      id: generateId(),
      fullName: fullName.trim().toLocaleUpperCase('tr-TR'),
      birthDate,
      letterValues: {},
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD', contact });
    setSelectedContactId(contact.id);
  };

  const updateContact = (id: string, data: Partial<Contact>) => {
    if (data.fullName) data.fullName = data.fullName.trim().toLocaleUpperCase('tr-TR');
    dispatch({ type: 'UPDATE', id, data });
  };
  const deleteContact = (id: string) => dispatch({ type: 'DELETE', id });
  const importContacts = (incoming: Contact[], replace: boolean) => {
    if (replace) {
      dispatch({ type: 'SET', contacts: incoming });
    } else {
      const merged = [...contacts];
      incoming.forEach(c => { if (!merged.find(e => e.id === c.id)) merged.push(c); });
      dispatch({ type: 'SET', contacts: merged });
    }
  };

  return (
    <ContactContext.Provider value={{
      contacts, selectedContactId, selectedContact2Id, currentPage,
      addContact, updateContact, deleteContact,
      setSelectedContactId, setSelectedContact2Id, setCurrentPage,
      importContacts, exportContacts: () => contacts,
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContacts must be inside ContactProvider');
  return ctx;
}
