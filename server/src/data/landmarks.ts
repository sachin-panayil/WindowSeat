import { Landmark } from "../types/Landmark"

export const LANDMARKS: Landmark[] = [
    // ============================================
    // MOUNTAIN RANGES & PEAKS (35)
    // ============================================
    {
        id: 'rocky-mountains-co',
        name: 'Rocky Mountains (Colorado)',
        latitude: 39.1911,
        longitude: -106.8175,
        type: 'mountain',
        description: 'Major mountain range; snow-capped peaks visible most of year'
    },
    {
        id: 'rocky-mountains-mt',
        name: 'Rocky Mountains (Montana)',
        latitude: 47.0000,
        longitude: -113.5000,
        type: 'mountain',
        description: 'Northern Rockies with glacial valleys and rugged terrain'
    },
    {
        id: 'mt-rainier',
        name: 'Mount Rainier',
        latitude: 46.8523,
        longitude: -121.7603,
        type: 'mountain',
        description: 'Iconic volcanic peak near Seattle; glaciated summit at 14,411 ft'
    },
    {
        id: 'mt-hood',
        name: 'Mount Hood',
        latitude: 45.3735,
        longitude: -121.6959,
        type: 'mountain',
        description: 'Oregon\'s highest peak; distinctive triangular silhouette'
    },
    {
        id: 'mt-shasta',
        name: 'Mount Shasta',
        latitude: 41.4092,
        longitude: -122.1949,
        type: 'mountain',
        description: 'Isolated volcanic peak in Northern California; perpetual snow'
    },
    {
        id: 'mt-st-helens',
        name: 'Mount St. Helens',
        latitude: 46.1912,
        longitude: -122.1944,
        type: 'mountain',
        description: 'Active volcano with distinctive crater from 1980 eruption'
    },
    {
        id: 'mt-baker',
        name: 'Mount Baker',
        latitude: 48.7768,
        longitude: -121.8145,
        type: 'mountain',
        description: 'Glaciated volcano in North Cascades; visible from Seattle'
    },
    {
        id: 'sierra-nevada-north',
        name: 'Sierra Nevada (North)',
        latitude: 39.0968,
        longitude: -120.0324,
        type: 'mountain',
        description: 'Northern Sierra including Lake Tahoe region'
    },
    {
        id: 'sierra-nevada-south',
        name: 'Sierra Nevada (South)',
        latitude: 36.5785,
        longitude: -118.2923,
        type: 'mountain',
        description: 'Southern Sierra including Mt Whitney and Sequoia region'
    },
    {
        id: 'mt-whitney',
        name: 'Mount Whitney',
        latitude: 36.5785,
        longitude: -118.2923,
        type: 'mountain',
        description: 'Highest peak in contiguous US at 14,505 ft'
    },
    {
        id: 'cascade-range-wa',
        name: 'Cascade Range (Washington)',
        latitude: 47.5000,
        longitude: -121.0000,
        type: 'mountain',
        description: 'Volcanic chain with numerous glaciated peaks'
    },
    {
        id: 'cascade-range-or',
        name: 'Cascade Range (Oregon)',
        latitude: 44.0000,
        longitude: -121.7500,
        type: 'mountain',
        description: 'Oregon Cascades including Three Sisters and Crater Lake'
    },
    {
        id: 'appalachian-smokies',
        name: 'Great Smoky Mountains',
        latitude: 35.6532,
        longitude: -83.5070,
        type: 'mountain',
        description: 'Mist-shrouded peaks on TN-NC border; most visited national park'
    },
    {
        id: 'appalachian-blue-ridge',
        name: 'Blue Ridge Mountains',
        latitude: 36.5000,
        longitude: -81.0000,
        type: 'mountain',
        description: 'Eastern front of Appalachians; distinctive blue haze'
    },
    {
        id: 'appalachian-shenandoah',
        name: 'Shenandoah Valley',
        latitude: 38.5000,
        longitude: -78.8500,
        type: 'mountain',
        description: 'Virginia valley between Blue Ridge and Allegheny ranges'
    },
    {
        id: 'appalachian-white-mtns',
        name: 'White Mountains',
        latitude: 44.2706,
        longitude: -71.3033,
        type: 'mountain',
        description: 'New Hampshire peaks including Mt Washington; fall colors spectacular'
    },
    {
        id: 'appalachian-green-mtns',
        name: 'Green Mountains',
        latitude: 44.0000,
        longitude: -72.8000,
        type: 'mountain',
        description: 'Vermont range; rolling forested peaks'
    },
    {
        id: 'appalachian-adirondacks',
        name: 'Adirondack Mountains',
        latitude: 44.1127,
        longitude: -73.9212,
        type: 'mountain',
        description: 'New York wilderness with lakes and high peaks'
    },
    {
        id: 'appalachian-catskills',
        name: 'Catskill Mountains',
        latitude: 42.0000,
        longitude: -74.3500,
        type: 'mountain',
        description: 'New York mountains north of NYC; forested ridges'
    },
    {
        id: 'grand-tetons',
        name: 'Grand Teton',
        latitude: 43.7904,
        longitude: -110.6818,
        type: 'mountain',
        description: 'Dramatic jagged peaks rising sharply from Jackson Hole valley'
    },
    {
        id: 'wind-river-range',
        name: 'Wind River Range',
        latitude: 43.1833,
        longitude: -109.6500,
        type: 'mountain',
        description: 'Remote Wyoming range with glaciers and alpine lakes'
    },
    {
        id: 'bighorn-mountains',
        name: 'Bighorn Mountains',
        latitude: 44.3833,
        longitude: -107.1667,
        type: 'mountain',
        description: 'Wyoming range rising from Great Plains'
    },
    {
        id: 'wasatch-range',
        name: 'Wasatch Range',
        latitude: 40.6500,
        longitude: -111.5000,
        type: 'mountain',
        description: 'Utah mountains east of Salt Lake City; dramatic escarpment'
    },
    {
        id: 'uinta-mountains',
        name: 'Uinta Mountains',
        latitude: 40.7500,
        longitude: -110.5000,
        type: 'mountain',
        description: 'East-west trending range in Utah; unusual orientation'
    },
    {
        id: 'san-juan-mountains',
        name: 'San Juan Mountains',
        latitude: 37.8167,
        longitude: -107.6667,
        type: 'mountain',
        description: 'Rugged Colorado range with mining history; colorful peaks'
    },
    {
        id: 'sangre-de-cristo',
        name: 'Sangre de Cristo Mountains',
        latitude: 37.5000,
        longitude: -105.5000,
        type: 'mountain',
        description: 'Southern Rocky range in Colorado/New Mexico'
    },
    {
        id: 'sandia-mountains',
        name: 'Sandia Mountains',
        latitude: 35.2100,
        longitude: -106.4450,
        type: 'mountain',
        description: 'Dramatic granite face east of Albuquerque; pink at sunset'
    },
    {
        id: 'olympic-mountains',
        name: 'Olympic Mountains',
        latitude: 47.8000,
        longitude: -123.7000,
        type: 'mountain',
        description: 'Isolated Washington range with glaciers and rainforest'
    },
    {
        id: 'sawtooth-range',
        name: 'Sawtooth Range',
        latitude: 44.0000,
        longitude: -114.9167,
        type: 'mountain',
        description: 'Idaho\'s jagged granite peaks; alpine lakes'
    },
    {
        id: 'bitterroot-range',
        name: 'Bitterroot Range',
        latitude: 46.0000,
        longitude: -114.5000,
        type: 'mountain',
        description: 'Idaho-Montana border range; rugged wilderness'
    },
    {
        id: 'glacier-national-park',
        name: 'Glacier National Park',
        latitude: 48.7596,
        longitude: -113.7870,
        type: 'mountain',
        description: 'Montana\'s crown; glacial valleys and alpine lakes'
    },
    {
        id: 'pikes-peak',
        name: 'Pikes Peak',
        latitude: 38.8409,
        longitude: -105.0423,
        type: 'mountain',
        description: 'Famous Colorado peak visible from Great Plains'
    },
    {
        id: 'longs-peak',
        name: 'Longs Peak',
        latitude: 40.2550,
        longitude: -105.6151,
        type: 'mountain',
        description: 'Rocky Mountain National Park highpoint; flat summit'
    },
    {
        id: 'denali',
        name: 'Denali',
        latitude: 63.0692,
        longitude: -151.0070,
        type: 'mountain',
        description: 'Highest peak in North America at 20,310 ft; Alaska'
    },
    {
        id: 'mauna-kea',
        name: 'Mauna Kea',
        latitude: 19.8207,
        longitude: -155.4680,
        type: 'mountain',
        description: 'Hawaii\'s highest; observatories on summit often above clouds'
    },

    // ============================================
    // CANYONS & GEOLOGICAL FEATURES (30)
    // ============================================
    {
        id: 'grand-canyon',
        name: 'Grand Canyon',
        latitude: 36.0544,
        longitude: -112.1401,
        type: 'canyon',
        description: 'Mile-deep canyon carved by Colorado River; 277 miles long'
    },
    {
        id: 'bryce-canyon',
        name: 'Bryce Canyon',
        latitude: 37.5930,
        longitude: -112.1871,
        type: 'canyon',
        description: 'Distinctive red rock hoodoos and amphitheaters'
    },
    {
        id: 'zion-canyon',
        name: 'Zion Canyon',
        latitude: 37.2982,
        longitude: -113.0263,
        type: 'canyon',
        description: 'Deep red and tan sandstone canyon in Utah'
    },
    {
        id: 'monument-valley',
        name: 'Monument Valley',
        latitude: 36.9980,
        longitude: -110.0985,
        type: 'geological',
        description: 'Iconic red sandstone buttes on Arizona-Utah border'
    },
    {
        id: 'arches',
        name: 'Arches National Park',
        latitude: 38.7331,
        longitude: -109.5925,
        type: 'geological',
        description: 'Over 2,000 natural stone arches; red rock formations'
    },
    {
        id: 'canyonlands',
        name: 'Canyonlands',
        latitude: 38.3269,
        longitude: -109.8783,
        type: 'canyon',
        description: 'Vast canyon wilderness carved by Colorado and Green rivers'
    },
    {
        id: 'mesa-verde',
        name: 'Mesa Verde',
        latitude: 37.2309,
        longitude: -108.4618,
        type: 'geological',
        description: 'Green mesa with ancient cliff dwellings'
    },
    {
        id: 'capitol-reef',
        name: 'Capitol Reef',
        latitude: 38.2000,
        longitude: -111.1667,
        type: 'geological',
        description: 'Waterpocket Fold; colorful Navajo sandstone'
    },
    {
        id: 'crater-lake',
        name: 'Crater Lake',
        latitude: 42.8684,
        longitude: -122.1685,
        type: 'geological',
        description: 'Deep blue volcanic crater lake; deepest in US'
    },
    {
        id: 'death-valley',
        name: 'Death Valley',
        latitude: 36.5054,
        longitude: -117.0794,
        type: 'desert',
        description: 'Below-sea-level desert basin; salt flats and badlands'
    },
    {
        id: 'yellowstone',
        name: 'Yellowstone',
        latitude: 44.4280,
        longitude: -110.5885,
        type: 'geological',
        description: 'Volcanic caldera with geothermal features; distinctive terrain'
    },
    {
        id: 'badlands-sd',
        name: 'Badlands',
        latitude: 43.8554,
        longitude: -102.3397,
        type: 'geological',
        description: 'Eroded buttes and pinnacles in South Dakota prairie'
    },
    {
        id: 'theodore-roosevelt-np',
        name: 'Theodore Roosevelt National Park',
        latitude: 46.9790,
        longitude: -103.5387,
        type: 'geological',
        description: 'North Dakota badlands; colorful striped buttes'
    },
    {
        id: 'painted-desert',
        name: 'Painted Desert',
        latitude: 35.0653,
        longitude: -109.7870,
        type: 'desert',
        description: 'Colorful badlands in Arizona; bands of red, orange, pink'
    },
    {
        id: 'petrified-forest',
        name: 'Petrified Forest',
        latitude: 34.9100,
        longitude: -109.8068,
        type: 'geological',
        description: 'Ancient petrified logs scattered across desert'
    },
    {
        id: 'meteor-crater',
        name: 'Meteor Crater',
        latitude: 35.0275,
        longitude: -111.0228,
        type: 'geological',
        description: 'Well-preserved impact crater nearly mile wide'
    },
    {
        id: 'devils-tower',
        name: 'Devils Tower',
        latitude: 44.5902,
        longitude: -104.7146,
        type: 'geological',
        description: 'Volcanic rock tower rising 867 ft from Wyoming prairie'
    },
    {
        id: 'ship-rock',
        name: 'Shiprock',
        latitude: 36.6875,
        longitude: -108.8367,
        type: 'geological',
        description: 'Dramatic volcanic plug rising from New Mexico desert'
    },
    {
        id: 'carlsbad-caverns',
        name: 'Carlsbad Caverns',
        latitude: 32.1479,
        longitude: -104.5567,
        type: 'geological',
        description: 'Surface above vast cave system; Guadalupe Mountains'
    },
    {
        id: 'white-sands',
        name: 'White Sands',
        latitude: 32.7872,
        longitude: -106.3257,
        type: 'desert',
        description: 'Brilliant white gypsum dune field in New Mexico'
    },
    {
        id: 'big-bend',
        name: 'Big Bend',
        latitude: 29.2500,
        longitude: -103.2500,
        type: 'canyon',
        description: 'Rio Grande canyons and Chisos Mountains; remote Texas'
    },
    {
        id: 'palo-duro-canyon',
        name: 'Palo Duro Canyon',
        latitude: 34.9370,
        longitude: -101.6703,
        type: 'canyon',
        description: 'Second largest US canyon; Texas Panhandle'
    },
    {
        id: 'joshua-tree',
        name: 'Joshua Tree',
        latitude: 33.8734,
        longitude: -115.9010,
        type: 'desert',
        description: 'Where Mojave and Colorado deserts meet; iconic trees and boulders'
    },
    {
        id: 'mojave-desert',
        name: 'Mojave Desert',
        latitude: 35.0110,
        longitude: -115.4734,
        type: 'desert',
        description: 'High desert between LA and Las Vegas; sparse vegetation'
    },
    {
        id: 'sonoran-desert',
        name: 'Sonoran Desert',
        latitude: 32.2500,
        longitude: -111.0000,
        type: 'desert',
        description: 'Arizona desert with saguaro cacti; distinctive landscape'
    },
    {
        id: 'great-basin',
        name: 'Great Basin',
        latitude: 39.0000,
        longitude: -117.0000,
        type: 'desert',
        description: 'Vast Nevada basin between mountain ranges'
    },
    {
        id: 'bonneville-salt-flats',
        name: 'Bonneville Salt Flats',
        latitude: 40.7579,
        longitude: -113.8942,
        type: 'geological',
        description: 'Brilliant white salt flat in Utah; land speed record site'
    },
    {
        id: 'garden-of-the-gods',
        name: 'Garden of the Gods',
        latitude: 38.8739,
        longitude: -104.8863,
        type: 'geological',
        description: 'Red rock formations near Colorado Springs'
    },
    {
        id: 'sedona-red-rocks',
        name: 'Sedona Red Rocks',
        latitude: 34.8697,
        longitude: -111.7610,
        type: 'geological',
        description: 'Dramatic red sandstone formations in Verde Valley'
    },
    {
        id: 'chiricahua',
        name: 'Chiricahua',
        latitude: 32.0131,
        longitude: -109.3425,
        type: 'geological',
        description: 'Sea of rhyolite spires in Arizona; volcanic rock columns'
    },

    // ============================================
    // LAKES & WATER FEATURES (35)
    // ============================================
    {
        id: 'lake-superior',
        name: 'Lake Superior',
        latitude: 47.7000,
        longitude: -87.5000,
        type: 'lake',
        description: 'Largest Great Lake; looks like inland sea from altitude'
    },
    {
        id: 'lake-michigan',
        name: 'Lake Michigan',
        latitude: 43.6167,
        longitude: -87.0000,
        type: 'lake',
        description: 'Great Lake bordering Chicago; distinctive shoreline'
    },
    {
        id: 'lake-erie',
        name: 'Lake Erie',
        latitude: 42.2000,
        longitude: -81.2000,
        type: 'lake',
        description: 'Shallowest Great Lake; borders Cleveland and Buffalo'
    },
    {
        id: 'lake-ontario',
        name: 'Lake Ontario',
        latitude: 43.6500,
        longitude: -77.8500,
        type: 'lake',
        description: 'Easternmost Great Lake; gateway to St Lawrence'
    },
    {
        id: 'lake-huron',
        name: 'Lake Huron',
        latitude: 44.8000,
        longitude: -82.4167,
        type: 'lake',
        description: 'Great Lake with distinctive Georgian Bay'
    },
    {
        id: 'great-salt-lake',
        name: 'Great Salt Lake',
        latitude: 41.0000,
        longitude: -112.5000,
        type: 'lake',
        description: 'Largest saltwater lake in Western Hemisphere; pinkish hue'
    },
    {
        id: 'lake-tahoe',
        name: 'Lake Tahoe',
        latitude: 39.0968,
        longitude: -120.0324,
        type: 'lake',
        description: 'Deep alpine lake on California-Nevada border; vivid blue'
    },
    {
        id: 'lake-mead',
        name: 'Lake Mead',
        latitude: 36.1456,
        longitude: -114.3903,
        type: 'lake',
        description: 'Large reservoir near Las Vegas; Hoover Dam visible'
    },
    {
        id: 'lake-powell',
        name: 'Lake Powell',
        latitude: 37.0683,
        longitude: -111.2433,
        type: 'lake',
        description: 'Reservoir with red rock canyons; Glen Canyon Dam'
    },
    {
        id: 'mono-lake',
        name: 'Mono Lake',
        latitude: 38.0000,
        longitude: -119.0000,
        type: 'lake',
        description: 'Ancient saline lake with tufa towers; east of Yosemite'
    },
    {
        id: 'lake-champlain',
        name: 'Lake Champlain',
        latitude: 44.5333,
        longitude: -73.3333,
        type: 'lake',
        description: 'Long narrow lake between Vermont and New York'
    },
    {
        id: 'finger-lakes',
        name: 'Finger Lakes',
        latitude: 42.6500,
        longitude: -76.9000,
        type: 'lake',
        description: 'Series of long narrow glacial lakes in New York'
    },
    {
        id: 'lake-okeechobee',
        name: 'Lake Okeechobee',
        latitude: 26.9500,
        longitude: -80.8000,
        type: 'lake',
        description: 'Large shallow Florida lake; Everglades headwaters'
    },
    {
        id: 'lake-pontchartrain',
        name: 'Lake Pontchartrain',
        latitude: 30.2000,
        longitude: -90.1000,
        type: 'lake',
        description: 'Large brackish lake north of New Orleans; causeway visible'
    },
    {
        id: 'flathead-lake',
        name: 'Flathead Lake',
        latitude: 47.8833,
        longitude: -114.1167,
        type: 'lake',
        description: 'Largest natural freshwater lake west of Mississippi'
    },
    {
        id: 'lake-of-the-ozarks',
        name: 'Lake of the Ozarks',
        latitude: 38.1167,
        longitude: -92.6833,
        type: 'lake',
        description: 'Large serpentine reservoir in Missouri'
    },
    {
        id: 'lake-havasu',
        name: 'Lake Havasu',
        latitude: 34.4731,
        longitude: -114.3225,
        type: 'lake',
        description: 'Colorado River reservoir on Arizona-California border'
    },
    {
        id: 'salton-sea',
        name: 'Salton Sea',
        latitude: 33.3000,
        longitude: -115.8333,
        type: 'lake',
        description: 'Accidental lake in California desert; below sea level'
    },
    {
        id: 'lake-sakakawea',
        name: 'Lake Sakakawea',
        latitude: 47.6500,
        longitude: -102.5000,
        type: 'lake',
        description: 'Large Missouri River reservoir in North Dakota'
    },
    {
        id: 'lake-chelan',
        name: 'Lake Chelan',
        latitude: 47.9000,
        longitude: -120.2000,
        type: 'lake',
        description: 'Deep glacial lake in Washington Cascades'
    },
    {
        id: 'kentucky-lake',
        name: 'Kentucky Lake',
        latitude: 36.8167,
        longitude: -88.0667,
        type: 'lake',
        description: 'One of largest artificial lakes in eastern US'
    },
    {
        id: 'lake-lanier',
        name: 'Lake Lanier',
        latitude: 34.2500,
        longitude: -83.9667,
        type: 'lake',
        description: 'Large reservoir north of Atlanta'
    },
    {
        id: 'chesapeake-bay',
        name: 'Chesapeake Bay',
        latitude: 37.8000,
        longitude: -76.1000,
        type: 'coastal',
        description: 'Largest estuary in US; distinctive shape from air'
    },
    {
        id: 'san-francisco-bay',
        name: 'San Francisco Bay',
        latitude: 37.6000,
        longitude: -122.1500,
        type: 'coastal',
        description: 'Iconic bay with Golden Gate strait; bridges visible'
    },
    {
        id: 'puget-sound',
        name: 'Puget Sound',
        latitude: 47.5000,
        longitude: -122.5000,
        type: 'coastal',
        description: 'Complex inlet system near Seattle with island chains'
    },
    {
        id: 'long-island-sound',
        name: 'Long Island Sound',
        latitude: 41.1000,
        longitude: -72.9000,
        type: 'coastal',
        description: 'Body of water between Connecticut and Long Island'
    },
    {
        id: 'delaware-bay',
        name: 'Delaware Bay',
        latitude: 39.0000,
        longitude: -75.1000,
        type: 'coastal',
        description: 'Large estuary between Delaware and New Jersey'
    },
    {
        id: 'tampa-bay',
        name: 'Tampa Bay',
        latitude: 27.7500,
        longitude: -82.5500,
        type: 'coastal',
        description: 'Large natural harbor on Florida Gulf Coast'
    },
    {
        id: 'mobile-bay',
        name: 'Mobile Bay',
        latitude: 30.4500,
        longitude: -88.0000,
        type: 'coastal',
        description: 'Alabama\'s Gulf Coast estuary'
    },
    {
        id: 'galveston-bay',
        name: 'Galveston Bay',
        latitude: 29.5000,
        longitude: -94.8500,
        type: 'coastal',
        description: 'Large Texas bay near Houston'
    },
    {
        id: 'monterey-bay',
        name: 'Monterey Bay',
        latitude: 36.8000,
        longitude: -121.9000,
        type: 'coastal',
        description: 'California bay with deep submarine canyon'
    },
    {
        id: 'narragansett-bay',
        name: 'Narragansett Bay',
        latitude: 41.6167,
        longitude: -71.3667,
        type: 'coastal',
        description: 'Rhode Island bay with numerous islands'
    },
    {
        id: 'boston-harbor',
        name: 'Boston Harbor',
        latitude: 42.3333,
        longitude: -70.9667,
        type: 'coastal',
        description: 'Historic harbor with island archipelago'
    },
    {
        id: 'columbia-river-gorge',
        name: 'Columbia River Gorge',
        latitude: 45.7000,
        longitude: -121.8000,
        type: 'river',
        description: 'Dramatic canyon through Cascades; Oregon-Washington border'
    },
    {
        id: 'niagara-falls',
        name: 'Niagara Falls',
        latitude: 43.0828,
        longitude: -79.0742,
        type: 'river',
        description: 'Massive waterfalls on US-Canada border; mist visible from air'
    },

    // ============================================
    // MAJOR RIVERS (20)
    // ============================================
    {
        id: 'mississippi-delta',
        name: 'Mississippi River Delta',
        latitude: 29.2000,
        longitude: -89.2500,
        type: 'river',
        description: 'Bird-foot delta where Mississippi meets Gulf'
    },
    {
        id: 'mississippi-upper',
        name: 'Mississippi River (Upper)',
        latitude: 41.5000,
        longitude: -90.5000,
        type: 'river',
        description: 'Wide river with bluffs through Minnesota to St Louis'
    },
    {
        id: 'mississippi-lower',
        name: 'Mississippi River (Lower)',
        latitude: 32.3000,
        longitude: -90.9000,
        type: 'river',
        description: 'Meandering river through Deep South; oxbow lakes'
    },
    {
        id: 'missouri-river',
        name: 'Missouri River',
        latitude: 41.2500,
        longitude: -95.9000,
        type: 'river',
        description: 'Longest river in US; joins Mississippi near St Louis'
    },
    {
        id: 'ohio-river',
        name: 'Ohio River',
        latitude: 38.7000,
        longitude: -85.0000,
        type: 'river',
        description: 'Major tributary; border of multiple states'
    },
    {
        id: 'colorado-river-az',
        name: 'Colorado River (Arizona)',
        latitude: 36.0000,
        longitude: -112.0000,
        type: 'river',
        description: 'River carving through Grand Canyon'
    },
    {
        id: 'colorado-river-lower',
        name: 'Colorado River (Lower)',
        latitude: 33.5000,
        longitude: -114.5000,
        type: 'river',
        description: 'River forming Arizona-California border'
    },
    {
        id: 'columbia-river',
        name: 'Columbia River',
        latitude: 46.2500,
        longitude: -119.2500,
        type: 'river',
        description: 'Pacific Northwest\'s largest river; dramatic gorge'
    },
    {
        id: 'snake-river',
        name: 'Snake River',
        latitude: 43.6500,
        longitude: -116.2000,
        type: 'river',
        description: 'Major Columbia tributary through Idaho'
    },
    {
        id: 'rio-grande',
        name: 'Rio Grande',
        latitude: 29.7500,
        longitude: -104.4000,
        type: 'river',
        description: 'US-Mexico border river; Big Bend region'
    },
    {
        id: 'hudson-river',
        name: 'Hudson River',
        latitude: 41.5000,
        longitude: -73.9500,
        type: 'river',
        description: 'River flowing south to New York Harbor'
    },
    {
        id: 'potomac-river',
        name: 'Potomac River',
        latitude: 38.9000,
        longitude: -77.0500,
        type: 'river',
        description: 'River flowing past Washington DC to Chesapeake'
    },
    {
        id: 'st-lawrence-river',
        name: 'St. Lawrence River',
        latitude: 44.5000,
        longitude: -75.5000,
        type: 'river',
        description: 'Great Lakes outlet with Thousand Islands'
    },
    {
        id: 'sacramento-river',
        name: 'Sacramento River',
        latitude: 38.5833,
        longitude: -121.5000,
        type: 'river',
        description: 'California\'s largest river through Central Valley'
    },
    {
        id: 'arkansas-river',
        name: 'Arkansas River',
        latitude: 38.6500,
        longitude: -99.5000,
        type: 'river',
        description: 'Major tributary flowing from Colorado to Mississippi'
    },
    {
        id: 'tennessee-river',
        name: 'Tennessee River',
        latitude: 35.0000,
        longitude: -88.0000,
        type: 'river',
        description: 'Major river with TVA dams through Tennessee Valley'
    },
    {
        id: 'platte-river',
        name: 'Platte River',
        latitude: 41.0000,
        longitude: -100.0000,
        type: 'river',
        description: 'Wide shallow river across Nebraska plains'
    },
    {
        id: 'yellowstone-river',
        name: 'Yellowstone River',
        latitude: 45.8000,
        longitude: -108.5000,
        type: 'river',
        description: 'Longest free-flowing river in lower 48'
    },
    {
        id: 'green-river',
        name: 'Green River',
        latitude: 38.9000,
        longitude: -110.1500,
        type: 'river',
        description: 'Colorado tributary through Utah canyonlands'
    },
    {
        id: 'susquehanna-river',
        name: 'Susquehanna River',
        latitude: 40.2500,
        longitude: -76.8500,
        type: 'river',
        description: 'Longest river on East Coast; feeds Chesapeake'
    },

    // ============================================
    // COASTAL FEATURES (20)
    // ============================================
    {
        id: 'outer-banks',
        name: 'Outer Banks',
        latitude: 35.5585,
        longitude: -75.4665,
        type: 'coastal',
        description: 'North Carolina barrier islands; Cape Hatteras'
    },
    {
        id: 'cape-cod',
        name: 'Cape Cod',
        latitude: 41.6688,
        longitude: -70.2962,
        type: 'coastal',
        description: 'Distinctive hook-shaped Massachusetts peninsula'
    },
    {
        id: 'florida-keys',
        name: 'Florida Keys',
        latitude: 24.6649,
        longitude: -81.5475,
        type: 'island',
        description: 'Island chain curving into Gulf; Overseas Highway visible'
    },
    {
        id: 'big-sur-coast',
        name: 'Big Sur Coast',
        latitude: 36.2000,
        longitude: -121.8000,
        type: 'coastal',
        description: 'Dramatic California cliffs meeting Pacific'
    },
    {
        id: 'olympic-coast',
        name: 'Olympic Coast',
        latitude: 47.9000,
        longitude: -124.6000,
        type: 'coastal',
        description: 'Rugged Washington coastline with sea stacks'
    },
    {
        id: 'oregon-coast',
        name: 'Oregon Coast',
        latitude: 44.6500,
        longitude: -124.0500,
        type: 'coastal',
        description: 'Dramatic cliffs and beaches along Pacific'
    },
    {
        id: 'mendocino-coast',
        name: 'Mendocino Coast',
        latitude: 39.3077,
        longitude: -123.7994,
        type: 'coastal',
        description: 'Northern California\'s rugged coastline'
    },
    {
        id: 'point-reyes',
        name: 'Point Reyes',
        latitude: 38.0400,
        longitude: -122.9983,
        type: 'coastal',
        description: 'Peninsula jutting into Pacific north of SF'
    },
    {
        id: 'acadia-coast',
        name: 'Acadia Coast',
        latitude: 44.3500,
        longitude: -68.2000,
        type: 'coastal',
        description: 'Rocky Maine coastline with islands'
    },
    {
        id: 'jersey-shore',
        name: 'Jersey Shore',
        latitude: 39.9000,
        longitude: -74.0500,
        type: 'coastal',
        description: 'New Jersey barrier beach coastline'
    },
    {
        id: 'hamptons',
        name: 'The Hamptons',
        latitude: 40.9500,
        longitude: -72.3000,
        type: 'coastal',
        description: 'Long Island\'s eastern beaches and bays'
    },
    {
        id: 'padre-island',
        name: 'Padre Island',
        latitude: 26.7500,
        longitude: -97.4000,
        type: 'island',
        description: 'World\'s longest barrier island; Texas Gulf'
    },
    {
        id: 'sea-islands',
        name: 'Sea Islands',
        latitude: 32.0000,
        longitude: -80.9000,
        type: 'island',
        description: 'Georgia and South Carolina barrier islands'
    },
    {
        id: 'sanibel-island',
        name: 'Sanibel Island',
        latitude: 26.4500,
        longitude: -82.1000,
        type: 'island',
        description: 'Florida Gulf Coast island; distinctive shape'
    },
    {
        id: 'catalina-island',
        name: 'Catalina Island',
        latitude: 33.3869,
        longitude: -118.4160,
        type: 'island',
        description: 'California island visible from LA coast'
    },
    {
        id: 'channel-islands',
        name: 'Channel Islands',
        latitude: 34.0000,
        longitude: -119.7500,
        type: 'island',
        description: 'California island chain off Santa Barbara'
    },
    {
        id: 'san-juan-islands',
        name: 'San Juan Islands',
        latitude: 48.5500,
        longitude: -123.0000,
        type: 'island',
        description: 'Washington island archipelago near Canada'
    },
    {
        id: 'apostle-islands',
        name: 'Apostle Islands',
        latitude: 46.9500,
        longitude: -90.7000,
        type: 'island',
        description: 'Lake Superior island chain off Wisconsin'
    },
    {
        id: 'everglades',
        name: 'Everglades',
        latitude: 25.2866,
        longitude: -80.8987,
        type: 'coastal',
        description: 'River of grass; vast wetland at Florida\'s tip'
    },
    {
        id: 'ten-thousand-islands',
        name: 'Ten Thousand Islands',
        latitude: 25.8500,
        longitude: -81.5500,
        type: 'coastal',
        description: 'Mangrove island maze on Florida Gulf Coast'
    },

    // ============================================
    // HAWAIIAN ISLANDS (8)
    // ============================================
    {
        id: 'hawaii-big-island',
        name: 'Big Island of Hawaii',
        latitude: 19.5667,
        longitude: -155.5000,
        type: 'island',
        description: 'Largest Hawaiian island; active volcanoes Kilauea and Mauna Loa'
    },
    {
        id: 'maui',
        name: 'Maui',
        latitude: 20.7984,
        longitude: -156.3319,
        type: 'island',
        description: 'Valley isle with Haleakala crater'
    },
    {
        id: 'oahu',
        name: 'Oahu',
        latitude: 21.4389,
        longitude: -158.0001,
        type: 'island',
        description: 'Home to Honolulu; Diamond Head crater visible'
    },
    {
        id: 'kauai',
        name: 'Kauai',
        latitude: 22.0964,
        longitude: -159.5261,
        type: 'island',
        description: 'Garden isle; dramatic Na Pali coast cliffs'
    },
    {
        id: 'molokai',
        name: 'Molokai',
        latitude: 21.1333,
        longitude: -157.0167,
        type: 'island',
        description: 'World\'s highest sea cliffs on north shore'
    },
    {
        id: 'lanai',
        name: 'Lanai',
        latitude: 20.8333,
        longitude: -156.9167,
        type: 'island',
        description: 'Pineapple isle between Maui and Molokai'
    },
    {
        id: 'diamond-head',
        name: 'Diamond Head',
        latitude: 21.2614,
        longitude: -157.8058,
        type: 'geological',
        description: 'Iconic volcanic crater overlooking Waikiki'
    },
    {
        id: 'haleakala',
        name: 'Haleakala',
        latitude: 20.7097,
        longitude: -156.1731,
        type: 'geological',
        description: 'Massive shield volcano crater on Maui'
    },

    // ============================================
    // MAJOR CITY SKYLINES (50)
    // ============================================
    {
        id: 'nyc',
        name: 'New York City',
        latitude: 40.7128,
        longitude: -74.0060,
        type: 'city',
        description: 'Manhattan skyline with Empire State and One WTC; dense urban grid'
    },
    {
        id: 'chicago',
        name: 'Chicago',
        latitude: 41.8781,
        longitude: -87.6298,
        type: 'city',
        description: 'Iconic lakefront skyline with Willis Tower; grid meets Lake Michigan'
    },
    {
        id: 'los-angeles',
        name: 'Los Angeles',
        latitude: 34.0522,
        longitude: -118.2437,
        type: 'city',
        description: 'Sprawling metro from mountains to coast; downtown cluster visible'
    },
    {
        id: 'san-francisco',
        name: 'San Francisco',
        latitude: 37.7749,
        longitude: -122.4194,
        type: 'city',
        description: 'Compact city on peninsula; Golden Gate Bridge landmark'
    },
    {
        id: 'seattle',
        name: 'Seattle',
        latitude: 47.6062,
        longitude: -122.3321,
        type: 'city',
        description: 'Space Needle skyline between Puget Sound and Lake Washington'
    },
    {
        id: 'miami',
        name: 'Miami',
        latitude: 25.7617,
        longitude: -80.1918,
        type: 'city',
        description: 'Coastal skyline with beach strip; turquoise waters contrast'
    },
    {
        id: 'denver',
        name: 'Denver',
        latitude: 39.7392,
        longitude: -104.9903,
        type: 'city',
        description: 'Mile High City with Rocky Mountain backdrop'
    },
    {
        id: 'las-vegas',
        name: 'Las Vegas',
        latitude: 36.1699,
        longitude: -115.1398,
        type: 'city',
        description: 'Bright Strip visible in desert; spectacular at night'
    },
    {
        id: 'phoenix',
        name: 'Phoenix',
        latitude: 33.4484,
        longitude: -112.0740,
        type: 'city',
        description: 'Desert metropolis with mountain preserves; grid pattern'
    },
    {
        id: 'dallas',
        name: 'Dallas',
        latitude: 32.7767,
        longitude: -96.7970,
        type: 'city',
        description: 'Texas skyline with distinctive Reunion Tower'
    },
    {
        id: 'houston',
        name: 'Houston',
        latitude: 29.7604,
        longitude: -95.3698,
        type: 'city',
        description: 'Sprawling Texas city; multiple downtown clusters'
    },
    {
        id: 'boston',
        name: 'Boston',
        latitude: 42.3601,
        longitude: -71.0589,
        type: 'city',
        description: 'Historic harbor city; compact downtown on waterfront'
    },
    {
        id: 'washington-dc',
        name: 'Washington D.C.',
        latitude: 38.9072,
        longitude: -77.0369,
        type: 'city',
        description: 'National Mall, monuments, Potomac River; no skyscrapers'
    },
    {
        id: 'atlanta',
        name: 'Atlanta',
        latitude: 33.7490,
        longitude: -84.3880,
        type: 'city',
        description: 'Southern hub with modern skyline; sprawling suburbs'
    },
    {
        id: 'philadelphia',
        name: 'Philadelphia',
        latitude: 39.9526,
        longitude: -75.1652,
        type: 'city',
        description: 'Historic city skyline on Delaware River'
    },
    {
        id: 'minneapolis',
        name: 'Minneapolis',
        latitude: 44.9778,
        longitude: -93.2650,
        type: 'city',
        description: 'Twin Cities skyline with Chain of Lakes'
    },
    {
        id: 'detroit',
        name: 'Detroit',
        latitude: 42.3314,
        longitude: -83.0458,
        type: 'city',
        description: 'Renaissance Center on Detroit River; Canadian border'
    },
    {
        id: 'san-diego',
        name: 'San Diego',
        latitude: 32.7157,
        longitude: -117.1611,
        type: 'city',
        description: 'Coastal California city; bay and Coronado Bridge'
    },
    {
        id: 'new-orleans',
        name: 'New Orleans',
        latitude: 29.9511,
        longitude: -90.0715,
        type: 'city',
        description: 'Crescent City on Mississippi River; Lake Pontchartrain'
    },
    {
        id: 'salt-lake-city',
        name: 'Salt Lake City',
        latitude: 40.7608,
        longitude: -111.8910,
        type: 'city',
        description: 'Mountain-framed city near Great Salt Lake'
    },
    {
        id: 'portland-or',
        name: 'Portland (Oregon)',
        latitude: 45.5152,
        longitude: -122.6784,
        type: 'city',
        description: 'City on Willamette River with Mt Hood backdrop'
    },
    {
        id: 'portland-me',
        name: 'Portland (Maine)',
        latitude: 43.6591,
        longitude: -70.2568,
        type: 'city',
        description: 'Historic seaport on Casco Bay'
    },
    {
        id: 'austin',
        name: 'Austin',
        latitude: 30.2672,
        longitude: -97.7431,
        type: 'city',
        description: 'Texas capital on Colorado River; State Capitol dome'
    },
    {
        id: 'san-antonio',
        name: 'San Antonio',
        latitude: 29.4241,
        longitude: -98.4936,
        type: 'city',
        description: 'Historic Texas city; River Walk area visible'
    },
    {
        id: 'nashville',
        name: 'Nashville',
        latitude: 36.1627,
        longitude: -86.7816,
        type: 'city',
        description: 'Music City skyline on Cumberland River'
    },
    {
        id: 'charlotte',
        name: 'Charlotte',
        latitude: 35.2271,
        longitude: -80.8431,
        type: 'city',
        description: 'Banking center with modern skyline'
    },
    {
        id: 'indianapolis',
        name: 'Indianapolis',
        latitude: 39.7684,
        longitude: -86.1581,
        type: 'city',
        description: 'Circle City with Monument Circle visible'
    },
    {
        id: 'columbus',
        name: 'Columbus',
        latitude: 39.9612,
        longitude: -82.9988,
        type: 'city',
        description: 'Ohio capital with Scioto riverfront'
    },
    {
        id: 'kansas-city',
        name: 'Kansas City',
        latitude: 39.0997,
        longitude: -94.5786,
        type: 'city',
        description: 'City spanning Missouri-Kansas border'
    },
    {
        id: 'st-louis',
        name: 'St. Louis',
        latitude: 38.6270,
        longitude: -90.1994,
        type: 'city',
        description: 'Gateway Arch dominates riverfront skyline'
    },
    {
        id: 'pittsburgh',
        name: 'Pittsburgh',
        latitude: 40.4406,
        longitude: -79.9959,
        type: 'city',
        description: 'Three rivers confluence; distinctive Point'
    },
    {
        id: 'cincinnati',
        name: 'Cincinnati',
        latitude: 39.1031,
        longitude: -84.5120,
        type: 'city',
        description: 'Ohio River city with distinctive hills'
    },
    {
        id: 'cleveland',
        name: 'Cleveland',
        latitude: 41.4993,
        longitude: -81.6944,
        type: 'city',
        description: 'Lake Erie waterfront; Rock Hall visible'
    },
    {
        id: 'milwaukee',
        name: 'Milwaukee',
        latitude: 43.0389,
        longitude: -87.9065,
        type: 'city',
        description: 'Lake Michigan city; Calatrava art museum'
    },
    {
        id: 'baltimore',
        name: 'Baltimore',
        latitude: 39.2904,
        longitude: -76.6122,
        type: 'city',
        description: 'Inner Harbor city on Chesapeake Bay'
    },
    {
        id: 'tampa',
        name: 'Tampa',
        latitude: 27.9506,
        longitude: -82.4572,
        type: 'city',
        description: 'Florida Gulf Coast city with bay bridges'
    },
    {
        id: 'orlando',
        name: 'Orlando',
        latitude: 28.5383,
        longitude: -81.3792,
        type: 'city',
        description: 'Theme park capital; lakes throughout metro'
    },
    {
        id: 'jacksonville',
        name: 'Jacksonville',
        latitude: 30.3322,
        longitude: -81.6557,
        type: 'city',
        description: 'Largest city by area; St Johns River'
    },
    {
        id: 'sacramento',
        name: 'Sacramento',
        latitude: 38.5816,
        longitude: -121.4944,
        type: 'city',
        description: 'California capital at river confluence'
    },
    {
        id: 'san-jose',
        name: 'San Jose',
        latitude: 37.3382,
        longitude: -121.8863,
        type: 'city',
        description: 'Silicon Valley hub south of SF Bay'
    },
    {
        id: 'oakland',
        name: 'Oakland',
        latitude: 37.8044,
        longitude: -122.2712,
        type: 'city',
        description: 'East Bay city with port and Bay Bridge'
    },
    {
        id: 'honolulu',
        name: 'Honolulu',
        latitude: 21.3069,
        longitude: -157.8583,
        type: 'city',
        description: 'Waikiki high-rises against Diamond Head'
    },
    {
        id: 'anchorage',
        name: 'Anchorage',
        latitude: 61.2181,
        longitude: -149.9003,
        type: 'city',
        description: 'Alaska\'s largest city; mountain backdrop'
    },
    {
        id: 'albuquerque',
        name: 'Albuquerque',
        latitude: 35.0844,
        longitude: -106.6504,
        type: 'city',
        description: 'Rio Grande valley with Sandia Mountains'
    },
    {
        id: 'tucson',
        name: 'Tucson',
        latitude: 32.2226,
        longitude: -110.9747,
        type: 'city',
        description: 'Desert city surrounded by mountain ranges'
    },
    {
        id: 'reno',
        name: 'Reno',
        latitude: 39.5296,
        longitude: -119.8138,
        type: 'city',
        description: 'Biggest Little City near Tahoe and Sierra'
    },
    {
        id: 'memphis',
        name: 'Memphis',
        latitude: 35.1495,
        longitude: -90.0490,
        type: 'city',
        description: 'Mississippi River city; Pyramid arena'
    },
    {
        id: 'louisville',
        name: 'Louisville',
        latitude: 38.2527,
        longitude: -85.7585,
        type: 'city',
        description: 'Ohio River city; bridges to Indiana'
    },
    {
        id: 'buffalo',
        name: 'Buffalo',
        latitude: 42.8864,
        longitude: -78.8784,
        type: 'city',
        description: 'Lake Erie city near Niagara Falls'
    },
    {
        id: 'providence',
        name: 'Providence',
        latitude: 41.8240,
        longitude: -71.4128,
        type: 'city',
        description: 'Rhode Island capital on Narragansett Bay'
    }
];
