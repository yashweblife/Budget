import { SettingsContext } from "@/store/settings";
import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { Appbar, Button, Dialog, FAB, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import PurchaseContext from "../../store/purchase";
export default function HomeScreen() {
  const theme = useTheme();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [dialogInput, setDialogInput] = useState<string>("");
  const { sum, addToPurchasesList, getPurchasesList } = useContext(PurchaseContext);
  const { budget, getWeeklyBudget } = useContext(SettingsContext)
  useEffect(() => {
    getPurchasesList()
    getWeeklyBudget()
    console.log(budget)
  }, [])

  const handleDialogAddButton = () => {
    if (!dialogInput) return
    addToPurchasesList(dialogInput);
    setDialogInput("");
    setOpenAddDialog(false);
  }
  const handleDialogCancelButton = () => {
    setOpenAddDialog(false);
    setDialogInput("");
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        alignItems: "center"
      }}>
      <Appbar>
        <Appbar.Content title="Home" />
        <Link href="/settings" asChild>
          <Appbar.Action icon="cog" />
        </Link>
      </Appbar>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: 30,
          borderRadius: 30,
          marginVertical: 30
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 30
          }}
        >Current Spend</Text>
        <CircularProgress
          value={sum}
          radius={150}
          maxValue={budget || 60}
          progressValueColor={theme.colors.primary}
          activeStrokeSecondaryColor={theme.colors.tertiary}
          inActiveStrokeColor={theme.colors.tertiaryContainer}
          valuePrefix={"$"}
          strokeColorConfig={
            [
              {
                value: 0,
                color: theme.colors.primary
              },
              {
                value: 30,
                color: theme.colors.secondary
              },
              {
                value: 60,
                color: theme.colors.error
              }
            ]
          }
        />
      </View>
      <Dialog visible={openAddDialog} onDismiss={() => setOpenAddDialog(false)}>
        <Dialog.Title>Add a Purchase</Dialog.Title>
        <Dialog.Content>
          <Text>Add a new purchase</Text>
          <TextInput keyboardType="numeric" mode="outlined" value={dialogInput} onChangeText={setDialogInput} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDialogCancelButton}>Cancel</Button>
          <Button onPress={handleDialogAddButton}>Save</Button>
        </Dialog.Actions>
      </Dialog>
      <FAB
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => setOpenAddDialog(true)}
      />
      <FAB
        style={{ position: "absolute", margin: 16, left: 0, bottom: 0 }}
        icon="graph"
        onPress={() => { router.push("/graphs") }}
      />
    </SafeAreaView>
  );
}