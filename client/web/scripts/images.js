const images = [
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/01.%20Cute_Evilness_by_Linda_M_Johansen_aka_Whoppiii.jpeg",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "Linda M Johansen aka Whoppiii",
    title: "Cute Evilness",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/02.%20Slickness_by_Eirik_yeah.jpg",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "Eirik yeah",
    title: "Slickness",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/04.%20Scruffy_Miss_by_Tagi.png",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "Tagi",
    title: "Scruffy Miss",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/08.%20Ultimate_Nerdfest_by_Rolf_Th_ger_Bergman_AKA_Insano.jpeg",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "Rolf Th ger Bergman AKA Insano",
    title: "Ultimate Nerdfest",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/11.%20mademoiselle%20by%20phae.jpg",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "phae",
    title: "Mademoiselle",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/12.%20CROWONTREE%20by%20crash.png",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "crash",
    title: "CROWONTREE",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/15.%20sunrise%20by%20ernie.png",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "ernie",
    title: "Sunrise",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/16.%20MRICECOOL%20by%20eha.jpg",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "eha",
    title: "MRICECOOL",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/18.%20RoadSide_Picnic_by_CoW-.png",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "CoW ",
    title: "RoadSide Picnic",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/19.%20Twi_Lek_by_Nora_Marie_Ask.jpg",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "Nora Marie Ask",
    title: "Twi Lek",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/20.%20Yes_we_have_no_bananas_by_Magnus_L_A_.jpg",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "Magnus L A ",
    title: "Yes We Have No Bananas",
  },
  {
    url: "http://ftp.gathering.org/TG/2009/MSPaint/21.%20Bris_by_offwhite.png",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "offwhite",
    title: "Bris",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/23.%20ice_ice_dragon%20by%20zeila.png",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "zeila",
    title: "Ice Ice Dragon",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2009/MSPaint/25.%20You_Know_You_re_Addicted_When____by_VANQUiSH.png",
    source: "http://ftp.gathering.org/TG/2009/MSPaint",
    creator: "VANQUiSH",
    title: "You Know You Re Addicted When",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/01-FUN%20at%20BAR%20by%20netrom.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "netrom",
    title: "FUN At BAR",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/02-Can_I_Has_Food_by_Arnt_Ove_Skimmeland.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "Arnt Ove Skimmeland",
    title: "Can I Has Food",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/03-TG%20anno%202010%20by%20Martine%20Grymyr.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "Martine Grymyr",
    title: "TG Anno 2010",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/04-HAPPY_EASTER_BUNNY_by_ernie.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "ernie",
    title: "HAPPY EASTER BUNNY",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/05-Canada_by_Canada__Alberta.x1.jpg",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "Canada  Alberta.x1",
    title: "Canada",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/06-Submerged_now_with_Cthulhu_by_Riktoria.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "Riktoria",
    title: "Submerged Now With Cthulhu",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/08-Underwater_Encounter%20by%20kari%20of%20panda%20prowess.jpg",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "kari of panda prowess",
    title: "Underwater Encounter",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/09-new_super_mario-by_nirex.jpg",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "nirex",
    title: "New Super Mario",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/11-Ascension_by_CoW_1.x1.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "CoW 1.x1",
    title: "Ascension",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/12-Giant%20Robot%20hello%20kitty%20attack%20by%20pancakes.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "pancakes",
    title: "Giant Robot Hello Kitty Attack",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/13-Panda_Pirate&Ninja%20by%20pandaprincess.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "pandaprincess",
    title: "Panda Pirate&Ninja",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/15-neko_pinup_by_offwhite.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "offwhite",
    title: "Neko Pinup",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/16-The%20Gathering%20by%20Pencil%20monk.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "Pencil monk",
    title: "The Gathering",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/18-WildChild%20by%20stephanie%20spoor.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "stephanie spoor",
    title: "WildChild",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint/19-O_hai_thar_by_Zeila.png",
    source: "http://ftp.gathering.org/TG/2010/CreativeCompos/MSPaint",
    creator: "Zeila",
    title: "O Hai Thar",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/001%20-%20Robotanonymous.png",
    source: "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/002-%20Rull%20deg%20en%20røyk.png",
    source: "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/003%20-%2020%20Years%20of%20TG.png",
    source: "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/004%20-KingOfTheWaspApes720.png",
    source: "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/005%20-robotLove.png",
    source: "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/008%20-%200x4169_by_offwhite_visning.png",
    source: "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint",
    creator: "offwhite visning",
    title: "0x4169",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/009%20-%20Unmasked_by_Zeila_unsigned.png",
    source: "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint",
    creator: "Zeila unsigned",
    title: "Unmasked",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/010%20-%203%20Goldfish%201%20moon.png",
    source: "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/001/001%20-%20Robotanonymous.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/001",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk/002-%20Rull%20deg%20en%20røyk.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk/Rull%20deg%20en%20røyk002.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk/Rull%20deg%20en%20røyk003.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk/Rull%20deg%20en%20røyk005.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk/Rull%20deg%20en%20røyk010.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk/Rull%20deg%20en%20røyk011.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk/Rull%20deg%20en%20røyk012.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/002/RullDegEnRøyk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/003/20%20Years%20of%20TG/003%20-%2020%20Years%20of%20TG.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/003/20 Years of TG",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/004/MS%20Paint%20Nicholai%20Smeby/004%20-KingOfTheWaspApes720.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/004/MS Paint Nicholai Smeby",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/004/MS%20Paint%20Nicholai%20Smeby/KingOfTheWaspApes.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/004/MS Paint Nicholai Smeby",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/005/robotLove/005%20-robotLove.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/005/robotLove",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/005/robotLove/progress/robot_One.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/005/robotLove/progress",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/005/robotLove/progress/robot_Three.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/005/robotLove/progress",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/005/robotLove/progress/robot_Two.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/005/robotLove/progress",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/008/0x4169_by_offwhite/008%20-%200x4169_by_offwhite_visning.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/008/0x4169_by_offwhite",
    creator: "offwhite visning",
    title: "0x4169",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/008/0x4169_by_offwhite/0x4169_by_offwhite.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/008/0x4169_by_offwhite",
    creator: "offwhite",
    title: "0x4169",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/008/0x4169_by_offwhite/0x4169_screen.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/008/0x4169_by_offwhite",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/009/Unmasked_by_Zeila/009%20-%20Unmasked_by_Zeila_unsigned.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/009/Unmasked_by_Zeila",
    creator: "Zeila unsigned",
    title: "Unmasked",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/009/Unmasked_by_Zeila/Unmasked_by_Zeila_signed.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/009/Unmasked_by_Zeila",
    creator: "Zeila signed",
    title: "Unmasked",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/009/Unmasked_by_Zeila/thumbnail.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/009/Unmasked_by_Zeila",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/010/3%20Goldfish%201%20moon.png",
    source:
      "http://ftp.gathering.org/TG/2011/CreativeCompos/MSPaint/Folders/010",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint/002%20-%20space%20war%20by%20keith%20mellingen.png",
    source: "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint",
    creator: "keith mellingen",
    title: "Space War",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint/003%20-%20big%20tits%20and%20bow%20by%20hix.png",
    source: "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint",
    creator: "hix",
    title: "Big Tits And Bow",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint/005%20-%20Dragon_Stole_My_Spacship-by-lODDebolt.png",
    source: "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint",
    creator: "lODDebolt",
    title: "Dragon Stole My Spacship",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint/006%20-%20submerged%20by%20sigrid%20aasgaard.png",
    source: "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint",
    creator: "sigrid aasgaard",
    title: "Submerged",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint/007%20-%20Eye_witness-offwhite.png",
    source: "http://ftp.gathering.org/TG/2012/CreativeCompos/MSPaint",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/01-terrain-by-maren-elise-ingeberg.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "maren elise ingeberg",
    title: "Terrain",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/02-hai-pub-by-goofy-christoffer-taller-s.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "goofy christoffer taller s",
    title: "Hai Pub",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/03-slaugther-by-jinx.jpg",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "jinx",
    title: "Slaugther",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/04-boys-who-like-girls-who-like-men-by-themartine.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "themartine",
    title: "Boys Who Like Girls Who Like Men",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/05-one-last-time-by-malin-imerslund.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "malin imerslund",
    title: "One Last Time",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/06-when-singularity-goes-wrong-by-crystal-lam.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "crystal lam",
    title: "When Singularity Goes Wrong",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/07-reach-by-monica-rong.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "monica rong",
    title: "Reach",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/08-crest-of-house-altakraakia-by-marius-kristoffersen.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "marius kristoffersen",
    title: "Crest Of House Altakraakia",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/09-it-s-ok-he-s-got-a-jag-by-anne-elise-bolla-nergaard.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "anne elise bolla nergaard",
    title: "It S Ok He S Got A Jag",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/10-self-study-by-rohtie.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "rohtie",
    title: "Self Study",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/11-finally-free-by-trine-mikkelsen.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "trine mikkelsen",
    title: "Finally Free",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/13-nymph-by-joovie.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "joovie",
    title: "Nymph",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/14-adventure-by-offwhite.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "offwhite",
    title: "Adventure",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint/15-imagination-by-tina-alfredsen.png",
    source: "http://ftp.gathering.org/TG/2013/CreativeCompos/MSPaint",
    creator: "tina alfredsen",
    title: "Imagination",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/01-island-in-the-sky-by-miebk.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "miebk",
    title: "Island In The Sky",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/02-ut-p-tur-aldri-sur-by-anne-elise-bolla-nergaard-ft.-crystal-lam.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "anne elise bolla nergaard ft. crystal lam",
    title: "Ut P Tur Aldri Sur",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/03-free-hugs-by-alida-st-rvik.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "alida st rvik",
    title: "Free Hugs",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/04-sunny-day-by-jim-tommy-myhre-kjexrud.jpg",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "jim tommy myhre kjexrud",
    title: "Sunny Day",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/05-todays-flavor-is....raaaiiinnbowwww-by-ozan-dr-sdal.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "ozan dr sdal",
    title: "Todays Flavor Is....raaaiiinnbowwww",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/06-path-of-the-samurai-by-tara-karlsen-haugland.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "tara karlsen haugland",
    title: "Path Of The Samurai",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/07-sempiternity-by-thor-merlin-lervik.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "thor merlin lervik",
    title: "Sempiternity",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/08-fall-by-tine-hauglund.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "tine hauglund",
    title: "Fall",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/09-wavering-mist-by-mariel-simone-edlund.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "mariel simone edlund",
    title: "Wavering Mist",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/10-volcanic-shaman-by-maiken-louise.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "maiken louise",
    title: "Volcanic Shaman",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/11-make-me-shine-by-arja-ottesen.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "arja ottesen",
    title: "Make Me Shine",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/12-tiger-woods-by-kristoffer-s-rensen.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "kristoffer s rensen",
    title: "Tiger Woods",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/13-calm-by-offwhite-darklite-boozoholics-rbbs.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "offwhite darklite boozoholics rbbs",
    title: "Calm",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint/14-silly-cat-get-off-the-rails-by-delia-tee.png",
    source: "http://ftp.gathering.org/TG/2014/CreativeCompos/MSPaint",
    creator: "delia tee",
    title: "Silly Cat Get Off The Rails",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/camping_by_solor.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "solor",
    title: "Camping",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/carrot_by_zemi.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "zemi",
    title: "Carrot",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/crazt_for_music_by_klarita.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "klarita",
    title: "Crazt For Music",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/dreamcatcher_by_rainsoda.jpg",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "rainsoda",
    title: "Dreamcatcher",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/fatal_chair_accident_by_tirza.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "tirza",
    title: "Fatal Chair Accident",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/god_natt_by_helibanan.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "helibanan",
    title: "God Natt",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/gray_face_surrounded_by_color_by_maksprayer.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/heksene_by_freya.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "freya",
    title: "Heksene",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/husk_å_drikke_vann_og_spise_ordentlig_på_tg_by_nirex.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "nirex",
    title: "Husk Å Drikke Vann Og Spise Ordentlig På Tg",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/invasion_by_zoylster.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "zoylster",
    title: "Invasion",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/just_talk_to_hear_already_by_delia_tee.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "delia tee",
    title: "Just Talk To Hear Already",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/marion_by_tinish.jpg",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "tinish",
    title: "Marion",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/massacre_by_sigmaa.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "sigmaa",
    title: "Massacre",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/moma_i_luuuv_you_hold_it_down_by_pop_pimp_squad.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "pop pimp squad",
    title: "Moma I Luuuv You Hold It Down",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/only_one_captain_by_skosole.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "skosole",
    title: "Only One Captain",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/pixel_perfect_aim_by_equiliari.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "equiliari",
    title: "Pixel Perfect Aim",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/rock_n_more_by_petterroea.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "petterroea",
    title: "Rock N More",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/sdklgn_by_eglikarbacon.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "eglikarbacon",
    title: "Sdklgn",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/u_matoken_wat_by_slimynoob.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "slimynoob",
    title: "U Matoken Wat",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/underwater_by_itr.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "itr",
    title: "Underwater",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/vestern_er_bestern_by_ozandros.png",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "ozandros",
    title: "Vestern Er Bestern",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint/what_nasa_really_discovered_by_superted.jpg",
    source: "http://ftp.gathering.org/TG/2015/CreativeCompos/MSPaint",
    creator: "superted",
    title: "What Nasa Really Discovered",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/apple_tree_by_mrracerhacker.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "mrracerhacker",
    title: "Apple Tree",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/cosplay_is_not_consent_by_4th_agetirza.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "4th agetirza",
    title: "Cosplay Is Not Consent",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/drage_by_selparda.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "selparda",
    title: "Drage",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/emotional_stuff_by_past.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "past",
    title: "Emotional Stuff",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/forest_spirit_warrior_by_dinosaur.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "dinosaur",
    title: "Forest Spirit Warrior",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/gjeit_pa_xp_by_rubzn.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "rubzn",
    title: "Gjeit Pa Xp",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/green_plains_by_anita.jpg",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "anita",
    title: "Green Plains",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/grnt_lys_by_suuhlem.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "suuhlem",
    title: "Grnt Lys",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/hvor_er_veien_til_nordpolen_by_space.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "space",
    title: "Hvor Er Veien Til Nordpolen",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/life_is_crude_by_blazer_of_moog.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "blazer of moog",
    title: "Life Is Crude",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/mounten_cabin_by_magnnils.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "magnnils",
    title: "Mounten Cabin",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/nighttime_in_paint_ms_classic_world_by_mahtaco.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "mahtaco",
    title: "Nighttime In Paint Ms Classic World",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/not_so_gentle_men_by_henstav.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "henstav",
    title: "Not So Gentle Men",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/pepe_3_by_too_cool_name.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "too cool name",
    title: "Pepe 3",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/powerminati_by_aodon.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "aodon",
    title: "Powerminati",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/reach_by_zemi.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "zemi",
    title: "Reach",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/sheep_happens_by_superted.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "superted",
    title: "Sheep Happens",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/skogmeme_xd_by_per_kristian.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "per kristian",
    title: "Skogmeme Xd",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/skrik_av_mnk_by_wulfsted.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "wulfsted",
    title: "Skrik Av Mnk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/switched_on_sisters_by_angst.jpg",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "angst",
    title: "Switched On Sisters",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/team_allemann_by_hodoze.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "hodoze",
    title: "Team Allemann",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/tg_2016_when_two_worlds_merge_by_vinx.jpg",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "vinx",
    title: "Tg 2016 When Two Worlds Merge",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/tg_hype_by_petterson.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "petterson",
    title: "Tg Hype",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/tg_robot_by_kunero.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "kunero",
    title: "Tg Robot",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint/wonderland_by_alfreddaskremig.png",
    source: "http://ftp.gathering.org/TG/2016/CreativeCompos/MSPaint",
    creator: "alfreddaskremig",
    title: "Wonderland",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2017/CreativeCompos/MsPaint/Don&#39;t_worry,_it&#39;s_only_MSPaint._by_Blazer.png",
    source: "http://ftp.gathering.org/TG/2017/CreativeCompos/MsPaint",
    creator: "Blazer",
    title: "Don&#39;t Worry, It&#39;s Only MSPaint.",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/A_battle_of_giants_by_adrian.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "adrian",
    title: "A Battle Of Giants",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/An_okay_hedgehog_by_Ludvig.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Ludvig",
    title: "An Okay Hedgehog",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Antarctica_Cononcrum_by_Equiliari.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Equiliari",
    title: "Antarctica Cononcrum",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Biped_hedgehog_in_strange_lands_by_Levijatan.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Levijatan",
    title: "Biped Hedgehog In Strange Lands",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Elg_Hest_Piggsvin_by_Christer.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Christer",
    title: "Elg Hest Piggsvin",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Fat_Boi_by_Lumberjack.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Lumberjack",
    title: "Fat Boi",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Ferocious_beast_by_Powersimon.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Powersimon",
    title: "Ferocious Beast",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Flash_pingvin_by_phoon.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "phoon",
    title: "Flash Pingvin",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Frikkvin_by_Sabotender.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Sabotender",
    title: "Frikkvin",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/GGX_Gang_by_aKre.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "aKre",
    title: "GGX Gang",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Kida_by_MillisRose.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "MillisRose",
    title: "Kida",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Mr_Mutant_PiggO_by_Aggis_aka_Scerypaws.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Aggis aka Scerypaws",
    title: "Mr Mutant PiggO",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/MutaTUX_by_Blazer.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Blazer",
    title: "MutaTUX",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Mutant_Albino_Pingvin_med_UZI_by_Hauk.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Hauk",
    title: "Mutant Albino Pingvin Med UZI",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Mutant_Wrestling_Organisation_presents_GALU_by_BEYNBIO.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "BEYNBIO",
    title: "Mutant Wrestling Organisation Presents GALU",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Pengu_by_Klarita.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Klarita",
    title: "Pengu",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Penguin_on_the_beach_by_Julie_Maria.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Julie Maria",
    title: "Penguin On The Beach",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Piggsvinet_Fr_nk_by_DEaZArC.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "DEaZArC",
    title: "Piggsvinet Fr Nk",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Pigz_wit_tiny_legz_by_Lano.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Lano",
    title: "Pigz Wit Tiny Legz",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Pingsvin_by_KristineKobe.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "KristineKobe",
    title: "Pingsvin",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Pingvin_pinnsvin_by_WolfError.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "WolfError",
    title: "Pingvin Pinnsvin",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Polklypa_Grand_Prix_by_Kepler.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Kepler",
    title: "Polklypa Grand Prix",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Radioaktivt_piggsvin_by_Katrine.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Katrine",
    title: "Radioaktivt Piggsvin",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Sonic_The_Hedgehog_by_Miplo.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Miplo",
    title: "Sonic The Hedgehog",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Splunky_The_Penghog_by_Eglikarbacon.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Eglikarbacon",
    title: "Splunky The Penghog",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Test_Subject_1337_Pengzilla_by_KajaHoltet.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "KajaHoltet",
    title: "Test Subject 1337 Pengzilla",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/The_Littlest_Penguin_by_ingerjkb.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "ingerjkb",
    title: "The Littlest Penguin",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/The_Purple_multi_mutant_by_Weagle.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Weagle",
    title: "The Purple Multi Mutant",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Tr_nderpingvinen_by_Lampesvein.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Lampesvein",
    title: "Tr Nderpingvinen",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Vengeance_by_Vinx.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Vinx",
    title: "Vengeance",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/Wolfhodge_by_amaya.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "amaya",
    title: "Wolfhodge",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/mutant_fight_by_King_Oskar.jpg",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "King Oskar",
    title: "Mutant Fight",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint/teleports_behind_you_by_Cuntbreaker7.png",
    source: "http://ftp.gathering.org/TG/2018/CreativeCompos/ThemedMSPaint",
    creator: "Cuntbreaker7",
    title: "Teleports Behind You",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Behind_Enemy_Lines_by_Even_aka_Evendeejay.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Even aka Evendeejay",
    title: "Behind Enemy Lines",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Bewitched_by_Klara_aka_Klarita.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Klara aka Klarita",
    title: "Bewitched",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Demonic_Cuteness_by_Maja_aka_Drifandi.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Maja aka Drifandi",
    title: "Demonic Cuteness",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Elefanten_by_Mina_aka_Kvaa99.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Mina aka Kvaa99",
    title: "Elefanten",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Hva_man_rekker_på_en_time_by_Tonje_aka_tawd92.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Tonje aka tawd92",
    title: "Hva Man Rekker På En Time",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/I_Hate_My_Job_by_Camilla_aka_Mills.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Camilla aka Mills",
    title: "I Hate My Job",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Oppgradert_by_Inger_aka_Iserith.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Inger aka Iserith",
    title: "Oppgradert",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Resist_by_Sebastian_Wilhelmsen_aka_Wilhelmsen.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Sebastian Wilhelmsen aka Wilhelmsen",
    title: "Resist",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Siljeeva_by_Silje_Eva_Kvitle_aka_716c8ded96ae4e63bbf6a8e844.jpg",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Silje Eva Kvitle aka 716c8ded96ae4e63bbf6a8e844",
    title: "Siljeeva",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Sweet_dreams_by_Amalie_aka_Harley_Quinn.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Amalie aka Harley Quinn",
    title: "Sweet Dreams",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/The_Creature_Within_by_Mariel_Simone_aka_MillisRose.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Mariel Simone aka MillisRose",
    title: "The Creature Within",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Unironic_Dab_by_Erlend_aka_Elvi75.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Erlend aka Elvi75",
    title: "Unironic Dab",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/Were_No_Strangers_To_Love_by_Hanna_Nikoline.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Hanna Nikoline",
    title: "Were No Strangers To Love",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/chita_portrait_by_sølve.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "sølve",
    title: "Chita Portrait",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/en_dag_i_parken_by_Silje_aka_Silli.jpg",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "Silje aka Silli",
    title: "En Dag I Parken",
  },
  {
    url:
      "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint/the_lynx_and_the_leech_by_adrian_aka_ArtFæg.png",
    source: "http://ftp.gathering.org/TG/2019/CreativeCompos/MSPaint",
    creator: "adrian aka ArtFæg",
    title: "The Lynx And The Leech",
  },
  {
    title: "TG22 tema-teaser",
    creator: "Rick Astley",
    url:
      "https://ia801602.us.archive.org/11/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4",
    source: "https://archive.org/details/Rick_Astley_Never_Gonna_Give_You_Up",
  },
];
