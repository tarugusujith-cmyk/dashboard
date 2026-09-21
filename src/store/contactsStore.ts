import { create } from "zustand";
import { persist } from "zustand/middleware";
import { faker } from "@faker-js/faker";
import { Contact } from "@/types";

const generateContacts = (count: number = 8) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `contact_${i + 1}`,
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        avatar: faker.image.avatar(),
    }));
};

interface ContactsState {
    contacts: Contact[];
    addContact: (contact: Omit<Contact, "id">) => void;
    removeContact: (contactId: string) => void;
    getContactById: (contactId: string) => Contact | undefined;
}

export const useContactsStore = create<ContactsState>()(
    persist(
        (set, get) => ({
            contacts: generateContacts(8),

            addContact: (contact) =>
                set((state) => ({
                    contacts: [
                        ...state.contacts,
                        {
                            ...contact,
                            id: `contact_${Date.now()}`,
                        },
                    ],
                })),

            removeContact: (contactId) =>
                set((state) => ({
                    contacts: state.contacts.filter(
                        (contact) => contact.id !== contactId
                    ),
                })),

            getContactById: (contactId) => {
                return get().contacts.find((c) => c.id === contactId);
            },
        }),
        {
            name: "contacts-storage",
        }
    )
);
