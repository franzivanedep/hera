// app/user/tour.tsx
import { useMemo, useRef, useState } from "react";
import { View, Text, FlatList, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const UI = {
  bg: "#FFF8F2",
  card: "#FFFFFF",
  border: "#EEE3D9",
  text: "#4B3F35",
  sub: "#7B6A59",
  dot: "#D6C6B8",
  dotActive: "#4B3F35",
  btn: "#111827",
  btnDisabled: "#B49A86",
  btnText: "#FFFFFF",
};

const { width } = Dimensions.get("window");

type Slide = { key: string; emoji: string; title: string; body: string };

const SLIDES: Slide[] = [
  {
    key: "welcome",
    emoji: "👋",
    title: "Welcome to Hera",
    body: "Your all-in-one hub for points, purchases, and rewards.",
  },
  {
    key: "track",
    emoji: "🧾",
    title: "Track Transactions",
    body: "See purchases and top-ups at a glance with clean summaries.",
  },
  {
    key: "redeem",
    emoji: "🎁",
    title: "Redeem Rewards",
    body: "Enter codes or scan to convert vouchers into perks.",
  },
  {
    key: "security",
    emoji: "🔒",
    title: "Private & Secure",
    body: "Your data stays yours. We keep things tidy and safe.",
  },
];

export default function AppTour() {
  const router = useRouter();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);

  const isLast = index === SLIDES.length - 1;

  const onViewableItemsChanged = useMemo(
    () => ({
      viewableItems: [] as any[],
      onViewableItemsChanged: ({ viewableItems }: any) => {
        if (viewableItems?.length > 0 && viewableItems[0].index != null) {
          setIndex(viewableItems[0].index);
        }
      },
    }),
    []
  );

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 60 });

  const goTo = (i: number) => {
    listRef.current?.scrollToIndex({ index: i, animated: true });
    setIndex(i);
  };

  const onNext = () => {
    if (!isLast) goTo(index + 1);
  };

  const onSkip = () => {
    router.back(); // returns to /user menu; change to router.replace("/user") if you prefer
  };

  const onDone = () => {
    router.back();
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={{ width, paddingHorizontal: 20, paddingTop: 16 }}>
      <View
        style={{
          backgroundColor: UI.card,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: UI.border,
          paddingVertical: 32,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            backgroundColor: "#F6EDE5",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
          }}
        >
          <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
        </View>

        <Text style={{ fontSize: 22, fontWeight: "800", color: UI.text, textAlign: "center" }}>
          {item.title}
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: UI.sub,
            fontSize: 15,
            textAlign: "center",
            lineHeight: 22,
          }}
        >
          {item.body}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 6, paddingBottom: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: UI.text }}>App Tour</Text>
        {!isLast && (
          <Pressable onPress={onSkip} accessibilityRole="button">
            <Text style={{ color: UI.sub, fontWeight: "700" }}>Skip</Text>
          </Pressable>
        )}
      </View>

      {/* Slides */}
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(s) => s.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
      />

      {/* Dots + Actions */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16, gap: 12 }}>
        <View style={{ alignSelf: "center", flexDirection: "row", gap: 8, marginTop: 8 }}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: i === index ? UI.dotActive : UI.dot,
              }}
            />
          ))}
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {!isLast ? (
            <>
              <Pressable
                onPress={() => goTo(Math.max(0, index - 1))}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: UI.border,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                }}
                accessibilityRole="button"
              >
                <Text style={{ color: UI.text, fontWeight: "700" }}>Back</Text>
              </Pressable>

              <Pressable
                onPress={onNext}
                style={{
                  flex: 2,
                  height: 48,
                  borderRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: UI.btn,
                }}
                accessibilityRole="button"
              >
                <Text style={{ color: UI.btnText, fontWeight: "800" }}>Next</Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={onDone}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: UI.btn,
              }}
              accessibilityRole="button"
            >
              <Text style={{ color: UI.btnText, fontWeight: "800" }}>Get Started</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
