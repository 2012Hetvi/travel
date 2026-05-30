import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from './database.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'wanderlust-super-secret-key-123';

// Middleware
app.use(cors());
app.use(express.json());

// Extend Express Request type
interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

// Authentication Middleware
function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Invalid or expired token' });
      return;
    }
    req.user = decoded as { id: number; email: string; name: string };
    next();
  });
}

// Seed the database on boot
seedDatabase().then(() => {
  console.log('Database check completed.');
});

// ==========================================
// DESTINATION EXTRAS DATA
// ==========================================

const destinationExtras: Record<string, {
  duration: string;
  itinerary: { day: string; title: string; desc: string }[];
  hotels: { name: string; stars: number; location: string; perks: string; pricePerNight: string; tier: string }[];
  cabs: { type: string; price: string; unit: string; note: string }[];
  info: { airport: string; currency: string; language: string; bestSeason: string; visa: string; timezone: string };
}> = {
  "Bali": {
    duration: "7 Days",
    itinerary: [
      { day: "Day 1", title: "Arrival & Seminyak", desc: "Airport pickup, hotel check-in, Seminyak beach sunset" },
      { day: "Day 2", title: "Ubud Exploration", desc: "Rice terraces, Monkey Forest, traditional Kecak dance" },
      { day: "Day 3", title: "Temple Trail", desc: "Tanah Lot, Uluwatu temple, sunset cliff views" },
      { day: "Day 4–5", title: "Beach & Water Sports", desc: "Nusa Dua snorkeling, surfing lessons at Kuta beach" },
      { day: "Day 6", title: "Mount Batur Sunrise", desc: "Early morning volcano trek, hot springs, cooking class" },
      { day: "Day 7", title: "Departure", desc: "Shopping at Kuta market, airport drop-off" },
    ],
    hotels: [
      { name: "The Oberoi Bali", stars: 5, location: "Seminyak", perks: "Pool villa · Breakfast included", pricePerNight: "$180", tier: "Luxury" },
      { name: "Komaneka at Bisma", stars: 4, location: "Ubud", perks: "Rice terrace view · Spa access", pricePerNight: "$120", tier: "Premium" },
      { name: "Canggu Beach Hotel", stars: 3, location: "Canggu", perks: "Surf-side · Budget friendly", pricePerNight: "$55", tier: "Budget" },
    ],
    cabs: [
      { type: "Private Car", price: "$35", unit: "/day", note: "With driver, A/C" },
      { type: "Scooter Rental", price: "$8", unit: "/day", note: "Self-drive, flexible" },
      { type: "Shuttle Bus", price: "$5", unit: "/trip", note: "Fixed routes" },
    ],
    info: { airport: "Ngurah Rai Airport", currency: "Indonesian Rupiah (IDR)", language: "Bahasa Indonesia", bestSeason: "Apr–Oct", visa: "Visa on Arrival", timezone: "GMT+8" },
  },
  "Santorini": {
    duration: "6 Days",
    itinerary: [
      { day: "Day 1", title: "Arrival & Fira", desc: "Settle in, explore Fira town, cable car views" },
      { day: "Day 2", title: "Oia Sunset", desc: "Walk the caldera path, iconic blue domes, sunset at Oia" },
      { day: "Day 3", title: "Red & Black Beach", desc: "Akrotiri archaeological site, volcanic beach visit" },
      { day: "Day 4", title: "Catamaran Cruise", desc: "Sail around the caldera, hot springs dip, fresh seafood" },
      { day: "Day 5", title: "Wine & Villages", desc: "Volcanic wine tasting, Pyrgos village, Perissa beach" },
      { day: "Day 6", title: "Departure", desc: "Morning market stroll, transfer to airport/port" },
    ],
    hotels: [
      { name: "Canaves Oia Epitome", stars: 5, location: "Oia", perks: "Infinity pool · Caldera view", pricePerNight: "$380", tier: "Luxury" },
      { name: "Astra Suites", stars: 4, location: "Imerovigli", perks: "Sunset terrace · Jacuzzi suite", pricePerNight: "$210", tier: "Premium" },
      { name: "Perissa Beach Hotel", stars: 3, location: "Perissa", perks: "Beach access · Rooftop bar", pricePerNight: "$90", tier: "Budget" },
    ],
    cabs: [
      { type: "ATV / Quad Bike", price: "$30", unit: "/day", note: "Most popular on island" },
      { type: "Private Taxi", price: "$25", unit: "/trip", note: "Fixed island fares" },
      { type: "Bus (KTEL)", price: "$2", unit: "/trip", note: "Main villages only" },
    ],
    info: { airport: "Santorini Thira Airport", currency: "Euro (EUR)", language: "Greek", bestSeason: "May–Oct", visa: "Schengen Visa", timezone: "GMT+3" },
  },
  "Swiss Alps": {
    duration: "8 Days",
    itinerary: [
      { day: "Day 1", title: "Zurich Arrival", desc: "City walk, Zurich old town, lake promenade" },
      { day: "Day 2", title: "Interlaken", desc: "Train to Interlaken, paragliding over the Alps" },
      { day: "Day 3", title: "Jungfraujoch", desc: "Top of Europe train, Aletsch Glacier, ice palace" },
      { day: "Day 4–5", title: "Skiing & Snowboard", desc: "Grindelwald slopes, ski lessons, après-ski" },
      { day: "Day 6", title: "Lucerne Day Trip", desc: "Chapel Bridge, Lion Monument, lake cruise" },
      { day: "Day 7", title: "Zermatt & Matterhorn", desc: "Car-free village, Matterhorn views, fondue dinner" },
      { day: "Day 8", title: "Departure", desc: "Geneva or Zurich flight home" },
    ],
    hotels: [
      { name: "The Chedi Andermatt", stars: 5, location: "Andermatt", perks: "Ski-in ski-out · Spa", pricePerNight: "$450", tier: "Luxury" },
      { name: "Hotel Belvedere Grindelwald", stars: 4, location: "Grindelwald", perks: "Mountain panorama · Heated pool", pricePerNight: "$200", tier: "Premium" },
      { name: "Backpackers Interlaken", stars: 3, location: "Interlaken", perks: "Hostel vibes · Central location", pricePerNight: "$70", tier: "Budget" },
    ],
    cabs: [
      { type: "Swiss Rail Pass", price: "$180", unit: "/week", note: "Unlimited trains + buses" },
      { type: "Rental Car", price: "$65", unit: "/day", note: "Chains required in winter" },
      { type: "Mountain Taxi", price: "$40", unit: "/trip", note: "Local village transfers" },
    ],
    info: { airport: "Zurich Airport (ZRH)", currency: "Swiss Franc (CHF)", language: "German / French", bestSeason: "Dec–Mar & Jun–Sep", visa: "Schengen Visa", timezone: "GMT+1" },
  },
  "Tokyo": {
    duration: "8 Days",
    itinerary: [
      { day: "Day 1", title: "Shibuya & Harajuku", desc: "Famous crossing, Takeshita Street, Meiji Shrine" },
      { day: "Day 2", title: "Asakusa & Senso-ji", desc: "Oldest temple, Nakamise shopping street, rickshaw ride" },
      { day: "Day 3", title: "Akihabara & teamLab", desc: "Electronics district, immersive digital art experience" },
      { day: "Day 4", title: "Day Trip to Kyoto", desc: "Bullet train, Fushimi Inari, Arashiyama bamboo grove" },
      { day: "Day 5", title: "Mount Fuji", desc: "Bus tour to Fuji 5th station, Hakone hot springs" },
      { day: "Day 6", title: "Tsukiji & Ginza", desc: "Fresh sushi breakfast, luxury shopping, Sumida river" },
      { day: "Day 7", title: "Odaiba & Shinjuku", desc: "Teamlab Planets, Robot Restaurant, neon nightlife" },
      { day: "Day 8", title: "Departure", desc: "Last ramen, Narita / Haneda airport" },
    ],
    hotels: [
      { name: "Park Hyatt Tokyo", stars: 5, location: "Shinjuku", perks: "Lost in Translation views · Pool", pricePerNight: "$550", tier: "Luxury" },
      { name: "Hotel Gracery Shinjuku", stars: 4, location: "Shinjuku", perks: "Godzilla head · Great location", pricePerNight: "$180", tier: "Premium" },
      { name: "Khaosan Tokyo Samurai", stars: 3, location: "Asakusa", perks: "Capsule & dorm options · Central", pricePerNight: "$45", tier: "Budget" },
    ],
    cabs: [
      { type: "IC Card (Suica)", price: "$30", unit: "/load", note: "Metro, JR, buses" },
      { type: "JR Pass", price: "$280", unit: "/week", note: "All bullet trains" },
      { type: "Taxi", price: "$15", unit: "/km", note: "Expensive but 24/7" },
    ],
    info: { airport: "Narita / Haneda Airport", currency: "Japanese Yen (JPY)", language: "Japanese", bestSeason: "Mar–May & Sep–Nov", visa: "Visa Free (check current)", timezone: "GMT+9" },
  },
  "Maldives": {
    duration: "7 Days",
    itinerary: [
      { day: "Day 1", title: "Male & Transfer", desc: "Speedboat to resort, welcome coconut, beach stroll" },
      { day: "Day 2", title: "Snorkeling Safari", desc: "House reef snorkeling, sea turtle spotting, sunset dhow" },
      { day: "Day 3", title: "Underwater Restaurant", desc: "World's first undersea dining, bioluminescent beach night" },
      { day: "Day 4", title: "Water Sports Day", desc: "Jet ski, windsurfing, parasailing over the lagoon" },
      { day: "Day 5", title: "Dolphin Cruise", desc: "Sunset dolphin watching, stargazing on the sandbank" },
      { day: "Day 6", title: "Island Hopping", desc: "Local island visit, fishing village, fresh tuna lunch" },
      { day: "Day 7", title: "Departure", desc: "Final swim, seaplane to Male airport" },
    ],
    hotels: [
      { name: "Soneva Jani", stars: 5, location: "Noonu Atoll", perks: "Overwater villa · Private pool", pricePerNight: "$1200", tier: "Ultra Luxury" },
      { name: "Sun Siyam Iru Fushi", stars: 5, location: "Noonu Atoll", perks: "All-inclusive · Water bungalow", pricePerNight: "$650", tier: "Luxury" },
      { name: "Kuredu Island Resort", stars: 4, location: "Lhaviyani Atoll", perks: "Budget overwater · House reef", pricePerNight: "$280", tier: "Mid-range" },
    ],
    cabs: [
      { type: "Seaplane", price: "$350", unit: "/person", note: "Scenic, most resorts" },
      { type: "Speedboat", price: "$80", unit: "/person", note: "Nearby atolls" },
      { type: "Dhoni Boat", price: "$25", unit: "/trip", note: "Local island hops" },
    ],
    info: { airport: "Velana Intl (MLE)", currency: "US Dollar (USD)", language: "Dhivehi / English", bestSeason: "Nov–Apr", visa: "Free on Arrival (30 days)", timezone: "GMT+5" },
  },
  "Machu Picchu": {
    duration: "7 Days",
    itinerary: [
      { day: "Day 1", title: "Lima Arrival", desc: "Miraflores district, ceviche dinner, coastal views" },
      { day: "Day 2", title: "Fly to Cusco", desc: "Acclimatize at 3,400m, San Blas neighborhood, Plaza de Armas" },
      { day: "Day 3", title: "Sacred Valley", desc: "Pisac ruins, Ollantaytambo fortress, local market" },
      { day: "Day 4", title: "Machu Picchu", desc: "Train to Aguas Calientes, sunrise at the citadel, Sun Gate trek" },
      { day: "Day 5", title: "Huayna Picchu Trek", desc: "Steep hike above the ruins, condor viewpoint" },
      { day: "Day 6", title: "Rainbow Mountain", desc: "Vinicunca hike at 5,200m, colorful striped Andes peaks" },
      { day: "Day 7", title: "Departure", desc: "Cusco market, flight to Lima, international departure" },
    ],
    hotels: [
      { name: "Belmond Sanctuary Lodge", stars: 5, location: "Machu Picchu", perks: "Only hotel at the ruins gate", pricePerNight: "$900", tier: "Luxury" },
      { name: "Inkaterra Machu Picchu", stars: 5, location: "Aguas Calientes", perks: "Cloud forest · Organic garden", pricePerNight: "$400", tier: "Premium" },
      { name: "Sumaq Machu Picchu", stars: 4, location: "Aguas Calientes", perks: "Mountain river view · Spa", pricePerNight: "$180", tier: "Mid-range" },
    ],
    cabs: [
      { type: "Peru Rail / Inca Rail", price: "$80", unit: "/person", note: "Cusco to Aguas Calientes" },
      { type: "Bus to Ruins", price: "$24", unit: "/return", note: "Aguas Calientes → ruins" },
      { type: "Private Van", price: "$60", unit: "/day", note: "Sacred Valley transfers" },
    ],
    info: { airport: "Alejandro Velasco Astete (CUZ)", currency: "Peruvian Sol (PEN)", language: "Spanish / Quechua", bestSeason: "May–Sep (dry season)", visa: "Visa Free for India (check current)", timezone: "GMT-5" },
  },
  "Paris": {
    duration: "5 Days",
    itinerary: [
      { day: "Day 1", title: "Eiffel & Champs-Élysées", desc: "Tower summit at sunset, evening walk on Champs-Élysées" },
      { day: "Day 2", title: "Louvre & Marais", desc: "Mona Lisa, Seine river walk, Marais district dinner" },
      { day: "Day 3", title: "Versailles Day Trip", desc: "Palace of Versailles, Hall of Mirrors, royal gardens" },
      { day: "Day 4", title: "Montmartre & Sacré-Cœur", desc: "Artist quarter, Moulin Rouge show evening" },
      { day: "Day 5", title: "Departure", desc: "Pastry breakfast, last shopping, CDG airport" },
    ],
    hotels: [
      { name: "Le Bristol Paris", stars: 5, location: "8th Arr.", perks: "Palace hotel · Michelin dining", pricePerNight: "$800", tier: "Luxury" },
      { name: "Hotel du Panthéon", stars: 4, location: "Latin Quarter", perks: "Rooftop Eiffel view · Charming", pricePerNight: "$250", tier: "Premium" },
      { name: "Generator Paris", stars: 3, location: "10th Arr.", perks: "Trendy hostel · Rooftop bar", pricePerNight: "$85", tier: "Budget" },
    ],
    cabs: [
      { type: "Metro Pass", price: "$18", unit: "/day", note: "Unlimited metro + bus" },
      { type: "Taxi / Uber", price: "$15", unit: "/trip", note: "Airport ~€50 fixed" },
      { type: "Vélib Bike", price: "$5", unit: "/day", note: "City bike sharing" },
    ],
    info: { airport: "Charles de Gaulle (CDG)", currency: "Euro (EUR)", language: "French", bestSeason: "Apr–Jun & Sep–Oct", visa: "Schengen Visa", timezone: "GMT+1" },
  },
  "Safari Kenya": {
    duration: "8 Days",
    itinerary: [
      { day: "Day 1", title: "Nairobi Arrival", desc: "Elephant orphanage, Giraffe Centre, Karen Blixen Museum" },
      { day: "Day 2–3", title: "Masai Mara", desc: "Game drives – Big Five, wildebeest migration, sundowners" },
      { day: "Day 4", title: "Hot Air Balloon", desc: "Dawn balloon over Mara, bush champagne breakfast" },
      { day: "Day 5", title: "Amboseli", desc: "Elephants with Kilimanjaro backdrop, Masai village visit" },
      { day: "Day 6", title: "Lake Nakuru", desc: "Flamingos, rhino sanctuary, leopard & lion sightings" },
      { day: "Day 7", title: "Samburu Reserve", desc: "Unique northern species: reticulated giraffe, Grevy's zebra" },
      { day: "Day 8", title: "Departure", desc: "Final game drive at dawn, Nairobi airport" },
    ],
    hotels: [
      { name: "Angama Mara", stars: 5, location: "Masai Mara", perks: "Suspended above the Mara escarpment", pricePerNight: "$1100", tier: "Luxury" },
      { name: "Sarova Mara Game Camp", stars: 4, location: "Masai Mara", perks: "Tented camp · Full-board", pricePerNight: "$380", tier: "Premium" },
      { name: "Mara Intrepids", stars: 4, location: "Masai Mara", perks: "Riverside · Great value tents", pricePerNight: "$220", tier: "Mid-range" },
    ],
    cabs: [
      { type: "Safari Jeep (4x4)", price: "Included", unit: "in package", note: "Pop-up roof game drive vehicle" },
      { type: "Charter Flight", price: "$250", unit: "/person", note: "Nairobi to Mara (45 min)" },
      { type: "Matatu / Bus", price: "$10", unit: "/trip", note: "Nairobi city only" },
    ],
    info: { airport: "Jomo Kenyatta Intl (NBO)", currency: "Kenyan Shilling (KES)", language: "Swahili / English", bestSeason: "Jul–Oct (migration)", visa: "eVisa required", timezone: "GMT+3" },
  },
  "New Zealand": {
    duration: "10 Days",
    itinerary: [
      { day: "Day 1–2", title: "Auckland", desc: "Sky Tower, Waiheke Island wine tour, Harbour Bridge climb" },
      { day: "Day 3", title: "Rotorua", desc: "Te Puia geothermal park, Māori hāngī dinner, mud pools" },
      { day: "Day 4", title: "Hobbiton", desc: "Lord of the Rings movie set tour, Shire pub" },
      { day: "Day 5–6", title: "Queenstown", desc: "Bungee jumping, Milford Sound cruise, Remarkables ski" },
      { day: "Day 7", title: "Fiordland", desc: "Milford Sound overnight, Mitre Peak, glowworm cave" },
      { day: "Day 8", title: "Franz Josef Glacier", desc: "Heli-hike on the glacier, westcoast rainforest walk" },
      { day: "Day 9–10", title: "Christchurch", desc: "Garden city, Aoraki Mt Cook sunrise, departure" },
    ],
    hotels: [
      { name: "Aro Ha Wellness Retreat", stars: 5, location: "Queenstown", perks: "Luxury wellness · Mountain views", pricePerNight: "$500", tier: "Luxury" },
      { name: "Millbrook Resort", stars: 4, location: "Arrowtown", perks: "Golf · Alpine backdrop", pricePerNight: "$280", tier: "Premium" },
      { name: "YHA Queenstown Central", stars: 3, location: "Queenstown", perks: "Hostel · Lake views · Budget", pricePerNight: "$50", tier: "Budget" },
    ],
    cabs: [
      { type: "Campervan (Jucy)", price: "$110", unit: "/day", note: "Most popular way to explore" },
      { type: "Rental Car", price: "$55", unit: "/day", note: "Drive left! Scenic highways" },
      { type: "InterCity Bus", price: "$30", unit: "/trip", note: "Major cities only" },
    ],
    info: { airport: "Auckland (AKL) / Queenstown (ZQN)", currency: "NZ Dollar (NZD)", language: "English / Māori", bestSeason: "Dec–Feb (summer)", visa: "NZ ETA required", timezone: "GMT+12" },
  },
  "Dubai": {
    duration: "5 Days",
    itinerary: [
      { day: "Day 1", title: "Downtown & Burj Khalifa", desc: "World's tallest building at sunset, Dubai Fountain show" },
      { day: "Day 2", title: "Desert Safari", desc: "Dune bashing, camel ride, Bedouin camp, belly dance dinner" },
      { day: "Day 3", title: "Dubai Mall & Marina", desc: "Largest mall, indoor ski slope, Dubai Marina sunset cruise" },
      { day: "Day 4", title: "Old Dubai", desc: "Gold Souk, Spice Souk, Abra creek crossing, Al Fahidi" },
      { day: "Day 5", title: "Departure", desc: "Jumeirah beach final swim, Duty-free shopping" },
    ],
    hotels: [
      { name: "Burj Al Arab", stars: 5, location: "Jumeirah", perks: "World's most luxurious hotel", pricePerNight: "$1500", tier: "Ultra Luxury" },
      { name: "Atlantis The Palm", stars: 5, location: "Palm Jumeirah", perks: "Aquaventure Waterpark access", pricePerNight: "$450", tier: "Luxury" },
      { name: "Premier Inn Dubai", stars: 3, location: "Silicon Oasis", perks: "Great value · Metro nearby", pricePerNight: "$90", tier: "Budget" },
    ],
    cabs: [
      { type: "Dubai Metro", price: "$3", unit: "/trip", note: "Clean, A/C, very reliable" },
      { type: "Careem / Uber", price: "$8", unit: "/trip", note: "Cheap, widely available" },
      { type: "RTA Taxi", price: "$10", unit: "/trip", note: "Metered, official" },
    ],
    info: { airport: "Dubai International (DXB)", currency: "UAE Dirham (AED)", language: "Arabic / English", bestSeason: "Oct–Apr", visa: "Free on Arrival (India)", timezone: "GMT+4" },
  },
  "Iceland": {
    duration: "8 Days",
    itinerary: [
      { day: "Day 1", title: "Reykjavik Arrival", desc: "Hallgrímskirkja church, Harpa concert hall, harbour" },
      { day: "Day 2", title: "Golden Circle", desc: "Þingvellir, Geysir eruptions, Gullfoss waterfall" },
      { day: "Day 3", title: "South Coast", desc: "Skógafoss, Jökulsárlón glacier lagoon, black sand beach" },
      { day: "Day 4", title: "Northern Lights", desc: "Aurora hunting tour, Snæfellsnes peninsula" },
      { day: "Day 5", title: "Whale Watching", desc: "Humpback whale tour from Húsavík, puffin colony" },
      { day: "Day 6", title: "Blue Lagoon", desc: "Geothermal spa soak, silica mud mask, lava field walk" },
      { day: "Day 7", title: "Westfjords Scenic", desc: "Dynjandi waterfall, remote fjords drive" },
      { day: "Day 8", title: "Departure", desc: "Reykjavik last coffee, Keflavik airport" },
    ],
    hotels: [
      { name: "The Retreat at Blue Lagoon", stars: 5, location: "Grindavík", perks: "Geothermal private lagoon access", pricePerNight: "$900", tier: "Luxury" },
      { name: "Ion Adventure Hotel", stars: 4, location: "Þingvellir", perks: "Northern lights lounge · Lava field", pricePerNight: "$350", tier: "Premium" },
      { name: "Kex Hostel Reykjavik", stars: 3, location: "Reykjavik", perks: "Trendy converted factory · Bar", pricePerNight: "$80", tier: "Budget" },
    ],
    cabs: [
      { type: "4WD Car Rental", price: "$100", unit: "/day", note: "Essential for F-roads" },
      { type: "Campervan", price: "$140", unit: "/day", note: "Sleep + drive freedom" },
      { type: "Reykjavik Bus", price: "$3", unit: "/trip", note: "City only" },
    ],
    info: { airport: "Keflavik International (KEF)", currency: "Icelandic Króna (ISK)", language: "Icelandic / English", bestSeason: "Jun–Aug (midnight sun) / Sep–Mar (aurora)", visa: "Schengen Visa", timezone: "GMT+0" },
  },
  "Amalfi Coast": {
    duration: "6 Days",
    itinerary: [
      { day: "Day 1", title: "Naples Arrival", desc: "Pizza in Naples, transfer to Positano" },
      { day: "Day 2", title: "Positano Wander", desc: "Cliffside alleyways, beach, lemon granita, bougainvillea views" },
      { day: "Day 3", title: "Amalfi Town", desc: "Cathedral, Valle delle Ferriere hike, limoncello tasting" },
      { day: "Day 4", title: "Ravello & Villa Cimbrone", desc: "Infinity terrace views, Wagner festival gardens" },
      { day: "Day 5", title: "Capri Day Trip", desc: "Blue Grotto, Faraglioni rocks, chairlift to Monte Solaro" },
      { day: "Day 6", title: "Departure", desc: "Scenic drive back to Naples airport" },
    ],
    hotels: [
      { name: "Le Sirenuse Positano", stars: 5, location: "Positano", perks: "Iconic terrace pool · Sea view", pricePerNight: "$750", tier: "Luxury" },
      { name: "Hotel Santa Caterina", stars: 5, location: "Amalfi", perks: "Cliff elevator to sea · Fine dining", pricePerNight: "$400", tier: "Premium" },
      { name: "Hotel Bougainville", stars: 3, location: "Positano", perks: "Sea-view balcony · Budget pick", pricePerNight: "$150", tier: "Mid-range" },
    ],
    cabs: [
      { type: "Ferry", price: "$20", unit: "/trip", note: "Positano–Amalfi–Capri" },
      { type: "Private Driver", price: "$90", unit: "/half day", note: "Cliff road specialist" },
      { type: "SITA Bus", price: "$2", unit: "/trip", note: "Scenic coastal SS163 road" },
    ],
    info: { airport: "Naples Capodichino (NAP)", currency: "Euro (EUR)", language: "Italian", bestSeason: "May–Jun & Sep", visa: "Schengen Visa", timezone: "GMT+1" },
  },
};

function getDefaultExtras(name: string) {
  return {
    duration: "6 Days",
    itinerary: [
      { day: "Day 1", title: "Arrival & Explore", desc: `Arrive in ${name}, check in and explore the local area` },
      { day: "Day 2–3", title: "Main Attractions", desc: "Visit the iconic landmarks and top attractions" },
      { day: "Day 4", title: "Local Experiences", desc: "Food tours, cultural experiences, local markets" },
      { day: "Day 5", title: "Day Trip", desc: "Scenic excursion to nearby natural wonder or town" },
      { day: "Day 6", title: "Departure", desc: "Last morning stroll, souvenir shopping, airport" },
    ],
    hotels: [
      { name: `${name} Grand Hotel`, stars: 5, location: "City Centre", perks: "Pool · Spa · Breakfast included", pricePerNight: "$200", tier: "Luxury" },
      { name: `${name} Boutique Stay`, stars: 4, location: "Old Town", perks: "Charming · Great reviews", pricePerNight: "$100", tier: "Premium" },
      { name: `${name} Budget Inn`, stars: 3, location: "Near Station", perks: "Clean · Central · Value", pricePerNight: "$50", tier: "Budget" },
    ],
    cabs: [
      { type: "Private Car", price: "$30", unit: "/day", note: "With driver, A/C" },
      { type: "Taxi / Rideshare", price: "$10", unit: "/trip", note: "Easy to find" },
      { type: "Public Transit", price: "$2", unit: "/trip", note: "Metro / Bus" },
    ],
    info: { airport: `${name} International Airport`, currency: "Local Currency", language: "Local Language", bestSeason: "Year-round", visa: "Check requirements", timezone: "Local time" },
  };
}

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

// Register
app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Please provide all required fields' });
    return;
  }

  try {
    const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { lastID } = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const token = jwt.sign({ id: lastID, email, name }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: lastID, name, email }
    });
  } catch (error: any) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Please provide email and password' });
    return;
  }

  try {
    const user: any = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error: any) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get Current User Profile
app.get('/api/auth/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.user?.id]);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// ==========================================
// 2. TOURS & DESTINATIONS ROUTES
// ==========================================

// Get All Tours
app.get('/api/tours', async (req: Request, res: Response) => {
  try {
    const tours: any[] = await db.all('SELECT * FROM tours');
    const formattedTours = tours.map(tour => ({
      ...tour,
      highlights: JSON.parse(tour.highlights),
      included: JSON.parse(tour.included)
    }));
    res.json(formattedTours);
  } catch (error: any) {
    console.error('Error fetching tours:', error.message);
    res.status(500).json({ error: 'Failed to retrieve tours' });
  }
});

// Get Tour by ID
app.get('/api/tours/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tour: any = await db.get('SELECT * FROM tours WHERE id = ?', [id]);
    if (!tour) {
      res.status(404).json({ error: 'Tour not found' });
      return;
    }
    res.json({
      ...tour,
      highlights: JSON.parse(tour.highlights),
      included: JSON.parse(tour.included)
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve tour details' });
  }
});

// Get All Destinations
app.get('/api/destinations', async (req: Request, res: Response) => {
  try {
    const destinations = await db.all('SELECT * FROM destinations');
    const formattedDestinations = destinations.map((dest: any) => ({
      ...dest,
      featured: dest.featured === 1
    }));
    res.json(formattedDestinations);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to retrieve destinations' });
  }
});

// ── NEW: Get Destination Detail by ID ──────────────────────────────────────
app.get('/api/destinations/:id/details', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dest: any = await db.get('SELECT * FROM destinations WHERE id = ?', [id]);
    if (!dest) {
      res.status(404).json({ error: 'Destination not found' });
      return;
    }

    const extras = destinationExtras[dest.name] ?? getDefaultExtras(dest.name);

    res.json({
      id: dest.id,
      name: dest.name,
      country: dest.country,
      image: dest.image,
      price: dest.price,
      rating: dest.rating,
      description: dest.description,
      category: dest.category,
      featured: dest.featured === 1,
      duration: extras.duration,
      itinerary: extras.itinerary,
      hotels: extras.hotels,
      cabs: extras.cabs,
      info: extras.info,
    });
  } catch (error: any) {
    console.error('Error fetching destination details:', error.message);
    res.status(500).json({ error: 'Failed to retrieve destination details' });
  }
});

// ==========================================
// 3. BOOKINGS ROUTES
// ==========================================

// Get User Bookings
app.get('/api/bookings', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await db.all(`
      SELECT b.*, t.name as tour_name, t.image as tour_image, t.duration as tour_duration
      FROM bookings b
      JOIN tours t ON b.tour_id = t.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `, [req.user?.id]);
    res.json(bookings);
  } catch (error: any) {
    console.error('Error getting bookings:', error.message);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Add Booking
app.post('/api/bookings/add', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { tour_id, booking_date, guests, total_price } = req.body;

  if (!tour_id || !booking_date || !guests || !total_price) {
    res.status(400).json({ error: 'Please provide all booking details' });
    return;
  }

  try {
    const { lastID } = await db.run(
      'INSERT INTO bookings (user_id, tour_id, booking_date, guests, total_price) VALUES (?, ?, ?, ?, ?)',
      [req.user?.id, tour_id, booking_date, guests, total_price]
    );

    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: lastID
    });
  } catch (error: any) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Cancel Booking
app.post('/api/bookings/:id/cancel', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await db.get('SELECT id FROM bookings WHERE id = ? AND user_id = ?', [id, req.user?.id]);
    if (!booking) {
      res.status(404).json({ error: 'Booking not found or unauthorized' });
      return;
    }

    await db.run("UPDATE bookings SET status = 'Cancelled' WHERE id = ?", [id]);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

// ==========================================
// 4. REVIEWS ROUTES
// ==========================================

// Get Tour Reviews
app.get('/api/tours/:id/reviews', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reviews = await db.all(`
      SELECT r.*, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.tour_id = ?
      ORDER BY r.created_at DESC
    `, [id]);
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add Tour Review
app.post('/api/tours/:id/reviews/add', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400).json({ error: 'Please provide rating and comment' });
    return;
  }

  try {
    await db.run(
      'INSERT INTO reviews (user_id, tour_id, rating, comment) VALUES (?, ?, ?, ?)',
      [req.user?.id, id, rating, comment]
    );

    const stats: any = await db.get(
      'SELECT COUNT(*) as count, AVG(rating) as avg_rating FROM reviews WHERE tour_id = ?',
      [id]
    );

    const roundedRating = Math.round((stats.avg_rating || 0) * 10) / 10;

    await db.run(
      'UPDATE tours SET rating = ?, reviews = ? WHERE id = ?',
      [roundedRating, stats.count, id]
    );

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error: any) {
    console.error('Error adding review:', error.message);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// ==========================================
// 5. WISHLIST ROUTES
// ==========================================

// Get User Wishlist
app.get('/api/wishlist', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const wishlistItems = await db.all('SELECT item_id, item_type FROM wishlist WHERE user_id = ?', [req.user?.id]);
    res.json(wishlistItems);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// Toggle Wishlist Item
app.post('/api/wishlist/toggle', authenticateToken, async (req: AuthRequest, res: Response) => {
  const { item_id, item_type } = req.body;

  if (!item_id || !item_type) {
    res.status(400).json({ error: 'Please provide item_id and item_type' });
    return;
  }

  try {
    const item = await db.get(
      'SELECT id FROM wishlist WHERE user_id = ? AND item_id = ? AND item_type = ?',
      [req.user?.id, item_id, item_type]
    );

    if (item) {
      await db.run('DELETE FROM wishlist WHERE id = ?', [item.id]);
      res.json({ inWishlist: false, message: 'Removed from wishlist' });
    } else {
      await db.run(
        'INSERT INTO wishlist (user_id, item_id, item_type) VALUES (?, ?, ?)',
        [req.user?.id, item_id, item_type]
      );
      res.json({ inWishlist: true, message: 'Added to wishlist' });
    }
  } catch (error: any) {
    console.error('Wishlist toggle error:', error.message);
    res.status(500).json({ error: 'Failed to toggle wishlist item' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
