// Shared product data used by the home page (and by the product details page).
import earbudsImg from "../assets/earbuds.png";
import smartwatchImg from "../assets/smartwatch.png";
import speakerImg from "../assets/speaker.png";
import mouseImg from "../assets/mouse.png";
import powerbankImg from "../assets/powerbank.png";
import droneImg from "../assets/drone.png";
import keyboardImg from "../assets/keyboard.png";
import headphoneImg from "../assets/headphone.png";

const products = [
  {
    id: 1,
    name: "SoundPro X1",
    subtitle: "Wireless Earbuds",
    price: 79.99,
    badge: "NEW",
    image: earbudsImg,
    category: "Audio",
    description:
      "True wireless earbuds with active noise cancellation, 30-hour battery life and a compact charging case.",
  },
  {
    id: 2,
    name: "Active Watch 2",
    subtitle: "Smartwatch",
    price: 149.99,
    badge: "BESTSELLER",
    image: smartwatchImg,
    category: "Smart Watches",
    description:
      "Track workouts, heart rate and sleep with a bright AMOLED display and 7-day battery life.",
  },
  {
    id: 3,
    name: "BoomMate",
    subtitle: "Portable Speaker",
    price: 89.99,
    oldPrice: 119.99,
    badge: "SALE",
    image: speakerImg,
    category: "Audio",
    description:
      "Waterproof Bluetooth speaker with deep bass and 12 hours of non-stop playtime.",
  },
  {
    id: 4,
    name: "GameMax Pro",
    subtitle: "Gaming Mouse",
    price: 39.99,
    oldPrice: 59.99,
    image: mouseImg,
    category: "Accessories",
    description:
      "Ergonomic gaming mouse with RGB lighting, 16,000 DPI sensor and programmable buttons.",
  },
  {
    id: 5,
    name: "VoltBank 20K",
    subtitle: "Power Bank",
    price: 49.99,
    image: powerbankImg,
    category: "Power Solutions",
    description:
      "20,000 mAh fast-charging power bank that can charge a phone up to five times.",
  },
  {
    id: 6,
    name: "SkyView Mini",
    subtitle: "Camera Drone",
    price: 299.99,
    badge: "NEW",
    image: droneImg,
    category: "Drones & Cameras",
    description:
      "Foldable 4K camera drone with 3-axis gimbal and 30 minutes of flight time.",
  },
  {
    id: 7,
    name: "TypeFlow K2",
    subtitle: "Mechanical Keyboard",
    price: 69.99,
    image: keyboardImg,
    category: "Accessories",
    description:
      "Compact backlit mechanical keyboard with hot-swappable switches and a durable aluminium frame.",
  },
  {
    id: 8,
    name: "StudioMax H3",
    subtitle: "Over-Ear Headphones",
    price: 129.99,
    oldPrice: 159.99,
    badge: "SALE",
    image: headphoneImg,
    category: "Audio",
    description:
      "Studio-quality over-ear headphones with soft cushions and up to 40 hours of battery.",
  },
];

export default products;