import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
export type Purchase = {
    id: string
    value: string
    time: number
}
export type PurchaseContext = {
    purchases: Purchase[]
    getPurchasesList: () => void
    deletePurchasesList: () => void
    addToPurchasesList: (value: string) => void
    removeFromPurchasesList: (value: string) => void
    sum: number
}
const PurchaseContext = createContext<PurchaseContext>({
    purchases: [],
    getPurchasesList: () => { },
    deletePurchasesList: () => { },
    addToPurchasesList: (value: string) => { },
    removeFromPurchasesList: (value: string) => { },
    sum: 0
})

export function generateID() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        id += alphabet[randomIndex];
    }
    return id
}

export function PurchaseProvider({ children }: any) {
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [sum, setSum] = useState<number>(0)

    useEffect(() => {
        getSum();
    }, [purchases])

    const getSum = () => {
        const values = purchases
            .map((purchase: any) => Number(purchase.value))
            .reduce((a: number, b: number) => a + b, 0)
        setSum(values);
    }
    const getPurchasesList = async () => {
        try {
            const rawData = await AsyncStorage.getItem('purchases');
            const data: Purchase[] = rawData ? JSON.parse(rawData) : [];
            setPurchases(data);
            return data
        }
        catch (e) {
            console.log(e)
            return e
        }
    }
    const deletePurchasesList = async () => {
        try {
            await AsyncStorage.removeItem('purchases');
            setPurchases([]);
            return
        }
        catch (e) {
            return e
        }
    }
    const addToPurchasesList = async (value: string) => {
        try {
            const rawData = await AsyncStorage.getItem('purchases');
            const data = rawData ? JSON.parse(rawData) : [];
            data.push({
                time: Date.now(),
                value: value,
                id: generateID()
            });
            AsyncStorage.setItem('purchases', JSON.stringify(data)).then(() => {
                getPurchasesList();
            })
        }
        catch (e) {
            return e
        }
    }
    const removeFromPurchasesList = async (id: string) => {
        try {
            const rawData = await AsyncStorage.getItem('purchases');
            const data = rawData ? JSON.parse(rawData) : [];
            data.splice(data.findIndex((purchase: Purchase) => purchase.id === id), 1);
            await AsyncStorage.setItem('purchases', JSON.stringify(data));
            getPurchasesList();
        }
        catch (e) {
            return e
        }
    }

    const output: PurchaseContext = {
        purchases,
        getPurchasesList,
        deletePurchasesList,
        addToPurchasesList,
        removeFromPurchasesList,
        sum
    }

    return (
        <PurchaseContext.Provider value={output}>
            {children}
        </PurchaseContext.Provider>
    )
}

export default PurchaseContext