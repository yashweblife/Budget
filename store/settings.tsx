import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, ReactNode, useState } from "react"


export type SettingsContext = {
    budget: number
    setWeeklyBudget: (value: number) => void
    getWeeklyBudget: () => void    
}

export const SettingsContext = createContext<SettingsContext>({
    budget: 0,
    setWeeklyBudget: (value: number) => { },
    getWeeklyBudget: () => { }
})

export default function SettingsProvider({ children }: { children: ReactNode }) {

    const [budget, setBudget] = useState(0)

    const getWeeklyBudget = async () => {
        try {
            const rawData = await AsyncStorage.getItem('weeklyBudget');
            const data = rawData ? Number(rawData) : 0;
            setWeeklyBudget(data);
            return data
        }
        catch (e) {
            return e
        }
    }
    const setWeeklyBudget = async (value: number) => {
        try {
            await AsyncStorage.setItem('weeklyBudget', String(value));
            setBudget(value);
            return value
        } catch (e) {
            return e
        }
    }
    const output: SettingsContext = {
        budget,
        setWeeklyBudget,
        getWeeklyBudget
    }
    return <SettingsContext.Provider value={output}>{children}</SettingsContext.Provider>
}