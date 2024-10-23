import { SettingsContext } from "@/store/settings";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Appbar, Button, Card, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SettingsScreen() {
    const theme = useTheme();
    const { budget, setWeeklyBudget } = useContext(SettingsContext);
    const [weeklyBudget, setBudget] = useState<string>(String(budget));
    const handleSave = () => {
        console.log(weeklyBudget)
        if(Number(weeklyBudget)){
            setWeeklyBudget(Number(weeklyBudget))
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: theme.colors.background,
        }}>
            <Appbar>
                <Link href="(tabs)" asChild>
                    <Appbar.BackAction />
                </Link>
                <Appbar.Content title="Settings" />
            </Appbar>
            <View
                style={{
                    width: "100%",
                    padding: 20,
                }}
            >
                <Card style={{ width: "100%" }}>
                    <Card.Title title="Numbers" />
                    <Card.Content>
                        <TextInput
                            value={String(weeklyBudget)}
                            onChangeText={setBudget}
                            mode="outlined"
                            label="Weekly Budget" />
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={handleSave}>Save</Button>
                    </Card.Actions>
                </Card>
            </View>
        </SafeAreaView>
    );
}