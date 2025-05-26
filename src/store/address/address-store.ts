import { create } from "zustand";
import { persist } from "zustand/middleware";

const emptyAddress = {
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
}

interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
    };
    //Methods
    setAddress: (address: State['address']) => void;
    clearAddress: () => void;
}

export const useAddressStore = create<State>()(
    persist(
        (set, get) => ({
            address: emptyAddress,
            setAddress: (address) => {
                set({ address });
            },
            clearAddress: () => {
                set({ address: emptyAddress });
            },
        }),
        {
            name: 'address-storage',
        }
    )

);