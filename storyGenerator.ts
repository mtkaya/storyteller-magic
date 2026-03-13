import { IMAGES } from './data';

export interface StoryBranch {
  id: "A" | "B";
  choiceText: string;        // shown as a choice button to the reader
  sceneText: string;         // paragraph shown after choice
  outcomeText: string;       // resolution paragraph
}

export interface StorySeed {
  id: string;
  title: string;
  subtitle: string;
  theme: "Courage" | "Friendship" | "Wonder" | "Nature";
  tone: "Calm" | "Funny" | "Adventure";
  duration: "Short" | "Medium" | "Long";
  character: string;
  setting: string;
  coverImage: string;        // key from IMAGES in data.ts
  opening: string;           // opening paragraph (scene-setting)
  midpoint: string;          // paragraph ending with a dilemma
  branches: [StoryBranch, StoryBranch];
  ending: string;            // shared happy ending paragraph
}

export const INTERACTIVE_DETOUR_IDEAS = [
  "a tiny door appears in the tree trunk",
  "a talking cloud offers a riddle",
  "a golden leaf falls and whispers a secret",
  "a sleeping fox opens one eye and smiles",
  "the stars rearrange into a friendly face",
  "a mushroom circle begins to glow softly",
  "a gentle breeze carries a map made of mist",
  "a butterfly lands and shows the way forward"
];

export const STORY_SEEDS: StorySeed[] = [
  {
    id: "seed_001",
    title: "Luna's Moonlight Quest",
    subtitle: "A tale of courage under the stars",
    theme: "Courage",
    tone: "Calm",
    duration: "Short",
    character: "Luna the Silver Kitten",
    setting: "The Whispering Woods",
    coverImage: IMAGES.SLEEPING_CLOUD,
    opening: "In the heart of the whispering woods, a small silver kitten named Luna sat beneath the oldest oak tree. The moon cast gentle shadows through the leaves, and the forest hummed its evening song. Luna's mother had told her about the Moonflower that bloomed only once a year, high on the hill beyond the dark grove.",
    midpoint: "As Luna reached the edge of the dark grove, she saw two paths. One led through the shadow-filled trees where owls hooted softly. The other wound around the grove, longer but lit by fireflies. Her heart beat faster. Which path would help her reach the Moonflower before midnight?",
    branches: [
      {
        id: "A",
        choiceText: "Take the shadowy path through the grove",
        sceneText: "Luna took a deep breath and stepped into the shadows. The darkness felt heavy at first, but then her eyes adjusted. She noticed the soft glow of mushrooms lighting the way, and a gentle owl swooped down to guide her.",
        outcomeText: "The owl's wings made no sound as it led her through. Luna's courage grew with each step. She discovered that the dark wasn't scary—it was just different. And in being brave, she found friends she never knew existed."
      },
      {
        id: "B",
        choiceText: "Follow the longer firefly-lit path",
        sceneText: "Luna chose the gentle glow of the fireflies. The path wound around the grove, taking more time, but each step felt safe. The fireflies danced ahead of her like tiny lanterns showing the way.",
        outcomeText: "As she walked, Luna realized that being brave didn't always mean facing the scariest path. Sometimes courage means choosing what feels right for you. The fireflies led her safely, and she learned to trust her instincts."
      }
    ],
    ending: "Luna reached the hilltop just as the clock struck midnight. The Moonflower opened its petals, glowing with soft silver light. She had made it. As she sat beside the flower, Luna understood that she had been brave in her own special way. The moon smiled down, and the forest whispered its approval. That night, Luna fell asleep knowing she could face any adventure that came her way."
  },
  {
    id: "seed_002",
    title: "The Great Cookie Caper",
    subtitle: "A delicious mystery with Bella Bear",
    theme: "Friendship",
    tone: "Funny",
    duration: "Short",
    character: "Bella the Clumsy Bear",
    setting: "Grandma's Kitchen",
    coverImage: IMAGES.BEAR_COOKIES,
    opening: "Bella Bear stood in Grandma's cozy kitchen, her nose twitching at the smell of fresh honey cookies. But when she opened the cookie jar, it was completely empty! Only crumbs remained. Bella's tummy rumbled. Someone had eaten all the cookies, and she was determined to find out who.",
    midpoint: "Bella found two clues: muddy pawprints leading to the garden, and a trail of cookie crumbs heading toward the reading nook. Her detective nose was ready! Which clue should she follow first?",
    branches: [
      {
        id: "A",
        choiceText: "Follow the muddy pawprints outside",
        sceneText: "Bella waddled outside, following the pawprints. They led straight to her friend Raccoon, who was covered in mud and looking very guilty. But wait—Raccoon was planting flowers, not eating cookies!",
        outcomeText: "Raccoon giggled. 'I was making a surprise garden for Grandma! But I saw Squirrel running from the kitchen earlier...' Bella laughed at herself for jumping to conclusions. She gave Raccoon a big hug for the sweet gesture."
      },
      {
        id: "B",
        choiceText: "Follow the cookie crumb trail inside",
        sceneText: "The crumbs led to the reading nook, where Squirrel sat surrounded by books—and cookie crumbs! Squirrel's cheeks were puffed out suspiciously. Bella crossed her arms and raised an eyebrow.",
        outcomeText: "Squirrel swallowed and looked embarrassed. 'I'm sorry, Bella! They smelled so good, and I couldn't resist!' Bella's stern face melted into a smile. 'Next time, just ask! Friends share cookies together.'"
      }
    ],
    ending: "Bella and Squirrel baked a fresh batch of cookies together, this time making enough for everyone. When Raccoon came in from the garden, all three friends sat around the table, munching cookies and giggling. Grandma walked in, saw the mess, and just smiled. 'The best cookies,' she said, 'are the ones shared with friends.' Bella's tummy was full, and her heart was even fuller."
  },
  {
    id: "seed_003",
    title: "The Singing Compass",
    subtitle: "A journey into wonder and magic",
    theme: "Wonder",
    tone: "Adventure",
    duration: "Medium",
    character: "Jasper the Curious Rabbit",
    setting: "The Enchanted Desert",
    coverImage: IMAGES.FLYING_CARPET,
    opening: "Jasper the rabbit discovered a brass compass in his burrow, half-buried in sand. When he held it, the compass hummed a melody he'd never heard before. The needle didn't point north—it pointed toward a shimmering oasis on the horizon. Jasper's whiskers tingled with excitement. An adventure was calling.",
    midpoint: "Halfway to the oasis, Jasper reached a fork in the desert. To the left, ancient stone pillars rose from the sand, covered in glowing symbols. To the right, a gentle sandstorm swirled, and he could hear laughter within it. The compass hummed louder, but didn't choose for him. Which path held the greatest wonder?",
    branches: [
      {
        id: "A",
        choiceText: "Explore the glowing stone pillars",
        sceneText: "Jasper hopped toward the pillars. As he touched the symbols, they lit up and told stories of ancient travelers. The stones sang in harmony with his compass, teaching him forgotten songs of the desert.",
        outcomeText: "The pillars revealed a hidden passage beneath the sand, leading directly to the oasis. Jasper learned that wonder often lies in the stories of those who came before. The ancient songs filled his heart with awe."
      },
      {
        id: "B",
        choiceText: "Dance into the laughing sandstorm",
        sceneText: "Jasper took a brave hop into the swirling sand. Inside, he found playful wind spirits dancing and spinning. They giggled and invited him to join their dance. The compass's melody matched their rhythm perfectly.",
        outcomeText: "The wind spirits twirled Jasper through the air, showing him the desert from above. He saw patterns in the dunes, hidden beauty everywhere. They gently set him down right at the oasis's edge, and he understood that wonder is found in letting go and trusting the journey."
      }
    ],
    ending: "At the oasis, Jasper found a crystal-clear pool surrounded by singing flowers. The compass had led him to a place where magic was real and wonder lived in every shadow. As he dipped his paws in the cool water, the compass stopped humming—its job complete. Jasper smiled, knowing this was just the beginning. He tucked the compass safely away, ready for the next melody it might sing."
  },
  {
    id: "seed_004",
    title: "Willow and the Whispering River",
    subtitle: "Nature's lessons in patience and flow",
    theme: "Nature",
    tone: "Calm",
    duration: "Medium",
    character: "Willow the Wise Otter",
    setting: "The Gentle River",
    coverImage: IMAGES.DEEP_SEA,
    opening: "Willow the otter floated on her back in the gentle river, watching clouds drift by. The river had always been her home, her teacher, and her friend. Today, the water whispered a secret: upstream, where the river began, a great willow tree needed her help. Its roots were tangled, and it couldn't drink properly.",
    midpoint: "Willow swam upstream and found the willow tree, just as the river had said. Its roots were indeed knotted and dry. She saw two ways to help: she could dig around the roots with her paws, which would be slow and careful work, or she could ask the beavers to redirect part of the stream, which would be faster but might change the river's flow.",
    branches: [
      {
        id: "A",
        choiceText: "Carefully untangle the roots herself",
        sceneText: "Willow dove underwater and began working with her nimble paws. It was slow, patient work. Each root had to be gently loosened and guided back into place. The river flowed around her, encouraging her with soft ripples.",
        outcomeText: "Hours passed, but Willow stayed focused. As the last root came free, water rushed in to nourish the tree. The willow's leaves brightened immediately. Willow learned that some things can't be rushed—nature works on its own time, and patience is a form of love."
      },
      {
        id: "B",
        choiceText: "Ask the beavers for help with the stream",
        sceneText: "Willow swam to the beaver lodge and explained the problem. The beavers were happy to help! Together, they built a small channel to guide water to the willow's roots. Working together made the task joyful and quick.",
        outcomeText: "The water flowed into the new channel, and the willow tree drank deeply. Willow saw that asking for help wasn't weakness—it was wisdom. Together, the river's creatures could do more than any one of them alone. The tree's leaves rustled in thanks."
      }
    ],
    ending: "The great willow tree stood tall and healthy again, its leaves shimmering in the sunlight. Willow floated beneath its branches, feeling the river's gratitude flow through her fur. The water whispered a new secret: 'You are part of this river, and it is part of you.' Willow closed her eyes, letting the current carry her gently home. She had learned that caring for nature meant caring for herself, and that the river would always guide her true."
  },
  {
    id: "seed_005",
    title: "The Tickle Monster's Bedtime",
    subtitle: "Giggles and friendship after dark",
    theme: "Friendship",
    tone: "Funny",
    duration: "Long",
    character: "Pip the Mischievous Mouse",
    setting: "The Cozy Burrow",
    coverImage: IMAGES.PILLOW_FIGHT,
    opening: "Pip the mouse loved bedtime, but not for sleeping—for pillow fights! Every night, he convinced his friends to join the Great Pillow Battle. Tonight, even the sleepiest of friends, Harriet the hedgehog, agreed to play. Feathers flew, giggles echoed, and the burrow became a cloud of chaos.",
    midpoint: "Just as the pillow fight reached its peak, they heard a soft snore. Bernard the badger had fallen asleep right in the middle of the battle! A pillow was poised above him, ready to bop. Should they wake him with a gentle tickle or let him sleep and end the game early?",
    branches: [
      {
        id: "A",
        choiceText: "Give Bernard a gentle tickle to wake him",
        sceneText: "Pip tiptoed over and tickled Bernard's nose with a feather. Bernard's nose twitched, his whiskers wiggled, and then—he burst into laughter! His eyes popped open, and he grabbed a pillow, rejoining the fun with the biggest smile.",
        outcomeText: "The pillow fight continued for another glorious ten minutes, everyone laughing so hard their tummies hurt. Bernard thanked Pip for waking him. 'I would've been sad to miss this!' he said. Sometimes, waking friends means sharing the joy."
      },
      {
        id: "B",
        choiceText: "Let Bernard sleep and tuck him in gently",
        sceneText: "Pip held up a paw, signaling everyone to be quiet. They all tiptoed around Bernard, giggling silently. Together, they draped a soft blanket over him and placed a pillow under his head. Bernard smiled in his sleep.",
        outcomeText: "The friends whispered their goodnights and snuggled into their own beds, hearts warm from caring for Bernard. In the morning, Bernard woke up confused but cozy. 'You took care of me?' he asked. Pip grinned. 'That's what friends do.'"
      }
    ],
    ending: "As the moon rose higher, the burrow grew quiet. Pip lay in his tiny bed, surrounded by his friends. Feathers still floated in the air, and pillows were scattered everywhere, but everyone was smiling. Harriet the hedgehog mumbled sleepily, 'Best bedtime ever.' Pip agreed. Whether they played or they cared, being together was the real adventure. With one last happy sigh, Pip closed his eyes, already dreaming of tomorrow night's pillow fight."
  },
  {
    id: "seed_006",
    title: "The Lantern of Lost Light",
    subtitle: "An adventure to brighten the darkness",
    theme: "Courage",
    tone: "Adventure",
    duration: "Long",
    character: "Cora the Brave Firefly",
    setting: "The Forgotten Lighthouse",
    coverImage: IMAGES.LIGHTHOUSE,
    opening: "Cora was the smallest firefly in the meadow, but her light burned the brightest. One stormy evening, the lighthouse on the cliff went dark. Ships at sea would lose their way without it! The older fireflies said it was too dangerous to fly in the storm, but Cora's light flickered with determination. She would bring the lighthouse back to life.",
    midpoint: "Cora battled the wind and rain, finally reaching the lighthouse door. Inside, she found the great lantern covered in dust and cobwebs. To light it, she'd need to either climb to the top and ignite the wick herself—a long and scary climb—or find the old lighthouse keeper's matches somewhere in the cluttered room below. Both paths were risky. Which should she choose?",
    branches: [
      {
        id: "A",
        choiceText: "Climb to the top and ignite the wick",
        sceneText: "Cora spread her tiny wings and began the long spiral climb up the lighthouse stairs. The wind howled through cracks in the walls, and shadows danced around her. But her light cut through the darkness, and she climbed higher and higher.",
        outcomeText: "At the top, Cora reached the great wick. She flew close, and her own light sparked it to life. The lighthouse roared with brilliant light, cutting through the storm. Cora realized that sometimes, the light you need is already inside you. She had saved the ships with her own courage."
      },
      {
        id: "B",
        choiceText: "Search for the keeper's matches below",
        sceneText: "Cora flitted through the cluttered room, searching shelves and drawers. Behind an old painting, she found a box of matches! She carried one carefully in her tiny legs, struck it against the stone, and lit a candle.",
        outcomeText: "Using the candle, Cora lit a trail of oil lamps leading up the stairs. One by one, they blazed to life, and finally the great lantern ignited. She learned that courage doesn't always mean doing everything alone—sometimes it's about using the tools left behind by others."
      }
    ],
    ending: "The lighthouse blazed across the dark sea, guiding ships safely to shore. Cora perched on the lantern's edge, exhausted but proud. The storm began to calm, and the first rays of dawn peeked over the horizon. Below, she saw the ships safe in harbor, their crews waving up at the light. Cora's tiny heart swelled. She had been brave when it mattered most. As she flew home through the clearing skies, her light glowed brighter than ever, a beacon of courage for all who saw her."
  },
  {
    id: "seed_007",
    title: "The Mountain's Secret Song",
    subtitle: "Discovering wonder in high places",
    theme: "Wonder",
    tone: "Calm",
    duration: "Short",
    character: "Echo the Thoughtful Goat",
    setting: "The Singing Mountain",
    coverImage: IMAGES.MOUNTAIN,
    opening: "Echo the mountain goat stood at the base of the tallest peak, listening. The other goats said the mountain sang at sunrise, but Echo had never heard it. Today, she decided to climb higher than ever before to discover the mountain's secret song. The stars were fading, and dawn was near.",
    midpoint: "Halfway up, Echo reached a split in the path. One trail led to a cave that echoed every sound—perhaps the song came from within. The other climbed straight up to the summit where the first light would touch. Both paths promised wonder, but dawn was approaching quickly. Which way should she go?",
    branches: [
      {
        id: "A",
        choiceText: "Enter the echoing cave",
        sceneText: "Echo stepped into the cave, and immediately every hoofstep rang out like music. She hummed a note, and the cave sang it back in harmony. The walls were lined with crystals that chimed softly in the breeze.",
        outcomeText: "Inside the cave, Echo discovered that the mountain's song wasn't just one sound—it was every sound reflected and woven together. Her own voice became part of it. She learned that sometimes, the wonder we seek is found when we add our own voice to the world."
      },
      {
        id: "B",
        choiceText: "Climb to the summit for sunrise",
        sceneText: "Echo pushed upward, her legs strong and steady. Just as the first golden ray touched the peak, she reached the top. The wind swept across the rocks, and the mountain began to hum—a deep, beautiful note that vibrated through the stone.",
        outcomeText: "Standing at the summit, Echo felt the mountain's song rise through her hooves and into her heart. It was the sound of wind, stone, and sky meeting at the edge of the world. She understood that wonder lives in the moments we reach beyond ourselves."
      }
    ],
    ending: "As the sun rose fully, painting the sky in shades of pink and gold, Echo closed her eyes and let the mountain's song fill her completely. Whether from the cave's echoes or the summit's wind, the music was real. It had always been there, waiting for someone to listen. Echo opened her eyes, gazing at the vast world below, and felt a profound sense of peace. The mountain had shared its secret: wonder is everywhere, for those who take the time to notice."
  }
];

export function generateStory(theme: string, tone: string, duration: string): StorySeed {
  // Try to find an exact match
  const exactMatch = STORY_SEEDS.find(
    seed => seed.theme === theme && seed.tone === tone && seed.duration === duration
  );

  if (exactMatch) {
    return exactMatch;
  }

  // Try to match theme and tone
  const themeAndToneMatch = STORY_SEEDS.find(
    seed => seed.theme === theme && seed.tone === tone
  );

  if (themeAndToneMatch) {
    return themeAndToneMatch;
  }

  // Try to match just theme
  const themeMatch = STORY_SEEDS.find(
    seed => seed.theme === theme
  );

  if (themeMatch) {
    return themeMatch;
  }

  // Fallback to a deterministic selection based on input
  const hash = (theme + tone + duration).length % STORY_SEEDS.length;
  return STORY_SEEDS[hash];
}
