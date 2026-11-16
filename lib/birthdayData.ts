export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  caption: string;
  image: string;
  tag: string;
  likes: number;
}

export interface MusicTrack {
  title: string;
  artist: string;
  src?: string;
  duration: string;
}

export interface ReasonItem {
  number: number;
  title: string;
  description: string;
  iconName: string;
  category: string;
}

export type SpecialReason = ReasonItem;

export interface SecretEnvelope {
  id: string;
  title: string;
  triggerMood: string;
  message: string;
  signature: string;
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  aniketNote: string;
}

export interface ScrapbookItem {
  id: string;
  title: string;
  date: string;
  caption: string;
  image: string;
  rotation: string; // e.g. "-rotate-2"
  sticker: string;
}

export const birthdayData = {
  // Recipient details
  recipient: {
    fullName: "Akankshya Mishra",
    preferredName: "Akankshya",
    nicknames: ["Akku ❤️", "My Star ✨", "Sunshine ☀️", "Pari 🕊️"],
    age: 23,
    birthdayDate: "17 November 2026",
    countdownTarget: "2026-11-17T00:00:00",
    tagline: "Celebrating 23 magnificent years of the girl who owns my entire heart",
  },

  // Sender details
  sender: {
    fullName: "Aniket Singh",
    preferredName: "Aniket",
    relationship: "Your Boyfriend & Biggest Fan",
    signature: "Forever & Always Yours, Aniket ❤️",
  },

  // Hero Section
  hero: {
    badge: "✨ Chapter 23 • A Celebration of Us ✨",
    mainTitle: "Happy 23rd Birthday, Akankshya ❤️",
    byline: "— With all my love, Aniket",
    subtitle:
      "Twenty-three years ago, the universe brought forth the kindest, most radiant soul. Today, I celebrate you—my best friend, my greatest adventure, and the love of my life.",
  },

  // Music Playlist
  music: {
    title: "Our Love Story Playlist",
    tracks: [
      {
        title: "Golden Hour Melody",
        artist: "Harmonic Strings & Soft Piano",
        duration: "3:42",
      },
      {
        title: "Akankshya's Birthday Lullaby",
        artist: "Acoustic Guitar & Chimes",
        duration: "2:58",
      },
      {
        title: "Falling In Love With You",
        artist: "Romantic Lo-Fi Breeze",
        duration: "3:15",
      },
    ],
  },

  // Voice Note from Aniket
  voiceNote: {
    title: "A Voice Note From Aniket 🎙️",
    subtitle: "Recorded with love just for your 23rd birthday",
    duration: "1:23",
    date: "17 Nov 2026",
    transcript:
      "Hey Akku... Happy 23rd birthday, my love! I just wanted to leave this for you to hear my voice whenever you want a reminder of how deeply you are loved. Watching you grow, laugh, and shine is my greatest privilege. You make every single day of my life feel like poetry. Have the happiest birthday, my queen. I love you to the moon and back! ❤️",
  },

  // Our Story Timeline
  ourStory: [
    {
      id: "story-1",
      year: "The Beginning",
      title: "The Moment Our Worlds Collided",
      subtitle: "Where destiny started writing our story",
      description:
        "The very first time I saw you, something inside me quietly whispered that you were going to change my entire life. That unforgettable first conversation where hours flew past like seconds.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      tag: "First Spark ✨",
    },
    {
      id: "story-2",
      year: "First Date",
      title: "Coffee, Nervous Smiles & Butterflies",
      subtitle: "When I completely fell for your laugh",
      description:
        "Sitting across from you, trying to act cool while my heart was racing. That effortless smile of yours dispelled every bit of nervousness, and I knew I never wanted this date to end.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      tag: "Sweet Memories ☕",
    },
    {
      id: "story-3",
      year: "The Realization",
      title: "Falling Irrevocably In Love",
      subtitle: "When you became my favorite person",
      description:
        "It wasn't just one big grand moment—it was a million little things. The way you care, how you listen with your whole heart, and how safe the world feels whenever your hand is in mine.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      tag: "True Love 💖",
    },
    {
      id: "story-4",
      year: "Adventures & Roadtrips",
      title: "Exploring The World Together",
      subtitle: "Singing out loud to our favorite songs",
      description:
        "From quiet evening walks to spontaneous plans and late-night drives. Every place on earth is a hundred times more magical with you sitting right next to me.",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      tag: "Adventures 🚗",
    },
    {
      id: "story-5",
      year: "Growing Together",
      title: "Being Each Other's Anchor",
      subtitle: "Through every high and every low",
      description:
        "Celebrating your victories, cheering you on when things get tough, and watching you blossom into an extraordinary, unstoppable woman. I am so endlessly proud of you.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      tag: "Partners in Life 🤝",
    },
    {
      id: "story-6",
      year: "17 Nov 2026",
      title: "Celebrating Chapter 23",
      subtitle: "Here's to a lifetime more of you and me",
      description:
        "Twenty-three years of your starlight, and the best chapters of our lives are still waiting to be written. Happy 23rd birthday, my forever girl.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      tag: "Chapter 23 🎂",
    },
  ] as StoryMilestone[],

  // Memory Gallery Items
  memories: [
    {
      id: "mem-1",
      title: "The Unstoppable Smile",
      date: "Golden Moments",
      location: "Everywhere you go",
      caption: "That contagious, pure laughter of yours that instantly turns any ordinary moment into something warm and unforgettable.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      tag: "Pure Joy",
      likes: 124,
    },
    {
      id: "mem-2",
      title: "Grace & Elegance",
      date: "Timeless",
      location: "In every quiet smile",
      caption: "The calm and composed poise you carry yourself with. You handle everything with such innate sweetness and strength.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      tag: "Elegance",
      likes: 98,
    },
    {
      id: "mem-3",
      title: "Dreamer & Achiever",
      date: "Future Bright",
      location: "Chasing the Stars",
      caption: "Your quiet ambition, bright intellect, and determination to achieve every goal you set your eyes upon.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      tag: "Ambition",
      likes: 142,
    },
    {
      id: "mem-4",
      title: "Starlight & Sparkles",
      date: "Magical 23",
      location: "Under the Midnight Sky",
      caption: "Entering the beautiful chapter of 23. A time to make lifelong memories, laugh louder, and shine even brighter.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      tag: "Celebration",
      likes: 177,
    },
    {
      id: "mem-5",
      title: "Heart of Pure Gold",
      date: "Every Day",
      location: "Deep in my heart",
      caption: "You always know how to make people around you feel heard, valued, and comforted. That is your superpower.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      tag: "Kindness",
      likes: 156,
    },
    {
      id: "mem-6",
      title: "Celebration of Us",
      date: "17 Nov 2026",
      location: "Special Chapter",
      caption: "Wishing you a 23rd year filled with sweet surprises, answered prayers, and infinite happiness with Aniket.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      tag: "Birthday Magic",
      likes: 230,
    },
  ] as MemoryItem[],

  // 23 Reasons I Love You (One for each year!)
  twentyThreeReasons: [
    {
      number: 1,
      title: "Your Infectious Laughter",
      description: "The sweetest sound in the universe that can effortlessly brighten my darkest day.",
      iconName: "Sparkles",
      category: "Pure Joy",
    },
    {
      number: 2,
      title: "The Way Your Eyes Crinkle",
      description: "When you laugh wholeheartedly and your eyes sparkle with childlike innocence.",
      iconName: "Eye",
      category: "Cuteness",
    },
    {
      number: 3,
      title: "Your Boundless Empathy",
      description: "You feel deeply for others and always know how to comfort a hurting soul.",
      iconName: "HeartHandshake",
      category: "Kindness",
    },
    {
      number: 4,
      title: "Your Warm, Healing Hugs",
      description: "Wrapping my arms around you feels like finally arriving home after a long journey.",
      iconName: "Heart",
      category: "Warmth",
    },
    {
      number: 5,
      title: "Your Unstoppable Ambition",
      description: "Watching you work hard and chase your dreams with dedication inspires me every day.",
      iconName: "Compass",
      category: "Strength",
    },
    {
      number: 6,
      title: "Your Deeply Focused Face",
      description: "How cute you look when you're concentrating so hard on what you're doing.",
      iconName: "Flame",
      category: "Charm",
    },
    {
      number: 7,
      title: "How You Notice Little Things",
      description: "You remember tiny details about people that others easily overlook.",
      iconName: "Search",
      category: "Thoughtful",
    },
    {
      number: 8,
      title: "The Way You Say My Name",
      description: "Nobody in this entire world says 'Aniket' with as much tenderness as you do.",
      iconName: "Mic",
      category: "Intimacy",
    },
    {
      number: 9,
      title: "Turning Mundane Days Magical",
      description: "Even running errands or sitting in silence feels extraordinary when you're there.",
      iconName: "Coffee",
      category: "Everyday Magic",
    },
    {
      number: 10,
      title: "Your Unconditional Support",
      description: "You believe in me even when I doubt myself, giving me courage to conquer anything.",
      iconName: "Shield",
      category: "Loyalty",
    },
    {
      number: 11,
      title: "Effortlessly Breathtaking",
      description: "Messy bun, oversized hoodie, or dressed up for an evening—you take my breath away.",
      iconName: "Crown",
      category: "Beauty",
    },
    {
      number: 12,
      title: "How You Get Excited Over Little Things",
      description: "Your cute excitement over good food, pretty sunsets, and thoughtful surprises.",
      iconName: "Gift",
      category: "Wonder",
    },
    {
      number: 13,
      title: "Your Sharp Wit & Sarcasm",
      description: "You match my banter flawlessly and keep me laughing until my stomach aches.",
      iconName: "Smile",
      category: "Humor",
    },
    {
      number: 14,
      title: "The Complete Safety I Feel With You",
      description: "I can be 100% vulnerable, goofy, and myself without ever fearing judgment.",
      iconName: "Lock",
      category: "Trust",
    },
    {
      number: 15,
      title: "Your Generous Patience",
      description: "How kindly you forgive my quirks, clumsiness, and occasional forgetfulness.",
      iconName: "Sun",
      category: "Grace",
    },
    {
      number: 16,
      title: "Your Soft Heart Behind Your Poise",
      description: "You carry yourself with elegance, but inside beats the purest, sweetest heart.",
      iconName: "Gem",
      category: "Soul",
    },
    {
      number: 17,
      title: "Our Late-Night Jam Sessions",
      description: "Singing along terribly in the car and sharing playlists that say what words can't.",
      iconName: "Music",
      category: "Harmony",
    },
    {
      number: 18,
      title: "How Perfectly Our Hands Fit",
      description: "Lacing my fingers through yours feels like nature intended them to be held like that.",
      iconName: "Hand",
      category: "Connection",
    },
    {
      number: 19,
      title: "You Make Me Want To Be Better",
      description: "Being loved by you inspires me to be kinder, more thoughtful, and a better man.",
      iconName: "TrendingUp",
      category: "Inspiration",
    },
    {
      number: 20,
      title: "Comfortable Silence",
      description: "We can sit in the same room reading or resting without needing to fill the air.",
      iconName: "Moon",
      category: "Peace",
    },
    {
      number: 21,
      title: "Your Steadfast Loyalty",
      description: "Knowing you have my back gives me an unshakeable sense of security and peace.",
      iconName: "Award",
      category: "Devotion",
    },
    {
      number: 22,
      title: "You Are My Best Friend",
      description: "Before anything else, you are the person I want to tell every piece of news to first.",
      iconName: "Users",
      category: "Best Friend",
    },
    {
      number: 23,
      title: "Simply Because You Are YOU",
      description: "I love everything that makes Akankshya Mishra uniquely, enchantingly herself.",
      iconName: "Star",
      category: "Forever",
    },
  ] as ReasonItem[],

  // Secret Envelopes from Aniket
  secretEnvelopes: [
    {
      id: "env-1",
      title: "Open When You Miss Me",
      triggerMood: "When distance feels too heavy",
      message:
        "My dearest Akku, whenever you feel alone or miss my presence, close your eyes and place your hand on your heart. Every single beat carries a piece of my love for you. No matter the miles, no matter the time of day, I am always thinking of you, rooting for you, and counting down the seconds until I hold you again. You are never alone ❤️",
      signature: "Your Aniket, always by your side",
      color: "#f472b6",
    },
    {
      id: "env-2",
      title: "Open When You Feel Sad",
      triggerMood: "When the clouds roll in",
      message:
        "Hey my beautiful girl, take a deep breath. It's okay to feel overwhelmed, and it's okay to cry. You carry so much with so much grace, but you don't have to be strong all the time. Let me carry your worries with you. You have survived every single difficult day so far, and tomorrow the sun will shine warm on your face again. I believe in you with every fiber of my being.",
      signature: "With infinite hugs and forehead kisses",
      color: "#fbbf24",
    },
    {
      id: "env-3",
      title: "Open When You Need A Smile",
      triggerMood: "For an instant mood boost",
      message:
        "Remember that time we couldn't stop laughing until our stomachs hurt over something completely ridiculous? Or the funny face I make when I try to concentrate? You have the most magical, heart-melting smile in the universe. Please let it shine right now—because seeing you happy is literally my life's favorite mission! ✨",
      signature: "Your personal comedian & lover",
      color: "#a855f7",
    },
    {
      id: "env-4",
      title: "Open When You Can't Sleep",
      triggerMood: "For late midnight hours",
      message:
        "Quiet your sweet mind, my love. Let go of all the thoughts running through your head. Wrap yourself cozy in your blanket and imagine me gently brushing your hair away from your forehead. Tomorrow is full of new mercies and fresh blessings. Rest easy, my dream girl. Goodnight and sweet dreams 🌙",
      signature: "Loving you through every hour of the night",
      color: "#38bdf8",
    },
    {
      id: "env-5",
      title: "Open On Your 23rd Birthday",
      triggerMood: "A special toast for 17 Nov 2026",
      message:
        "HAPPY 23RD BIRTHDAY MY QUEEN! 🎂🎉 Seeing you step into 23 with such radiance, wisdom, and beauty fills me with pure wonder. May this year shower you with unforgettable adventures, answered prayers, academic and career triumphs, and boundless happiness. I am honored to walk beside you. Cheers to 23 and a lifetime of our love!",
      signature: "All my love, forever & always, Aniket",
      color: "#f43f5e",
    },
  ] as SecretEnvelope[],

  // "How Well Do You Know Us?" Couple Quiz
  coupleQuiz: [
    {
      id: 1,
      question: "Who fell in love first?",
      options: ["Aniket (head over heels instantly!)", "Akankshya", "It was simultaneous magic", "Both in denial at first"],
      correctIndex: 0,
      aniketNote: "Aniket was completely smitten from the very first moment!",
    },
    {
      id: 2,
      question: "What is Akankshya's ultimate superpower?",
      options: [
        "Her radiant smile that fixes any bad mood",
        "Her sharp intellect and determination",
        "Her ability to look gorgeous effortlessly",
        "All of the above (1000%!)",
      ],
      correctIndex: 3,
      aniketNote: "She is the complete package—unmatched in every way!",
    },
    {
      id: 3,
      question: "What is our ideal cozy date night?",
      options: [
        "Late night drives with good music & heartfelt talks",
        "Ordering delicious food and binge-watching favorites",
        "Cooking together and laughing over messy food",
        "Anywhere as long as we're together",
      ],
      correctIndex: 3,
      aniketNote: "Being together is what makes anywhere feel like paradise.",
    },
    {
      id: 4,
      question: "Who is more dramatic when they don't get food on time?",
      options: ["Akankshya (hangry queen!)", "Aniket", "Equally dramatic", "Food resolves all drama!"],
      correctIndex: 0,
      aniketNote: "A hungry Akankshya is a cute force of nature! 😂",
    },
    {
      id: 5,
      question: "What is Aniket's biggest dream for us?",
      options: [
        "Traveling the world together hand-in-hand",
        "Building a warm, loving home full of laughter",
        "Growing old together and never losing our spark",
        "All of the above and so much more ❤️",
      ],
      correctIndex: 3,
      aniketNote: "A lifetime of loving you is my greatest ambition.",
    },
  ] as QuizQuestion[],

  // Compatibility Radar
  compatibility: {
    overallPercentage: 100,
    headline: "A Match Written In The Constellations",
    summary:
      "Cosmic algorithm test results: Aniket Singh & Akankshya Mishra share a 1-in-a-billion compatibility score across all emotional, spiritual, and romantic dimensions.",
    metrics: [
      { name: "Soul Connection", score: 100, comment: "Deep, unspoken telepathy" },
      { name: "Laughter & Banter", score: 99.9, comment: "Endless shared giggles" },
      { name: "Loyalty & Trust", score: 100, comment: "Unshakeable rock foundation" },
      { name: "Cuteness Overload", score: 1000, comment: "Off the charts adorable" },
      { name: "Future Harmony", score: 100, comment: "Written in the stars" },
    ],
  },

  // Interactive Digital Scrapbook
  scrapbook: [
    {
      id: "scrap-1",
      title: "First Unforgettable Date",
      date: "Day One",
      caption: "That blush on your face when I complimented you—I knew right then.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      rotation: "-rotate-2",
      sticker: "☕ First Date",
    },
    {
      id: "scrap-2",
      title: "Sunset Under The Sky",
      date: "Golden Hour",
      caption: "Watching the sky turn pink and thinking you were prettier than the view.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      rotation: "rotate-2",
      sticker: "🌅 Soulmates",
    },
    {
      id: "scrap-3",
      title: "The Cutest Smile",
      date: "Every Single Day",
      caption: "My favorite photo of your candid laughter. Pure sunshine.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      rotation: "-rotate-1",
      sticker: "💖 My Girl",
    },
    {
      id: "scrap-4",
      title: "Turning 23 In Style",
      date: "17 Nov 2026",
      caption: "Here’s to the most enchanting 23rd birthday celebration for you!",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      rotation: "rotate-3",
      sticker: "👑 23rd Birthday",
    },
  ] as ScrapbookItem[],

  // Handwritten Love Letter from Aniket
  handwrittenLetter: {
    salutation: "My Dearest Akku,",
    paragraphs: [
      "On this seventeenth day of November, the universe gave me its greatest blessing: YOU. Twenty-three years ago, the world welcomed someone whose gentle strength, infectious warmth, and radiant grace would one day become my entire universe.",
      "Loving you has been the most natural, effortless, and beautiful experience of my life. You have seen me at my best and at my most vulnerable, and in your eyes, I have always found acceptance, encouragement, and peace. You don't just brighten my days—you give them purpose.",
      "As you celebrate your twenty-third birthday, I want you to know how deeply proud I am of the woman you are becoming. Your intelligence, your fierce kindness, your loyalty, and that playful smile of yours leave me in awe every single day.",
      "I promise to keep choosing you, loving you loudly, cheering for you in every dream you chase, and holding your hand through every chapter yet to come. May your 23rd year bring you as much joy as you have brought into my life.",
    ],
    closing: "Forever and always yours,",
    signOff: "With all my heart & soul, Aniket ❤️",
    dateStamp: "17 November 2026 • Chapter 23",
  },

  // Wishes Pool
  wishesPool: [
    "May your 23rd year be as radiant, ambitious, and breathtaking as your smile! ✨",
    "May all your hard work turn into monumental triumphs and answered dreams! 🌸",
    "Wishing you 365 days of warm coffee, laughter that hurts your stomach, and peaceful sleep! ☕",
    "May the universe open every golden door of opportunity before your brilliant mind! 🗝️",
    "Here’s to late night drives, tightest hugs, and growing even more deeply in love! 🚗❤️",
    "May your heart never doubt how deeply, unconditionally, and fiercely you are adored! 💖",
    "Wishing my Akku a 23rd chapter filled with magic, miracles, and endless blessings! 🌟",
    "You are the star of my life. Happy 23rd Birthday, Akankshya! 🎂🥂",
  ],

  // Final Surprise
  finalSurprise: {
    teaserTitle: "Wait… One Last Thing ❤️",
    teaserSubtitle: "Before you finish your birthday journey, Aniket has one final surprise box waiting just for you.",
    boxPrompt: "Open Aniket's Royal Birthday Vault",
    headline: "You Are My Whole World, Akankshya!",
    message:
      "Thank you for being my girlfriend, my best friend, my confidante, and my greatest blessing. May your 23rd birthday be the start of the most unforgettable, magical, and joyful year of your life. I love you more than all the stars in the cosmos.",
    grandCelebrationWish: "Happy 23rd Birthday, Akankshya Mishra! ❤️✨",
    signOff: "Forever Yours, Aniket Singh",
  },

  // Easter Egg Secrets
  easterEggs: {
    secretKey: "A",
    secretMessage:
      "🎉 SECRET EASTER EGG UNLOCKED! 🎉\n\nHey Akku! You found the secret hidden corner of your website! Aniket loves you 3000, to infinity and beyond! Here's a million extra hugs just for being so curious and cute! 🥰❤️",
  },
};

// Aliases for compatibility
export const memories = birthdayData.ourStory;
export const reasons = birthdayData.twentyThreeReasons;
export const secretEnvelopes = birthdayData.secretEnvelopes;
