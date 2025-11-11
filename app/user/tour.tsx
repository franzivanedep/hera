// app/user/tour.tsx
import { useMemo, useRef, useState } from "react";
import { View, Text, FlatList, Pressable, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const UI = {
  bg: "#FFF8F2",
  dot: "#D6C6B8",
  dotActive: "#4B3F35",
  btn: "#111827",
  btnText: "#FFFFFF",
  text: "#4B3F35",
  sub: "#7B6A59",
  border: "#EEE3D9",
};

const { width, height } = Dimensions.get("window");

type Slide = { key: string; image: any };

const SLIDES: Slide[] = [
  {
    key: "welcome",
    image: require("@/assets/images/explore/1.png"),
  },
  {
    key: "track",
    image: require("@/assets/images/explore/2.png"),
  },
  {
    key: "redeem",
    image: require("@/assets/images/explore/3.png"),
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

  const onSkip = () => router.back();
  const onDone = () => router.back();

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={{ width, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={item.image}
        style={{
          width: width,
          height: height * 0.85, // almost full screen
          resizeMode: "contain",
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: UI.bg }}>
      {/* Header */}
      

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

      {/* Dots + Buttons */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16, gap: 12 }}>
        {/* Dots */}
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

        {/* Navigation Buttons */}
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
