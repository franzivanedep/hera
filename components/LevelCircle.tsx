import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { API_URL } from "../config"; // adjust path

type LevelCircleProps = {
  uid: string; // user ID to fetch points
};

const LevelCircle: React.FC<LevelCircleProps> = ({ uid }) => {
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const size = 80;          // outer diameter
  const strokeWidth = 10;   // thickness of donut
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Fetch user points from API
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch(`${API_URL}/transactions?uid=${uid}`);
        const data = await res.json();
        // Example: sum all points (+20 per transaction)
        const totalPoints = data.transactions.reduce(
          (acc: number, tx: any) => acc + 20, // +20 points per transaction
          0
        );
        setPoints(totalPoints);
      } catch (err) {
        console.error("Failed to fetch points:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [uid]);

  if (loading || points === null) {
    return (
      <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="small" color="#9E7E63" />
      </View>
    );
  }

  // ===== LEVEL & EXP LOGIC =====
  const level = Math.floor(points / 100) + 1;
  const exp = points % 100;
  const progress = Math.min(exp / 100, 1);

  return (
    <View style={{ alignItems: "center" }}>
      <View>
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            stroke="#eee"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <Circle
            stroke="#9E7E63"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>
        {/* Level text in the center */}
        <Text
          style={{
            position: "absolute",
            width: size,
            textAlign: "center",
            top: size / 2 - 10,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Lv {level}
        </Text>
      </View>
    </View>
  );
};

export default LevelCircle;
