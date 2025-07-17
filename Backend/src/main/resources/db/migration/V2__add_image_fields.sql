-- Add fields for local image support and reference URLs
ALTER TABLE games ADD COLUMN cover_image_filename VARCHAR(255);
ALTER TABLE games ADD COLUMN reference_url VARCHAR(500);

-- Update existing games with local cover filenames
UPDATE games SET cover_image_filename = 'cyberpunk2077.jpg' WHERE title = 'Cyberpunk 2077';
UPDATE games SET cover_image_filename = 'thewitcher3.jpg' WHERE title = 'The Witcher 3: Wild Hunt';
UPDATE games SET cover_image_filename = 'reddeadredemption2.jpg' WHERE title = 'Red Dead Redemption 2';
UPDATE games SET cover_image_filename = 'eldenring.jpg' WHERE title = 'Elden Ring';
UPDATE games SET cover_image_filename = 'godofwarragnarok.jpg' WHERE title = 'God of War Ragnarök';
UPDATE games SET cover_image_filename = 'minecraft.jpg' WHERE title = 'Minecraft';
UPDATE games SET cover_image_filename = 'gta5.jpg' WHERE title = 'Grand Theft Auto V';
UPDATE games SET cover_image_filename = 'hollowknight.jpg' WHERE title = 'Hollow Knight';
UPDATE games SET cover_image_filename = 'persona5royal.jpg' WHERE title = 'Persona 5 Royal';
UPDATE games SET cover_image_filename = 'supermarioodyssey.jpg' WHERE title = 'Super Mario Odyssey';
UPDATE games SET cover_image_filename = 'sekiro.jpg' WHERE title = 'Sekiro: Shadows Die Twice';
UPDATE games SET cover_image_filename = 'stardewvalley.jpg' WHERE title = 'Stardew Valley';
UPDATE games SET cover_image_filename = 'ff7e.jpg' WHERE title = 'Final Fantasy VII Remake';
UPDATE games SET cover_image_filename = 'animalcrossing.jpg' WHERE title = 'Animal Crossing: New Horizons';
UPDATE games SET cover_image_filename = 'doometernal.jpg' WHERE title = 'DOOM Eternal';
UPDATE games SET cover_image_filename = 'hades.jpg' WHERE title = 'Hades';
UPDATE games SET cover_image_filename = 'celeste.jpg' WHERE title = 'Celeste';
UPDATE games SET cover_image_filename = 'residentevilvillage.jpg' WHERE title = 'Resident Evil Village';
UPDATE games SET cover_image_filename = 'spidermanmiles.jpg' WHERE title = 'Spider-Man: Miles Morales';

-- Add reference URLs for existing games
UPDATE games SET reference_url = 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/' WHERE title = 'Cyberpunk 2077';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/' WHERE title = 'The Witcher 3: Wild Hunt';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/' WHERE title = 'Red Dead Redemption 2';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/1245620/ELDEN_RING/' WHERE title = 'Elden Ring';
UPDATE games SET reference_url = 'https://www.playstation.com/en-us/games/god-of-war-ragnarok/' WHERE title = 'God of War Ragnarök';
UPDATE games SET reference_url = 'https://www.minecraft.net/' WHERE title = 'Minecraft';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/' WHERE title = 'Grand Theft Auto V';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/367520/Hollow_Knight/' WHERE title = 'Hollow Knight';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/1687950/Persona_5_Royal/' WHERE title = 'Persona 5 Royal';
UPDATE games SET reference_url = 'https://www.nintendo.com/store/products/super-mario-odyssey-switch/' WHERE title = 'Super Mario Odyssey';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition/' WHERE title = 'Sekiro: Shadows Die Twice';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/413150/Stardew_Valley/' WHERE title = 'Stardew Valley';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/1462040/FINAL_FANTASY_VII_REMAKE_INTERGRADE/' WHERE title = 'Final Fantasy VII Remake';
UPDATE games SET reference_url = 'https://www.nintendo.com/store/products/animal-crossing-new-horizons-switch/' WHERE title = 'Animal Crossing: New Horizons';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/782330/DOOM_Eternal/' WHERE title = 'DOOM Eternal';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/1145360/Hades/' WHERE title = 'Hades';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/504230/Celeste/' WHERE title = 'Celeste';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/1196590/Resident_Evil_Village/' WHERE title = 'Resident Evil Village';
UPDATE games SET reference_url = 'https://store.steampowered.com/app/1817190/Marvels_SpiderMan_Miles_Morales/' WHERE title = 'Spider-Man: Miles Morales'; 