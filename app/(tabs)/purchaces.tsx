import PurchaseContext from "@/store/purchase";
import { Link } from "expo-router";
import { useContext } from "react";
import { ScrollView } from "react-native";
import { Appbar, Button, Card, FAB, Surface, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
export default function PurchacesScreen() {
    const theme = useTheme();
    const { purchases, removeFromPurchasesList, deletePurchasesList } = useContext(PurchaseContext);
    const handleDeleteButton = (id: string) => {
        console.log("delete: ", id)
        removeFromPurchasesList(id);
    }
    const handleRemoveAllButton = () => {
        deletePurchasesList();
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme.colors.background,
        }}>
            <Appbar>
                <Appbar.Content title="Purchaces" />
                <Link href="/settings" asChild>
                    <Appbar.Action icon="cog" />
                </Link>
            </Appbar>
            <ScrollView style={{
                width: "100%",
            }}>
            {
                purchases.length > 0 ?
                    <Surface elevation={2}
                        style={{
                            width: "100%",
                            marginBottom: 10,
                            padding: 10,
                            backgroundColor: theme.colors.secondaryContainer,
                            borderRadius: 30
                        }}
                    >
                        
                            {
                                purchases.map((purchase: any) =>
                                    <Card
                                        key={purchase.id}
                                        style={{
                                            width: "100%",
                                            marginBottom: 10,
                                            borderRadius: 30
                                        }}>
                                        <Card.Content>
                                            <Text variant="bodyLarge">${purchase.value}</Text>
                                            <Text>{new Date(purchase.time).toLocaleString()}</Text>
                                        </Card.Content>
                                        <Card.Actions>
                                            <Button onPress={() => handleDeleteButton(purchase.id)}>Delete</Button>
                                        </Card.Actions>
                                    </Card>
                                )
                            }

                    </Surface> :
                    <Surface
                        style={{
                            flex: 1,
                            width: "100%",
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 10,
                            padding: 10,
                            backgroundColor: theme.colors.background,
                            borderRadius: 30
                        }}
                    >
                        <Text variant="bodyLarge">No Purchaces Registered</Text>
                    </Surface>
            }
            </ScrollView>
            {
                purchases.length > 0 && <FAB
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        bottom: 0,
                    }}
                    icon="delete"
                    onPress={handleRemoveAllButton}
                />
            }
        </SafeAreaView>
    )
} 