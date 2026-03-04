export const FORTUNE_MESSAGES_KO = [
  "오늘 하루도 좋은 일이 가득할 거예요!",
  "작은 노력이 큰 결과를 만들어요.",
  "새로운 기회가 당신을 기다리고 있어요.",
  "지금 하고 있는 일이 미래의 나를 만들어요.",
  "웃음은 최고의 약이에요.",
  "도전하는 것 자체가 용기예요.",
  "오늘의 고민은 내일의 추억이 될 거예요.",
  "당신은 이미 충분히 잘하고 있어요.",
  "좋은 사람들이 곁에 모일 거예요.",
  "인내는 쓰지만 열매는 달아요.",
  "생각대로 될 거예요, 조금만 더 힘내세요!",
  "예상치 못한 행운이 찾아올 거예요.",
  "지금 이 순간이 가장 좋은 시작점이에요.",
  "멈추지 않으면 느려도 괜찮아요.",
  "당신의 노력은 반드시 보답받을 거예요.",
  "오늘은 특별한 하루가 될 거예요!",
  "작은 변화가 큰 차이를 만들어요.",
  "긍정적인 마음이 행운을 끌어당겨요.",
  "배움에는 끝이 없어요, 계속 성장하세요.",
  "당신의 미소가 누군가를 행복하게 해요.",
];

export const FORTUNE_MESSAGES_EN = [
  "Today will be filled with wonderful things!",
  "Small efforts lead to big results.",
  "New opportunities await you.",
  "What you do today shapes your future.",
  "A smile is the best medicine.",
  "The courage is in the attempt itself.",
  "Today's worries will become tomorrow's memories.",
  "You are already doing great!",
  "Good people will gather around you.",
  "Patience is bitter, but its fruit is sweet.",
  "Things will work out — keep going!",
  "Unexpected luck is on its way.",
  "This moment is the best starting point.",
  "It's okay to be slow, as long as you don't stop.",
  "Your hard work will surely pay off.",
  "Today will be a special day!",
  "Small changes make a big difference.",
  "Positive thoughts attract good fortune.",
  "Learning never ends — keep growing.",
  "Your smile makes someone happy.",
];

export type CookieStyle = "classic" | "modern" | "paper";

export function getRandomFortune(lang: "ko" | "en" = "ko", seed?: number, customMessages?: string[]): string {
  if (customMessages && customMessages.length > 0) {
    const idx = seed !== undefined ? seed % customMessages.length : Math.floor(Math.random() * customMessages.length);
    return customMessages[idx];
  }
  const messages = lang === "en" ? FORTUNE_MESSAGES_EN : FORTUNE_MESSAGES_KO;
  const idx = seed !== undefined ? seed % messages.length : Math.floor(Math.random() * messages.length);
  return messages[idx];
}
