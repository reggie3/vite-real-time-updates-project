const generateUsername = (): string => {
  const adjectives: string[] = [
    "flappy",
    "oblong",
    "happy",
    "sunny",
    "mysterious",
    "colorful",
    "sparkling",
    "giggly",
    "whimsical",
    "bouncing",
  ];
  const nouns: string[] = [
    "bird",
    "tree",
    "unicorn",
    "dragon",
    "cloud",
    "mountain",
    "ocean",
    "garden",
    "star",
    "whisper",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  const username = `${randomAdjective}-${randomNoun}`;
  return username;
};

export default generateUsername;
