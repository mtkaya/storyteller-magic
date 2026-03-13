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
  },

  // ── Seed 8 ────────────────────────────────────────────────
  {
    id: "seed_008",
    title: "The Dragon Who Hated Fire",
    subtitle: "A hilarious tale of mixed-up magic",
    theme: "Courage",
    tone: "Funny",
    duration: "Medium",
    character: "Ember the Sneezing Dragon",
    setting: "The Upside-Down Volcano",
    coverImage: IMAGES.MAGIC_FOREST,
    opening: "Ember was the only dragon in the whole kingdom who sneezed every time he tried to breathe fire. Instead of flames, out came butterflies — hundreds of them, fluttering in all directions. The other dragons could light candles and roast marshmallows. Ember could only make the meadow look very, very pretty.",
    midpoint: "On the night of the Grand Dragon Challenge, every dragon had to light the Festival Lantern. Ember's turn came. He felt the familiar tickle in his nose. Then he noticed two things: a small child in the crowd clutching a broken toy, and the judges watching with clipboards. Should he try to sneeze fire anyway — or let his butterflies fly free for the child?",
    branches: [
      {
        id: "A",
        choiceText: "Try really hard to breathe fire this time",
        sceneText: "Ember squeezed his eyes shut and concentrated with every scale on his body. He breathed in deep... and out came the most spectacular sneeze in dragon history: golden butterflies, tiny rainbows, AND a single perfect flame — just enough to light the lantern.",
        outcomeText: "The crowd went wild. The judges dropped their clipboards. Turns out, Ember's sneeze had always contained a little fire — it just needed butterflies to show the way. He learned that his weird gift was actually two gifts in one."
      },
      {
        id: "B",
        choiceText: "Let the butterflies fly free for the child",
        sceneText: "Ember sneezed with full butterfly power. The child's face lit up like the lantern itself as hundreds of glowing butterflies swirled around her, landing on her broken toy and somehow — magically — fixing every crack.",
        outcomeText: "The lantern could wait. The judges put down their clipboards and started clapping. The head judge said, 'We came to see fire. We saw something far better.' Ember learned that the bravest thing wasn't doing what was expected — it was doing what was right."
      }
    ],
    ending: "Ember flew home that night with a bronze medal (for 'Most Unexpected Dragon') and something far better: a new friend who carried a jar of his butterflies everywhere she went. The other dragons still called him 'the sneezing one,' but now they said it while smiling. Ember didn't mind at all. He sneezed a happy little sneeze, watched the butterflies spiral into the moonlit sky, and decided that being exactly himself was, in fact, quite wonderful."
  },

  // ── Seed 9 ────────────────────────────────────────────────
  {
    id: "seed_009",
    title: "The Invisible Rainbow",
    subtitle: "A story of seeing with your heart",
    theme: "Wonder",
    tone: "Calm",
    duration: "Short",
    character: "Mila the Cloud Painter",
    setting: "The Valley of Mists",
    coverImage: IMAGES.SLEEPING_CLOUD,
    opening: "Mila painted clouds for a living. Not with brushes — with her fingers, tracing shapes in the morning mist before the sun burned it away. Nobody else could see what she saw in the fog: horses, castles, sleeping giants. They thought the valley's mist was just grey and cold. Mila knew it was a canvas.",
    midpoint: "One foggy morning, Mila found a blind hedgehog sitting in the mist, his tiny nose pointing upward. 'I can smell colours,' he told her, 'but I've never seen a rainbow.' Mila had two choices: she could describe the rainbow she was painting in the clouds above, or she could try something completely different and help him feel one instead.",
    branches: [
      {
        id: "A",
        choiceText: "Describe the rainbow in words, colour by colour",
        sceneText: "Mila sat beside him and spoke slowly. 'Red smells like warm bread from the bakery. Orange is the feeling just before you sneeze. Yellow is the hum of the bee you didn't swat.' The hedgehog's nose twitched faster and faster.",
        outcomeText: "By the time she reached violet, the hedgehog was smiling so wide his eyes disappeared. 'I can see it,' he whispered. 'I really can.' Mila understood that wonder is not in the seeing — it is in the sharing."
      },
      {
        id: "B",
        choiceText: "Help him touch the mist she has painted",
        sceneText: "Mila guided the hedgehog's tiny paw into the stripe of warm mist she had shaped. 'This is red — feel how it's slightly warmer?' She moved his paw through each colour. He quivered with delight at every temperature shift.",
        outcomeText: "When they reached the end, the hedgehog said, 'A rainbow is warmth in stripes.' Mila wrote that down. It was the best description of a rainbow she had ever heard. She had tried to give him wonder — and he had given her more back."
      }
    ],
    ending: "The morning mist lifted, and the real rainbow appeared above the valley. Mila and the hedgehog sat side by side watching it — one with open eyes, one with an open nose. They didn't say anything for a long time. Some things are too beautiful for words, and too big for just one pair of eyes. That evening, Mila painted a new cloud shape: two small figures sitting together, looking up."
  },

  // ── Seed 10 ────────────────────────────────────────────────
  {
    id: "seed_010",
    title: "Two Stars, One Wish",
    subtitle: "A friendship forged above the clouds",
    theme: "Friendship",
    tone: "Calm",
    duration: "Long",
    character: "Orion and Lyra the Twin Stars",
    setting: "The Night Sky",
    coverImage: IMAGES.FLYING_CARPET,
    opening: "Orion and Lyra had been neighbours in the night sky for a thousand years. Orion was bold and bright; Lyra was small but steady. Every night, children looked up and made wishes — and every night, the two stars watched them float upward like tiny bubbles. But one night, a wish got stuck. It hovered between them, too heavy to rise and too precious to fall.",
    midpoint: "The stuck wish belonged to a girl named Daria, who had wished to find her missing cat. The wish had been travelling for three nights and was losing its shimmer fast. Orion wanted to send it back to Daria with a shooting-star sign. Lyra wanted to help the wish find the cat's location by reading the patterns of light below. Which way would save Daria's wish in time?",
    branches: [
      {
        id: "A",
        choiceText: "Send a shooting star to Daria as a sign",
        sceneText: "Orion gathered his light into a streak and blazed across the sky — the brightest shooting star in years. Daria was still awake, nose pressed to her window. She gasped, then stood up. 'It's a sign,' she whispered. She followed her instincts to the garden shed.",
        outcomeText: "The cat was curled behind the old watering can, asleep and perfectly safe. Daria's wish unravelled in a warm spiral above the sky. Orion glowed with pride. He'd learned that sometimes the most helpful thing is not to solve the problem — but to light the way."
      },
      {
        id: "B",
        choiceText: "Read the patterns of light below to find the cat",
        sceneText: "Lyra focused her steady light on the streets below. She traced the shadows, the warm windows, the single lit lamp in a garden shed. She held her light there until it cast a faint glow through Daria's curtains.",
        outcomeText: "Daria noticed the unusual glow on her wall, followed it to the window, and spotted the shimmer on the shed door. She found her cat instantly. Lyra's wish unravelled in a quiet silver arc. She had learned that sometimes courage is in the patience to look carefully."
      }
    ],
    ending: "The stuck wish dissolved into a thousand tiny sparks that floated back down as fireflies into Daria's garden. She named one Orion, and one Lyra — though she didn't know why. The two stars saw this from above and felt something they had no name for, but which humans call being loved. They shone a little brighter that night. And every night after, when children looked up to make wishes, Orion and Lyra made sure to listen extra carefully."
  },

  // ── Seed 11 ────────────────────────────────────────────────
  {
    id: "seed_011",
    title: "Don't Wake the Giant",
    subtitle: "The quietest adventure ever",
    theme: "Courage",
    tone: "Funny",
    duration: "Short",
    character: "Teo the Terrified Mouse",
    setting: "The Sleeping Giant's Pocket",
    coverImage: IMAGES.MOUNTAIN,
    opening: "Teo the mouse had made a terrible mistake: he had fallen asleep inside a giant's coat pocket. Now the giant was sleeping too — and snoring so loudly that the trees outside swayed back and forth. Teo needed to escape before the giant woke up, scratched his pocket, and found a small, very embarrassed mouse inside.",
    midpoint: "Teo tiptoed to the pocket's edge and looked down. It was a long way to the giant's knee, and further still to the floor. But inside the pocket, he also spotted a button — slightly loose — that might unravel a thread long enough to climb down safely. Both options were terrifying. Which should he try?",
    branches: [
      {
        id: "A",
        choiceText: "Leap and roll down the giant's coat",
        sceneText: "Teo took the deepest mouse-breath he could manage and jumped. He tumbled down the velvet coat, bouncing off buttons and bumping past a forgotten receipt. At one point, he accidentally tickled the giant's chin. The giant swatted at the air without waking — but it sent Teo flying perfectly onto the floor.",
        outcomeText: "Teo landed in a pile of dust near the door. He looked back at the giant — still snoring, smile on his enormous face. Teo had the distinct impression the giant had known he was there the whole time and simply didn't mind. He tiptoed out, his tail held high."
      },
      {
        id: "B",
        choiceText: "Unravel the loose button thread and climb down",
        sceneText: "Teo tugged the button carefully. The thread unspooled in a long, perfect line. He grabbed it and began to climb down, hand over paw, paw over hand. Halfway down, the giant shifted in his sleep and let out a snore so powerful it rattled Teo like a leaf in a storm.",
        outcomeText: "Teo held on with every toe he had. When the snore passed, he slid the rest of the way, landed on the giant's boot, and skidded to the floor. He stood up, straightened his ears, and walked out the door with complete dignity. Nobody needed to know how much he had trembled."
      }
    ],
    ending: "Teo ran all the way home, his heart still beating like a tiny drum. He crawled into his own small bed, pulled his tiny blanket over his nose, and lay in the dark for a moment. Outside, in the distance, he could still hear the giant snoring. It sounded almost like a lullaby now. Teo closed his eyes and smiled. He had been terrified the whole time — and he had done it anyway. That, he decided, was what bravery actually felt like."
  },

  // ── Seed 12 ────────────────────────────────────────────────
  {
    id: "seed_012",
    title: "The Forest Doctor",
    subtitle: "Healing the woods, one leaf at a time",
    theme: "Nature",
    tone: "Calm",
    duration: "Medium",
    character: "Flora the Gentle Deer",
    setting: "The Ailing Forest",
    coverImage: IMAGES.MAGIC_FOREST,
    opening: "Flora the deer had always known which plants could heal. Her grandmother had taught her: this root for a fever, these leaves for a cough, this bark steeped in moonlight for a heavy heart. The forest creatures came to her the way people go to doctors. But this autumn, something was wrong — the trees themselves were falling ill, their leaves yellowing in July, their bark crumbling like old paper.",
    midpoint: "Flora found the sick patch at the heart of the forest. The soil there smelled of something sharp and wrong. Two paths of healing opened before her: she could brew a slow remedy from the healing roots nearby, which would work gently but take three nights, or she could call the rain by dancing the old rain-dance her grandmother had shown her, which she had never tried alone.",
    branches: [
      {
        id: "A",
        choiceText: "Brew the healing remedy, root by root",
        sceneText: "Flora gathered the roots by moonlight and set them to steep in the hollow of a fallen oak. For three nights, she sat beside the brew, humming to keep it warm. By the third night, the liquid glowed faintly gold. She poured it in a circle around the sick trees.",
        outcomeText: "By dawn of the fourth day, green crept back up the bark. A single new leaf unfurled in the morning light. The forest let out a long, relieved sigh that rustled through every branch. Flora had learned that the most powerful medicine was also the most patient."
      },
      {
        id: "B",
        choiceText: "Dance the rain-dance alone for the first time",
        sceneText: "Flora closed her eyes and let her hooves remember what they had been taught. She began slowly, then faster, turning and stamping. At first, nothing happened. Then the sky darkened. Then, with a single clap of thunder, warm rain fell — the kind that smells like earth waking up.",
        outcomeText: "The rain soaked deep into the sick soil, washing away whatever had soured it. Flora stood in the downpour, soaked and trembling, and laughed for the first time in weeks. She had trusted something she had never done alone. The forest began to mend."
      }
    ],
    ending: "Seasons turned, and the forest recovered fully. The sick patch became the most lush corner of the woods — as if the illness had left behind a gift of extra life. Animals came to see it on quiet afternoons. Flora would visit and press her nose to the bark of the tallest tree, listening. She was sure it whispered back. She never told anyone what it said. Some things between a healer and a forest are private."
  },

  // ── Seed 13 ────────────────────────────────────────────────
  {
    id: "seed_013",
    title: "The Painting That Remembered",
    subtitle: "Into the canvas and back again",
    theme: "Wonder",
    tone: "Adventure",
    duration: "Long",
    character: "Sketch the Art Rabbit",
    setting: "The Museum at Midnight",
    coverImage: IMAGES.MAGIC_CHEST,
    opening: "Sketch the rabbit lived inside a painting in the museum. During the day, he held perfectly still — a rabbit in a meadow, ears up, watching visitors. At night, when the museum went dark and quiet, he stepped out of the frame and explored. He had visited every painting in the building, from the stormy sea on the east wall to the cathedral bathed in gold on the west.",
    midpoint: "Tonight, Sketch found a new painting — one that hadn't been there yesterday. It showed a dark forest and, at its centre, a door with a warm light behind it. When he pressed his paw to it, the canvas rippled like water. He could go in. But the museum's night-watchman was walking the west corridor with his torch. Should Sketch enter the mysterious painting now — or wait and watch, risking it disappearing by morning?",
    branches: [
      {
        id: "A",
        choiceText: "Step into the mysterious painting immediately",
        sceneText: "Sketch pressed through the canvas and landed in a painted forest that smelled — impossibly — of pine and rain. The door at the centre glowed warmly. Inside, he found an entire library of unfinished stories, each one waiting for a character to live it.",
        outcomeText: "Sketch spent the whole night choosing one story, racing through its pages, and arriving back at his own canvas just before dawn. He slipped into his meadow pose, heart pounding, carrying the memory of a hundred new worlds. He had learned that courage is stepping through the unfamiliar door."
      },
      {
        id: "B",
        choiceText: "Watch and wait until the watchman passes",
        sceneText: "Sketch pressed himself against the wall as the watchman's torch swept past. When the footsteps faded, he approached the painting again — and found it had grown. The forest was deeper now, the door more visible, the warm light brighter. It had been waiting for him.",
        outcomeText: "He stepped through and found not a library, but a single room with a fireplace, a chair, and a story already open on the table — written in a handwriting that looked exactly like his own. He sat down and read until the sky outside the painted windows began to lighten."
      }
    ],
    ending: "When morning came and the museum opened, the mysterious painting was gone — as if it had never been there. Only Sketch knew where it had gone: it had folded itself into his memory, becoming part of his own picture. Sometimes, when visitors stopped in front of his painting and really looked, they thought they could see it — a faint suggestion of a door behind the rabbit in the meadow, glowing warmly. They always smiled, though they couldn't say exactly why."
  },

  // ── Seed 14 ────────────────────────────────────────────────
  {
    id: "seed_014",
    title: "Bedtime for Boo",
    subtitle: "Even monsters need sleep",
    theme: "Courage",
    tone: "Funny",
    duration: "Short",
    character: "Boo the Grumpy Goblin",
    setting: "The Cozy Monster Cave",
    coverImage: IMAGES.MAGIC_CHEST,
    opening: "Boo the goblin was very grumpy. He was grumpy in the morning, grumpy in the afternoon, and especially grumpy at bedtime. Every night, the other goblins tucked themselves in with their rock pillows and snored happily by moonrise. But Boo lay awake, staring at the cave ceiling, thinking about things that had gone wrong that day. Tonight, he had stepped on a pinecone AND spilled his mushroom soup.",
    midpoint: "Boo tried everything: counting boulders, pulling his blanket over his ears, growling at the shadows. Nothing worked. Then his little sister Bip appeared at his bedside holding two things: a jar of fireflies for a nightlight, and a crumpled piece of paper with a grumpy-goblin joke written on it. She offered him both at once. Which one would help Boo finally fall asleep?",
    branches: [
      {
        id: "A",
        choiceText: "Use the firefly jar as a nightlight",
        sceneText: "Boo took the jar and set it by his rock pillow. The fireflies pulsed gently — on, off, on, off. Each tiny light was like a little heartbeat. Boo found himself watching them instead of thinking about the pinecone or the soup.",
        outcomeText: "His eyes grew heavy. His frown softened. By the fifteenth pulse, he was asleep, his grumpy face slowly arranging itself into something almost peaceful. The fireflies watched over him all night and did not mind at all."
      },
      {
        id: "B",
        choiceText: "Read the goblin joke to cheer himself up",
        sceneText: "Boo uncrumpled the paper. It said: 'Why don't goblins trust stairs? Because they're always up to something.' It was the worst joke he had ever heard. He tried to stay grumpy. He failed completely.",
        outcomeText: "A laugh burst out of Boo — a big, ugly, wonderful goblin laugh that echoed off the cave walls and woke up three bats. He laughed until his tummy hurt. And when the laughing stopped, all the grumpy thoughts had gone with it. He was asleep before he could think of another one."
      }
    ],
    ending: "Boo slept deeply and well that night, and in the morning he was only slightly grumpy — which, for a goblin, is practically cheerful. At breakfast, he gave Bip an extra mushroom from his bowl without being asked. She said nothing. He said nothing. But when she smiled at him over her soup, Boo felt a small, unfamiliar warmth in his chest. He thought he might have an allergy. He did not. It was just happiness, trying out a new home."
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
