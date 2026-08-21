/**
 * =========================================================================
 * 📰 Blinklean Daily News Automated Publisher
 * =========================================================================
 * Runs automatically via Scheduled GitHub Actions (e.g. 7:00 AM IST)
 * or can be executed manually via `node scripts/publish_daily_news.cjs`.
 *
 * It generates a high-quality, structured daily clean-tech/society bulletin
 * with high-res imagery, key takeaways, and publishes it to Firestore.
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// 1. Initialize Firebase Admin SDK
function initFirebase() {
  if (admin.apps.length > 0) return admin.firestore();

  // Try serviceAccountKey.json first if present
  const keyPath = path.join(__dirname, '..', 'serviceAccountKey.json');
  if (fs.existsSync(keyPath)) {
    try {
      const serviceAccount = require(keyPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log('✅ Firebase initialized using serviceAccountKey.json');
      return admin.firestore();
    } catch (e) {
      console.warn('⚠️ Could not load serviceAccountKey.json directly:', e.message);
    }
  }

  // Fallback to environment variables
  require('dotenv').config({ path: path.join(__dirname, '..', 'blinklean-backend', '.env') });
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : null;

  if (privateKey && process.env.FIREBASE_CLIENT_EMAIL) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID || 'blinklean-web',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey
      })
    });
    console.log('✅ Firebase initialized using environment variables');
    return admin.firestore();
  }

  // Fallback for default application credentials
  try {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'blinklean-web'
    });
    console.log('✅ Firebase initialized using default application credentials');
    return admin.firestore();
  } catch (err) {
    console.error('❌ Failed to initialize Firebase Admin:', err.message);
    process.exit(1);
  }
}

// 2. Curated Pool of Dynamic Daily News Topics
const TOPIC_TEMPLATES = [
  {
    category: "tech",
    categoryLabel: "Clean-Tech & Innovation",
    author: "CleanTech Intelligence Desk",
    readTime: "4 min read",
    titleTemplates: [
      "Smart Optical Sorters Boost Doorstep Scrap Recovery by 320% Across Urban Neighborhoods",
      "Next-Gen Digital Load-Cell Logistics Revolutionize Urban Recyclable Aggregation",
      "Decentralized High-Yield Polymer Processing Sets New Standard for Circular Packaging",
      "Autonomous Doorstep Collection Routes Cut Carbon Footprint of Municipal Scrap Drives"
    ],
    summaries: [
      "Modern digital load-cell vehicles and automated computer-vision sorting platforms achieve unprecedented scrap recovery efficiency in residential societies.",
      "Clean-tech scrap aggregators deploy real-time digital pricing feeds and instant electronic payouts, transforming household recycling behaviors.",
      "High-density polymer sorting and closed-loop e-waste recycling divert over 500 metric tons of hazardous materials from regional landfills this month."
    ],
    contents: [
      `Urban household scrap collection has entered a new era of digital precision. On-demand doorstep collection platforms are now deploying calibrated smart scales synchronized via IoT modules with cloud pricing indexes.\n\nResidents scheduling doorstep scrap pickups receive instant digital slips and transparent weight receipts. By pre-sorting paper, metals, and electronics at source, clean materials are routed straight to verified circular economy processors rather than ending up in mixed garbage dumps.\n\nCommunity audits reveal that neighborhoods adopting smart collection infrastructure have seen a 320% increase in recyclable capture rates within the first 60 days.`,
      `Circular economy platforms in metropolitan clusters are rapidly scaling AI-assisted material recovery hubs. By integrating optical spectroscopic sensors, sorting facilities separate high-density polyethylene, polypropylene, and PET flakes with over 99.4% purity.\n\nThis high-purity feed is supplied directly to domestic manufacturers, significantly reducing the requirement for virgin fossil-based polymer manufacturing. Furthermore, instant digital payments provide local collectors with secure, dignified livelihoods.`
    ],
    covers: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80"
    ],
    galleries: [
      [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
      ],
      [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
      ]
    ],
    takeaways: [
      "IoT digital load-cells guarantee tamper-proof scrap weight transparency.",
      "Over 99% purity achieved in decentralized recyclable polymer streams.",
      "Instant spot payments boost community recycling participation rates."
    ],
    tags: ["CleanTech", "SmartSorting", "RecyclingLoops", "CircularEconomy", "DigitalLogistics"]
  },
  {
    category: "environment",
    categoryLabel: "Environment & Ecology",
    author: "Blinklean Environmental Desk",
    readTime: "5 min read",
    titleTemplates: [
      "Peri-Urban Lake Rejuvenation Mission Deploys Floating Wetland Bio-Filters",
      "City-Wide Micro-Forestry Drive Restores 50+ Biodiversity Corridors",
      "Decentralized Stormwater Percolation Pits Boost Urban Groundwater Tables by 2.4 Meters",
      "Community Ecological Networks Plant 10,000 Native Trees Across Green Belts"
    ],
    summaries: [
      "State ecological authorities and green youth networks install artificial floating wetlands and Miyawaki dense micro-forests to restore local waterbody health.",
      "Citizen-led environmental drives mobilize thousands of volunteers to rejuvenate degraded lake buffers with native flora and bio-retention swales.",
      "Decentralized rainwater percolation structures and catchment cleanups safeguard municipal aquifers against summer depletion."
    ],
    contents: [
      `A coordinated urban ecological mission has introduced artificial floating wetland islands (AFWs) across major catchment waterbodies. The buoyant islands are planted with native aquatic reeds like Canna and Vetiver grass, whose root systems actively absorb dissolved nitrogen and heavy metal residues.\n\nCombined with Miyawaki high-density planting of Neem, Honge, and Jamun along lake banks, ambient surface temperatures in surrounding neighborhoods have dropped measurably.\n\nOver 15,000 volunteers and school green clubs joined the weekend maintenance drive, demonstrating the immense power of civic environmental stewardship.`,
      `Urban micro-forests are proving to be indispensable defenses against rapid urbanization and urban heat islands. By planting multi-layered indigenous saplings in compact public spaces, micro-forests grow up to 10 times faster than conventional monoculture parks.\n\nIn addition to supporting local pollinators, bird species, and beneficial insects, these micro-forests facilitate high-volume soil water infiltration, replenishing dried borewells across residential layouts.`
    ],
    covers: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80"
    ],
    galleries: [
      [
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
      ]
    ],
    takeaways: [
      "Artificial floating wetlands bio-remediate excess nutrient runoffs naturally.",
      "Native micro-forestry creates resilient micro-climate buffers against heat.",
      "Groundwater levels in surrounding borewells observe significant recharge."
    ],
    tags: ["Ecology", "MicroForestry", "Waterbodies", "GreenAction", "Biodiversity"]
  },
  {
    category: "health",
    categoryLabel: "Health & Sanitation",
    author: "Public Health & Sanitation Review",
    readTime: "4 min read",
    titleTemplates: [
      "Waterless Vehicle Detailing Saves Over 2.5 Million Liters of Potable Water Monthly",
      "Bio-Enzymatic Cleaning Agents Replace Toxic Petrochemical Detergents Across Households",
      "High-Temperature Steam Extraction Elevates Residential Sanitation & Indoor Air Standards",
      "Eco-Friendly Home Hygiene Protocols Gain Rapid Widespread Adoption in Gated Communities"
    ],
    summaries: [
      "Advanced plant-based lubricants and steam cleaning techniques eliminate chemical runoff and conserve millions of liters of clean drinking water.",
      "Doorstep sanitation platforms champion non-toxic, allergen-free botanical cleaning solutions, safeguarding indoor respiratory health.",
      "Rapid adoption of waterless car wash solutions across residential complexes prevents tens of thousands of liters of dirty runoff from polluting storm drains."
    ],
    contents: [
      `Urban vehicle care is experiencing a profound sustainability transformation. Traditional hose washing consumes anywhere from 120 to 200 liters of drinking water per vehicle wash, whereas advanced waterless nano-emulsion formulations require just 250ml of liquid agent to lift road grime without scratching paintwork.\n\nResidential apartment communities are widely adopting waterless doorstep cleaning mandates, saving millions of liters of freshwater each month.\n\nFurthermore, zero soapy runoff enters municipal stormwater drains, preventing groundwater contamination in residential sectors.`,
      `Indoor air quality within modern homes often contains higher concentrations of volatile organic compounds (VOCs) than outdoor air, largely due to synthetic chemical sprays. The shift toward bio-enzymatic surfactants derived from sugar cane and citrus extracts has drastically reduced indoor allergen triggers.\n\nCombined with high-pressure dry steam sanitization at 140°C, homes achieve 99.9% pathogen elimination without chemical residues.`
    ],
    covers: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1000&q=80"
    ],
    galleries: [
      [
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
      ]
    ],
    takeaways: [
      "Waterless detailing prevents wastage of up to 180 liters of water per car wash.",
      "Bio-enzymatic agents eliminate synthetic VOCs and indoor respiratory hazards.",
      "Dry steam sanitization provides deep allergen neutralization safely."
    ],
    tags: ["WaterConservation", "EcoSanitation", "Health", "IndoorAir", "ZeroWaste"]
  },
  {
    category: "society",
    categoryLabel: "Society & Civic Welfare",
    author: "Civic Action Chronicle",
    readTime: "3 min read",
    titleTemplates: [
      "Resident Welfare Associations Spearhead 100% In-Situ Organic Waste Composting",
      "Community Circular Economy Hubs Enable Thousands of Upcycled Goods Exchanges",
      "Green Youth Volunteer Brigades Transform Urban Flyover Underpasses into Vibrant Parks",
      "Neighborhood Zero-Waste Charters Achieve Record Diversion From Municipal Landfills"
    ],
    summaries: [
      "Over 150 residential societies establish decentralized aerobic composters and community barter programs, achieving near-zero waste footprints.",
      "Civic resident networks partner with clean-tech recyclers to institutionalize source segregation and circular resource management.",
      "Decentralized composting turns kitchen vegetable scraps into rich organic soil nutrients for community vegetable patches and terrace gardens."
    ],
    contents: [
      `Resident Welfare Associations (RWAs) across urban centers are leading by example in localized waste processing. By installing aerobic organic waste converters and partnering with verified recyclers, gated communities are processing up to 92% of their solid waste on premise.\n\nThe nutrient-dense organic compost generated from kitchen scraps is harvested to maintain community terrace gardens and neighborhood public parks.\n\nMonthly circular flea markets organized by residents also encourage the repair, upcycling, and exchange of pre-loved household items, fostering a vibrant culture of mindful consumption.`,
      `Civic youth groups and environmental volunteers are revitalizing neglected urban corners into thriving public green spaces. By clearing illegal debris and introducing vertical gardens irrigated with rainwater, once-neglected spaces are now welcoming community reading pavilions and fitness spots.`
    ],
    covers: [
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80"
    ],
    galleries: [
      [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
      ]
    ],
    takeaways: [
      "Decentralized composting generates tons of high-grade organic fertilizer on site.",
      "150+ residential communities achieve self-reliant zero-waste targets.",
      "Community barter markets foster sustainable reuse and circular consumption."
    ],
    tags: ["CivicAction", "RWA", "ZeroWaste", "Composting", "CommunityLiving"]
  }
];

// Helper to pick random item
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 3. Generate Article Payload
function generateDailyArticle() {
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const editionLabel = `Daily Edition • ${dateFormatted}`;

  const topic = pick(TOPIC_TEMPLATES);
  const title = pick(topic.titleTemplates);
  const summary = pick(topic.summaries);
  const content = pick(topic.contents);
  const coverImage = pick(topic.covers);
  const galleryImages = pick(topic.galleries);

  return {
    title: title,
    category: topic.category,
    categoryLabel: topic.categoryLabel,
    edition: editionLabel,
    date: dateFormatted,
    author: topic.author,
    read_time: topic.readTime,
    summary: summary,
    content: content,
    cover_image: coverImage,
    gallery_images: galleryImages,
    key_takeaways: topic.takeaways,
    tags: topic.tags,
    is_featured: true,
    auto_generated: true,
    created_at: admin.firestore.FieldValue.serverTimestamp()
  };
}

// 4. Publish to Firestore
async function publish() {
  console.log("🚀 Starting Daily News Automated Publishing Job...");
  const db = initFirebase();
  const article = generateDailyArticle();

  console.log(`📰 Generating Article: "${article.title}"`);
  console.log(`🏷️ Category: ${article.categoryLabel} | Edition: ${article.edition}`);

  try {
    // Write to weekly_news collection (the unified live Firestore collection)
    const docRef = await db.collection("weekly_news").add(article);
    console.log(`🎉 Successfully published daily bulletin to Firestore! ID: ${docRef.id}`);

    // Optional: write to daily_news collection as well for dual-sync
    try {
      await db.collection("daily_news").doc(docRef.id).set(article);
      console.log(`✅ Synced with daily_news collection`);
    } catch {
      // ignore
    }

    console.log("🌟 Automated Daily Dispatch Completed Successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to publish daily news article:", err);
    process.exit(1);
  }
}

publish();
