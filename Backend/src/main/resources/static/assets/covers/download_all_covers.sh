#!/bin/bash
# Download all unique game cover images for seeded games
# This script downloads covers for all real games in the database

echo "Starting download of all game cover images..."

# Create covers directory if it doesn't exist
mkdir -p Backend/src/main/resources/static/assets/covers

# Change to the covers directory
cd Backend/src/main/resources/static/assets/covers

# --- Original featured games ---
echo "Downloading original featured games..."
curl -L -o cyberpunk2077.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg"
curl -L -o thewitcher3.jpg "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg"
curl -L -o reddeadredemption2.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg"
curl -L -o eldenring.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg"
curl -L -o godofwarragnarok.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg"
curl -L -o minecraft.jpg "https://cdn.akamai.steamstatic.com/steam/apps/322330/header.jpg"
curl -L -o gta5.jpg "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg"
curl -L -o fortnite.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg"
curl -L -o valorant.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1270790/header.jpg"
curl -L -o apexlegends.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg"

# --- Real games batch 1 (from V13 migration) ---
echo "Downloading real games batch 1..."
curl -L -o portal2.jpg "https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg"
curl -L -o lastofus1.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1888930/header.jpg"
curl -L -o leagueoflegends.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1270790/header.jpg"
curl -L -o monsterhunterworld.jpg "https://cdn.akamai.steamstatic.com/steam/apps/582010/header.jpg"
curl -L -o overwatch.jpg "https://cdn.akamai.steamstatic.com/steam/apps/235757/header.jpg"
curl -L -o civ6.jpg "https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg"
curl -L -o amongus.jpg "https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg"
curl -L -o cuphead.jpg "https://cdn.akamai.steamstatic.com/steam/apps/268910/header.jpg"
curl -L -o horizonzerodawn.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg"
curl -L -o forzahorizon5.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg"
curl -L -o terraria.jpg "https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg"
curl -L -o deadcells.jpg "https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg"
curl -L -o slaythespire.jpg "https://cdn.akamai.steamstatic.com/steam/apps/646570/header.jpg"
curl -L -o subnautica.jpg "https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg"
curl -L -o celesteclassic.jpg "https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg"
curl -L -o oriandtheblindforest.jpg "https://cdn.akamai.steamstatic.com/steam/apps/261570/header.jpg"
curl -L -o silksong.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1030300/header.jpg"
curl -L -o stellaris.jpg "https://cdn.akamai.steamstatic.com/steam/apps/281990/header.jpg"
curl -L -o firewatch.jpg "https://cdn.akamai.steamstatic.com/steam/apps/383870/header.jpg"
curl -L -o thewitness.jpg "https://cdn.akamai.steamstatic.com/steam/apps/210970/header.jpg"
curl -L -o darksouls3.jpg "https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg"
curl -L -o discoelysium.jpg "https://cdn.akamai.steamstatic.com/steam/apps/632470/header.jpg"
curl -L -o spiritfarer.jpg "https://cdn.akamai.steamstatic.com/steam/apps/972660/header.jpg"
curl -L -o nomanssky.jpg "https://cdn.akamai.steamstatic.com/steam/apps/275850/header.jpg"
curl -L -o hades2.jpg "https://cdn.akamai.steamstatic.com/steam/apps/1145350/header.jpg"
curl -L -o obradinn.jpg "https://cdn.akamai.steamstatic.com/steam/apps/653530/header.jpg"
curl -L -o outerwilds.jpg "https://cdn.akamai.steamstatic.com/steam/apps/753640/header.jpg"
curl -L -o riskofrain2.jpg "https://cdn.akamai.steamstatic.com/steam/apps/632360/header.jpg"

# Create a placeholder image for fallback
echo "Creating placeholder image..."
# Create a simple placeholder using ImageMagick if available, otherwise create a text file
if command -v convert &> /dev/null; then
    convert -size 300x400 xc:gray -gravity center -pointsize 20 -annotate 0 "No Image\nAvailable" placeholder.jpg
else
    echo "ImageMagick not found. Please create a placeholder.jpg file manually."
    echo "Placeholder image needed: 300x400 pixels, gray background with 'No Image Available' text"
fi

echo "Download complete!"
echo "Total images downloaded: $(ls -1 *.jpg 2>/dev/null | wc -l)"
echo ""
echo "Note: Some images may fail to download due to network restrictions."
echo "For failed downloads, you can:"
echo "1. Manually download the images from the URLs above"
echo "2. Use placeholder images for missing covers"
echo "3. The app will fallback to remote URLs if local images are missing" 