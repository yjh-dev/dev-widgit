export type VocabMode = "daily" | "random" | "sequential";

export interface VocabWord {
  word: string;
  meaning: string;
}

export const BUILTIN_WORDS: VocabWord[] = [
  { word: "serendipity", meaning: "뜻밖의 행운" },
  { word: "ephemeral", meaning: "덧없는, 하루살이의" },
  { word: "ubiquitous", meaning: "어디에나 있는" },
  { word: "resilience", meaning: "회복력, 탄력성" },
  { word: "eloquent", meaning: "웅변의, 유창한" },
  { word: "meticulous", meaning: "꼼꼼한, 세심한" },
  { word: "paradigm", meaning: "패러다임, 모범" },
  { word: "juxtapose", meaning: "나란히 놓다, 대조하다" },
  { word: "benevolent", meaning: "자선적인, 인정 많은" },
  { word: "pragmatic", meaning: "실용적인" },
  { word: "ambiguous", meaning: "모호한, 애매한" },
  { word: "tenacious", meaning: "끈질긴, 집요한" },
  { word: "lucid", meaning: "명쾌한, 투명한" },
  { word: "catalyst", meaning: "촉매, 촉진제" },
  { word: "diligent", meaning: "근면한, 성실한" },
  { word: "profound", meaning: "심오한, 깊은" },
  { word: "versatile", meaning: "다재다능한" },
  { word: "candid", meaning: "솔직한, 꾸밈없는" },
  { word: "nostalgia", meaning: "향수, 그리움" },
  { word: "integrity", meaning: "정직, 성실" },
];

export function getWordByMode(words: VocabWord[], mode: VocabMode, index?: number): VocabWord {
  if (words.length === 0) return { word: "", meaning: "" };
  if (mode === "daily") {
    const today = new Date();
    const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % words.length;
    return words[dayIndex];
  }
  if (mode === "sequential") {
    return words[(index ?? 0) % words.length];
  }
  return words[Math.floor(Math.random() * words.length)];
}

export function parseWords(raw: string): VocabWord[] {
  if (!raw) return [];
  return raw.split("|").map((item) => {
    const [word, meaning] = item.split("~");
    return { word: word || "", meaning: meaning || "" };
  }).filter((w) => w.word);
}
