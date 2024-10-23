import PurchaseContext, { Purchase } from "@/store/purchase";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Appbar, Card, Chip, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GraphsPage() {
    const theme = useTheme();
    const {purchases, getPurchasesList}  = useContext(PurchaseContext);
    const [selectedPoint, setSelectedPoint] = useState<number>(0);
    useEffect(() => {
        getPurchasesList()
        console.log(purchases)
    },[])

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,

    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                width: "100%",
                backgroundColor: theme.colors.background
            }}
        >
            <Appbar>
                <Link href="/(tabs)" asChild>
                    <Appbar.BackAction />
                </Link>
                <Appbar.Content title="Graphs" />
            </Appbar>
            {
                purchases.length ==0 ?
                    <Text>No data</Text>
                    :
                    <View>
                        <Chip
                            icon={"cash"}
                            style={{
                                margin: 10,
                                width:100
                            }}
                            elevated
                        >
                            ${purchases[selectedPoint].value.toString()}
                            </Chip>
                        <LineChart
                            data={{
                                labels:[],
                                datasets: [
                                    {
                                        data: (purchases.map((purchase: Purchase) => Number(purchase.value)))
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width - 40}
                            height={200}
                            chartConfig={chartConfig}
                            onDataPointClick={
                                (e) => setSelectedPoint(e.index)}
                        />
                        <Card>
                            <Card.Title title="Stats"/>
                            <Card.Content>
                                <Text>Total: ${purchases.reduce((total: number, purchase: Purchase) => total + Number(purchase.value), 0).toString()}</Text>
                                <Text>Average: ${purchases.reduce((total: number, purchase: Purchase) => total + Number(purchase.value), 0) / purchases.length}</Text> 
                                <Text>Max: ${purchases.map((p:Purchase) => Number(p.value)).sort((a,b)=>b-a)[0]}</Text>
                                <Text>Min: ${purchases.map((p:Purchase) => Number(p.value)).sort((a,b)=>a-b)[0]}</Text>
                            </Card.Content>
                        </Card>
                    </View>
            }
        </SafeAreaView>
    );
}