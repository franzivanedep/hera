import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#FFF8F2" },
        headerTintColor: "#4B3F35",
        headerTitleStyle: { fontWeight: "600" },
      }}
    />
  );
}
