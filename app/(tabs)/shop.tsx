import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Appbar, Button, Dialog, FAB, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Shop() {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const theme = useTheme();
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: theme.colors.background,
            }}
        >
            <Appbar>
                <Appbar.Content title="Groceries"/>
                <Link href="/settings">
                    <Appbar.Action icon="cog" />
                </Link>
            </Appbar>
            <ScrollView
                style={{
                    width: "100%",
                }}
            >
                <Text>
                    Shop
                </Text>
            </ScrollView>
            <Dialog visible={openAddDialog} onDismiss={() => setOpenAddDialog(false)}>
                <Dialog.Title>Select</Dialog.Title>
                <Dialog.Content>
                    <Text>Hello</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button onPress={() => setOpenAddDialog(false)}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
            <FAB
                icon="plus"
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                }}
                onPress={() => setOpenAddDialog(true)}
            />
                
        </SafeAreaView>
    )
}