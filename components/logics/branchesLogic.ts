import { useState } from "react";
import { Linking } from "react-native";

export interface Branch {
  id: string;
  name: string;
  address: string;
  image: any;
  services?: string[];
  openingHours?: string[];
  contact?: { phone: string; email: string };
}

export const branches: Branch[] = [
  {
    id: "1",
    name: "HERA Nail Lounge - Sangandaan, Caloocan",
    address: "443 A. Mabini St. Brgy. 10 Sangandaan, Caloocan, Philippines, 1421",
    image: require("../../assets/images/heracal.png"),
    services: ["Manicure", "Pedicure", "Nail Art"],
    openingHours: ["Daily: 11am - 9pm"],
    contact: { phone: "+63 991 474 490", email: "heranailloungeandspa@yahoo.com" },
  },
  {
    id: "2",
    name: "HERA Nail Lounge - Meycauayan Bulacan",
    address: "583 Mc Arthur Highway, Bancal, Meycauayan Bulacan",
    image: require("../../assets/images/herameyc.jpg"),
    services: ["Manicure", "Pedicure", "Gel Nails"],
    openingHours: ["Mon-Sun: 11am - 9pm"],
    contact: { phone: "+63 960 252 0747", email: "heranailloungeandspa@yahoo.com" },
  },
  {
    id: "3",
    name: "HERA Nail Lounge - Concepcion, Malabon",
    address: "234 Gen. Luna St., Concepcion, Malabon, Philippines, 1470",
    image: require("../../assets/images/heramalabon.jpg"),
    services: ["Manicure", "Pedicure", "Nail Extensions"],
    openingHours: ["Mon-Sun: 11am - 9pm"],
    contact: { phone: "+63 915 376 0784", email: "heranailloungeandspa@yahoo.com" },
  },
];

export const useBranches = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const openBranchModal = (branch: Branch) => setSelectedBranch(branch);
  const closeBranchModal = () => setSelectedBranch(null);

  const openMap = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return {
    branches,
    selectedBranch,
    openBranchModal,
    closeBranchModal,
    openMap,
  };
};
