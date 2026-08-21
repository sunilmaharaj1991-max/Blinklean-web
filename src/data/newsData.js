import {
  Layers,
  Leaf,
  Zap,
  Building,
  HeartPulse,
  Globe,
  TrendingUp
} from "lucide-react";

export const CATEGORIES = [
  { id: "all", label: "All News", icon: Layers, colorClass: "all" },
  { id: "environment", label: "Environment & Ecology", icon: Leaf, colorClass: "environment" },
  { id: "tech", label: "Clean-Tech & Innovation", icon: Zap, colorClass: "tech" },
  { id: "society", label: "Society & Civic Welfare", icon: Building, colorClass: "society" },
  { id: "health", label: "Health & Sanitation", icon: HeartPulse, colorClass: "health" },
  { id: "urban", label: "Urban Living & Sustainability", icon: Globe, colorClass: "urban" },
  { id: "economy", label: "Policy & Green Economy", icon: TrendingUp, colorClass: "economy" }
];

export const DEFAULT_DAILY_NEWS = [
  {
    id: "news-urban-forestry-2026",
    title: "Karnataka Launches Urban Micro-Forestry & Lake Rejuvenation Mission",
    category: "environment",
    categoryLabel: "Environment & Ecology",
    edition: "Daily Edition • 21 Aug 2026",
    date: "August 21, 2026",
    author: "Blinklean Environmental Desk",
    read_time: "4 min read",
    summary: "State authorities and green volunteer networks collaborate to transform 40+ peri-urban degraded lake catchments into self-sustaining biodiversity hubs.",
    content: `In a landmark public-private civic initiative, urban municipal bodies and community environmental groups have inaugurated the 2026 Urban Micro-Forestry Mission across key metropolitan catchments.\n\nThe project incorporates Japanese Miyawaki dense-planting techniques with indigenous flora like Neem, Jamun, Peepal, and Honge. Automated water monitoring sensors and decentralized wastewater filtration systems are being installed along lake peripheries to intercept raw surface runoffs before they enter waterbodies.\n\nOver 25,000 citizens and environmental youth clubs registered during the opening weekend to adopt local green corridors. The initiative aims to reduce ambient summer heat by up to 2.5°C in high-density urban clusters over the next three years while restoring groundwater recharge aquifers.`,
    cover_image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "40+ peri-urban lake beds undergoing scientific bio-remediation.",
      "25,000+ registered volunteers participating in micro-forestry.",
      "Deployment of real-time water quality sensors and native flora plantations."
    ],
    tags: ["MicroForestry", "LakeRejuvenation", "Ecology", "CommunityDrives"],
    is_featured: true
  },
  {
    id: "news-cleantech-recycling-2026",
    title: "AI-Powered Material Recovery & Doorstep Scrap Recycling Sweeps Neighborhoods",
    category: "tech",
    categoryLabel: "Clean-Tech & Innovation",
    edition: "Daily Edition • 20 Aug 2026",
    date: "August 20, 2026",
    author: "CleanTech Intelligence Group",
    read_time: "5 min read",
    summary: "How smart digital scheduling, instant electronic spot payments, and optical scrap sorting are transforming household recycling rates by 300%.",
    content: `Household scrap collection is undergoing a massive digital transformation. Modern on-demand platforms are equipping scrap collection vehicles with calibrated digital load-cells and computer-vision sorting assistance.\n\nBy providing doorstep pickups for paper, electronics, metals, and polymers with transparent per-kilogram rates, households no longer discard valuable recyclable materials into mixed garbage. Verified circular economy recyclers receive pre-sorted raw batches with unbroken traceability chains.\n\nPreliminary audits demonstrate a 300% surge in e-waste and paper recovery from apartment complexes, preventing hundreds of metric tons of toxic plastics and battery compounds from ending up in landfills.`,
    cover_image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "Digital load-cell scales and automated sorting increase circular scrap recovery.",
      "Direct instant spot payouts encourage widespread residential participation.",
      "Zero landfill diversion rate achieved for clean secondary recyclables."
    ],
    tags: ["CleanTech", "RecyclingLoops", "SmartSorting", "CircularEconomy"],
    is_featured: false
  },
  {
    id: "news-resident-welfare-2026",
    title: "Resident Welfare Associations Spearhead Zero-Waste Gated Communities",
    category: "society",
    categoryLabel: "Society & Civic Welfare",
    edition: "Daily Edition • 19 Aug 2026",
    date: "August 19, 2026",
    author: "Civic Action Chronicle",
    read_time: "3 min read",
    summary: "Over 120 residential societies implement decentralized composting and source segregation mandates, achieving self-reliant waste processing.",
    content: `Resident Welfare Associations (RWAs) across urban centers are taking direct ownership of their environmental footprint. By establishing on-premise organic waste aerobic composters and partnering with clean-tech recyclers, neighborhoods are processing up to 90% of their daily waste on-site.\n\nOrganic compost generated from household vegetable scraps is redistributed to maintain community gardens, terrace farms, and public parks. RWAs also organize green flea markets where residents exchange pre-loved books, toys, and apparel, promoting a sustainable reuse mindset.`,
    cover_image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "120+ residential complexes achieve 90% localized waste processing.",
      "Decentralized composting generates organic fertilizer for green spaces.",
      "Community barter circles encourage mindful circular consumption."
    ],
    tags: ["CivicAction", "RWA", "ZeroWaste", "CommunityLiving"],
    is_featured: false
  },
  {
    id: "news-doorstep-sanitation-2026",
    title: "Eco-Friendly Doorstep Sanitation & Waterless Detailing Gains Widespread Adoption",
    category: "health",
    categoryLabel: "Health & Sanitation",
    edition: "Daily Edition • 18 Aug 2026",
    date: "August 18, 2026",
    author: "Public Health & Sanitation Review",
    read_time: "4 min read",
    summary: "Plant-derived surfactants and plant-based steam cleaners replace hazardous household chemicals, improving indoor air quality and worker safety.",
    content: `Modern household cleaning is witnessing a rapid shift toward non-toxic, bio-enzymatic cleaning agents. Traditional chlorine, ammonia, and synthetic fragrances often leave behind volatile organic compounds (VOCs) that irritate respiratory tracts and degrade indoor air quality.\n\nProfessional doorstep cleaning platforms are pioneering 100% biodegradable formulations combined with high-temperature steam extraction. Furthermore, waterless vehicle detailing solutions save up to 150 liters of clean potable water per car wash, preventing soapy runoff from entering urban stormwater drains.`,
    cover_image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "Bio-enzymatic cleaners eliminate toxic indoor VOC pollution.",
      "Waterless detailing preserves over 150 liters of drinking water per vehicle.",
      "Trained cleaning professionals operate with protective eco-grade protocols."
    ],
    tags: ["EcoSanitation", "WaterConservation", "IndoorHealth", "BioClean"],
    is_featured: false
  },
  {
    id: "news-circular-economy-policy-2026",
    title: "New Green Credits Policy Incentivizes Residential Recycling and Solar Transition",
    category: "economy",
    categoryLabel: "Policy & Green Economy",
    edition: "Daily Edition • 17 Aug 2026",
    date: "August 17, 2026",
    author: "National Policy & Sustainability Bureau",
    read_time: "4 min read",
    summary: "Government rollout of digital green credit certificates provides tax rebates and utility discounts for verified household carbon reductions.",
    content: `The Ministry of Environment has expanded its Digital Green Credits framework, allowing individual households and residential societies to earn measurable green credits through verified recycling, rainwater harvesting, and rooftop solar adoption.\n\nClean-tech service aggregators are integrating APIs with the national portal, allowing consumers to convert their routine scrap recycling logs into redeemable utility vouchers and property tax deductions. Financial analysts predict this policy will catalyze over ₹2,400 crore in private household green investments by the end of the fiscal year.`,
    cover_image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "Digital Green Credits integrated with municipal utility portals.",
      "Households earn redeemable points for verified scrap recycling.",
      "Projected to mobilize ₹2,400 crore in decentralized sustainability investments."
    ],
    tags: ["GreenCredits", "Policy2026", "SolarTransition", "CircularEconomy"],
    is_featured: false
  }
];

export const DEFAULT_WEEKLY_NEWS = DEFAULT_DAILY_NEWS;

const DYNAMIC_TOPICS = [
  {
    category: "tech",
    title: "Smart Optical Sorters Boost Doorstep Scrap Recovery by 320% in Gated Communities",
    author: "CleanTech Intelligence Desk",
    readTime: "4 min read",
    summary: "Modern digital load-cell vehicles and automated computer-vision sorting platforms achieve unprecedented scrap recovery efficiency in residential societies.",
    content: `Urban household scrap collection has entered a new era of digital precision. On-demand doorstep collection platforms are now deploying calibrated smart scales synchronized via IoT modules with cloud pricing indexes.\n\nResidents scheduling doorstep scrap pickups receive instant digital slips and transparent weight receipts. By pre-sorting paper, metals, and electronics at source, clean materials are routed straight to verified circular economy processors rather than ending up in mixed garbage dumps.\n\nCommunity audits reveal that neighborhoods adopting smart collection infrastructure have seen a 320% increase in recyclable capture rates within the first 60 days.`,
    coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    galleryUrls: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80\nhttps://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
    takeaways: "• IoT digital load-cells guarantee tamper-proof scrap weight transparency.\n• Over 99% purity achieved in decentralized recyclable polymer streams.\n• Instant spot payouts boost community recycling participation rates.",
    tags: "CleanTech, SmartSorting, RecyclingLoops, CircularEconomy"
  },
  {
    category: "environment",
    title: "Urban Lake Rejuvenation Mission Deploys Floating Wetland Bio-Filters",
    author: "Blinklean Environmental Desk",
    readTime: "5 min read",
    summary: "State ecological authorities and green youth networks install artificial floating wetlands and Miyawaki dense micro-forests to restore local waterbody health.",
    content: `A coordinated urban ecological mission has introduced artificial floating wetland islands (AFWs) across major catchment waterbodies. The buoyant islands are planted with native aquatic reeds whose root systems actively absorb dissolved nitrogen and heavy metal residues.\n\nCombined with Miyawaki high-density planting of Neem, Honge, and Jamun along lake banks, ambient surface temperatures in surrounding neighborhoods have dropped measurably.\n\nOver 15,000 volunteers and school green clubs joined the weekend maintenance drive, demonstrating the immense power of civic environmental stewardship.`,
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    galleryUrls: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80\nhttps://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    takeaways: "• Artificial floating wetlands bio-remediate excess nutrient runoffs naturally.\n• Native micro-forestry creates resilient micro-climate buffers against heat.\n• Groundwater levels in surrounding borewells observe significant recharge.",
    tags: "Ecology, MicroForestry, Waterbodies, GreenAction"
  },
  {
    category: "health",
    title: "Waterless Vehicle Detailing Conserves Over 2.5 Million Liters of Potable Water Monthly",
    author: "Public Health & Sanitation Review",
    readTime: "4 min read",
    summary: "Advanced plant-based lubricants and steam cleaning techniques eliminate chemical runoff and conserve millions of liters of clean drinking water.",
    content: `Urban vehicle care is experiencing a profound sustainability transformation. Traditional hose washing consumes anywhere from 120 to 200 liters of drinking water per vehicle wash, whereas advanced waterless nano-emulsion formulations require just 250ml of liquid agent to lift road grime without scratching paintwork.\n\nResidential apartment communities are widely adopting waterless doorstep cleaning mandates, saving millions of liters of freshwater each month.\n\nFurthermore, zero soapy runoff enters municipal stormwater drains, preventing groundwater contamination in residential sectors.`,
    coverImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
    galleryUrls: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80\nhttps://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
    takeaways: "• Waterless detailing prevents wastage of up to 180 liters of water per car wash.\n• Bio-enzymatic agents eliminate synthetic VOCs and indoor respiratory hazards.\n• Dry steam sanitization provides deep allergen neutralization safely.",
    tags: "WaterConservation, EcoSanitation, Health, IndoorAir"
  },
  {
    category: "society",
    title: "Resident Welfare Associations Spearhead 100% In-Situ Organic Waste Composting",
    author: "Civic Action Chronicle",
    readTime: "3 min read",
    summary: "Over 150 residential societies establish decentralized aerobic composters and community barter programs, achieving near-zero waste footprints.",
    content: `Resident Welfare Associations (RWAs) across urban centers are leading by example in localized waste processing. By installing aerobic organic waste converters and partnering with verified recyclers, gated communities are processing up to 92% of their solid waste on premise.\n\nThe nutrient-dense organic compost generated from kitchen scraps is harvested to maintain community terrace gardens and neighborhood public parks.\n\nMonthly circular flea markets organized by residents also encourage the repair, upcycling, and exchange of pre-loved household items, fostering a vibrant culture of mindful consumption.`,
    coverImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
    galleryUrls: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80\nhttps://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    takeaways: "• Decentralized composting generates tons of high-grade organic fertilizer on site.\n• 150+ residential communities achieve self-reliant zero-waste targets.\n• Community barter markets foster sustainable reuse and circular consumption.",
    tags: "CivicAction, RWA, ZeroWaste, Composting, CommunityLiving"
  }
];

export function generateAutoDraftNews() {
  const item = DYNAMIC_TOPICS[Math.floor(Math.random() * DYNAMIC_TOPICS.length)];
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const editionFormatted = `Daily Edition • ${dateFormatted}`;

  return {
    ...item,
    edition: editionFormatted,
    date: dateFormatted
  };
}
