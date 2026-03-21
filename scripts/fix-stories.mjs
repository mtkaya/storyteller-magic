#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const envContent = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8');
const GEMINI_KEY = envContent.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim();

const FIXES = [
  {
    title: 'Demir and the Vanishing Footprints',
    issue: `The story has a grey feather as a clue but the culprit is a baby hedgehog. Hedgehogs don't have feathers. Fix: either change the clue to match a hedgehog (like tiny quill/spine marks) or change the animal to match the feather clue (like a baby bird). Keep the mystery structure intact.`,
  },
  {
    title: 'Kumru and the Lost Nest',
    issue: `The title says "Lost Nest" but the actual problem is "lost parents". Kumru leaves her own nest to find parents, but later asks "Is my nest in that tree?" which contradicts the setup. Fix: make the story consistently about Kumru's nest being destroyed by a storm and her journey to build a new one, finding that home is where loved ones are. Keep the moral "Ev, sevdiklerinin olduğu yerdir."`,
  },
  {
    title: 'Yusuf and the Volcano Island',
    issue: `Two problems: (1) A creature gives Yusuf a real crystal but at bedtime he holds an "imaginary crystal" - is it real or dream? Pick one consistently. (2) Title is "Volcano Island" but the volcano element is barely used. Fix: make the volcano a central story element (maybe they need to calm the volcano, or it erupts and they solve it). The crystal should be clearly real OR clearly a dream memento. Keep the moral "Tehlikelerde sakin kalmak en büyük güçtür."`,
  },
  {
    title: 'Irmak and the Forest Fire',
    issue: `CRITICAL SAFETY ISSUE: A child approaching a forest fire with a watering can and being praised for "stopping the fire" is dangerous messaging. Fix: Irmak should discover smoke, immediately alert adults/call for help, help evacuate small animals AWAY from the fire, and watch firefighters handle it. The moral should be about responsibility through knowing when to get help, not direct confrontation. Keep the moral "Küçük eller büyük işler başarır." but through alerting help and saving animals, not fighting fire.`,
  },
  {
    title: 'Deniz and the Coral Kingdom',
    issue: `The environmental problem (pollution killing coral) is solved by Deniz just wishing/imagining clean water. This undermines the "nature/conservation" theme. Fix: Deniz should take concrete actions - organizing a beach cleanup, learning to reduce plastic, teaching friends about coral protection. Magic can still exist in the underwater kingdom, but the solution should come from real actions, not wishes.`,
  },
  {
    title: 'Emir and the Baby Sister',
    issue: `Editorial inconsistency: English title says "Baby Sister" but the text says "little brother". Fix: make it consistently a baby sister in both languages. Turkish should say "kız kardeş" consistently. Also ensure Emir's journey from jealousy to love is well-paced.`,
  },
];

const storiesPath = path.join(ROOT, 'scripts', 'prompt-output', 'generated-stories.json');
const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));

async function regenerateStory(fix) {
  const original = stories.find(s => s.title === fix.title);
  if (!original) { console.error(`Not found: ${fix.title}`); return null; }

  const prompt = `You are revising a children's bedtime story. Here is the PROBLEM with the current version:

${fix.issue}

STORY METADATA:
- Title EN: ${original.title}
- Title TR: ${original.titleTr}
- Character: ${original.character}
- Theme: ${original.theme}
- Age Range: ${original.ageRange}
- Moral: ${original.moral}

Write a COMPLETELY NEW version that fixes the problem. Requirements:
1. Write BOTH English and Turkish versions
2. Each version: 10-14 paragraphs, 1-3 sentences each
3. Simple, warm language for children aged ${original.ageRange}
4. Story arc: opening → journey → choice → climax → resolution → bedtime ending
5. Character name "${original.character}" in BOTH versions
6. End with cozy, sleepy feeling
7. Turkish must be natural, not a translation
8. NO scary or violent content
9. The moral "${original.moral}" should be woven naturally

RESPOND IN THIS EXACT JSON FORMAT:
{
  "content": ["paragraph1 EN", "paragraph2 EN", ...],
  "contentTr": ["paragraph1 TR", "paragraph2 TR", ...]
}

ONLY return valid JSON.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 4096, responseMimeType: 'application/json' },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
}

async function main() {
  for (const fix of FIXES) {
    console.log(`🔧 Fixing: ${fix.title}...`);
    try {
      const newContent = await regenerateStory(fix);
      const idx = stories.findIndex(s => s.title === fix.title);
      stories[idx].content = newContent.content;
      stories[idx].contentTr = newContent.contentTr;
      console.log(`✅ ${fix.title} (${newContent.content.length} EN + ${newContent.contentTr.length} TR)`);
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`❌ ${fix.title}: ${err.message}`);
    }
  }

  fs.writeFileSync(storiesPath, JSON.stringify(stories, null, 2), 'utf8');
  console.log(`\n📄 Updated: ${storiesPath}`);
}

main().catch(console.error);
