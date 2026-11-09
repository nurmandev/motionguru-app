export const processSteps = [
  {
    id: 'input',
    number: '01',
    label: 'Input',
    title: 'Share your product.',
    description:
      'Paste your URL, describe the idea, or upload the assets you already have. That is the whole brief.',
  },
  {
    id: 'direction',
    number: '02',
    label: 'Direction',
    title: 'Shape the story.',
    description:
      'MotionGuru finds the angle, writes the narrative, and turns it into a scene-by-scene storyboard.',
  },
  {
    id: 'output',
    number: '03',
    label: 'Output',
    title: 'Render the film.',
    description:
      'Edit any frame, adjust the pacing, and export a finished product introduction ready to share.',
  },
] as const;

export const capabilities = [
  {
    id: 'intelligence',
    number: '02',
    title: 'Product intelligence',
    description: 'Your site, copy, and assets become a clear creative brief.',
  },
  {
    id: 'control',
    number: '03',
    title: 'Scene-level control',
    description: 'Adjust the direction, words, and timing of every frame.',
  },
  {
    id: 'export',
    number: '04',
    title: 'Studio-grade export',
    description: 'Render a polished film that is ready for launch day.',
  },
] as const;

export const storyDirections = [
  {
    id: 'saas',
    number: '01',
    category: 'SaaS product introduction',
    name: 'Work, beautifully.',
    tone: 'violet',
    note: 'A calmer way to collaborate',
  },
  {
    id: 'mobile',
    number: '02',
    category: 'Mobile app launch',
    name: 'Everyday, closer.',
    tone: 'lime',
    note: 'Small moments, connected',
  },
  {
    id: 'ai',
    number: '03',
    category: 'AI product story',
    name: 'A clearer point of view.',
    tone: 'blue',
    note: 'A new way to see the work',
  },
] as const;

export const featureStories = [
  {
    id: 'understand',
    number: '01',
    eyebrow: 'Product intelligence',
    title: 'Understand the product before shaping the story.',
    description:
      'MotionGuru reads your website, copy, and product assets, then turns what it finds into a clear creative direction.',
  },
  {
    id: 'structure',
    number: '02',
    eyebrow: 'Story architecture',
    title: 'Give the idea a structure worth following.',
    description:
      'A scene-by-scene storyboard turns the direction into pacing, sequence, and a narrative people can follow.',
  },
  {
    id: 'compose',
    number: '03',
    eyebrow: 'Motion direction',
    title: 'Compose every frame with intent.',
    description:
      'Typography, transitions, and composition are directed as one visual system, not added as decoration.',
  },
  {
    id: 'deliver',
    number: '04',
    eyebrow: 'Studio-grade output',
    title: 'Deliver a finished introduction, ready to share.',
    description:
      'Review the result, adjust the details, and export a polished product story for launch day.',
  },
] as const;

export const audienceGroups = [
  {
    mark: '01',
    title: 'Founders',
    detail: 'Explain a new product before the market has language for it.',
  },
  {
    mark: '02',
    title: 'Product marketers',
    detail: 'Turn a launch narrative into something people can watch.',
  },
  {
    mark: '03',
    title: 'Design teams',
    detail: 'Give careful product work the presentation it deserves.',
  },
  {
    mark: '04',
    title: 'Small studios',
    detail: 'Add motion storytelling without building a production department.',
  },
] as const;

export const showcaseExamples = [
  {
    id: 'saas',
    category: 'SaaS product introduction',
    name: 'Work, beautifully.',
    tone: 'violet',
  },
  {
    id: 'mobile',
    category: 'Mobile app launch',
    name: 'Everyday, closer.',
    tone: 'lime',
  },
  {
    id: 'fintech',
    category: 'Fintech product story',
    name: 'Move with confidence.',
    tone: 'blue',
  },
  {
    id: 'ai',
    category: 'AI product story',
    name: 'A clearer point of view.',
    tone: 'rose',
  },
  {
    id: 'launch',
    category: 'Brand launch film',
    name: 'Make a first mark.',
    tone: 'silver',
  },
] as const;

export const pricingPlans = [
  {
    id: 'start',
    name: 'Start',
    summary: 'For a first product story and a clear point of view.',
    isSample: true,
  },
  {
    id: 'studio',
    name: 'Studio',
    summary: 'For teams shaping a launch across several products.',
    isSample: true,
    featured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    summary: 'For an ongoing rhythm of product storytelling.',
    isSample: true,
  },
] as const;

export const pricingDisclosure =
  'Plans are illustrative while the product is in development. No prices, billing terms, or included benefits are being offered yet.';

export const faqItems = [
  {
    question: 'What do I need to get started?',
    answer:
      'A product idea is enough. You can describe it, paste a website URL, or upload the assets you already have.',
  },
  {
    question: 'Does MotionGuru make the whole video for me?',
    answer:
      'MotionGuru develops the direction and storyboard, then helps you review and refine every scene before export.',
  },
  {
    question: 'Can I edit the result?',
    answer:
      'Yes. Scenes, words, pacing, and visual direction can be adjusted before you export the finished introduction.',
  },
  {
    question: 'Are the examples on this page real customer projects?',
    answer:
      'No. The concept frames and workflow are clearly labelled demonstrations built around a fictional product called Atlas.',
  },
  {
    question: 'How much will it cost?',
    answer:
      'Pricing has not been published yet. The plan structure shown here is illustrative only, with no prices or benefits implied.',
  },
] as const;

export const workflowStages = [
  {
    id: 'input',
    number: '01',
    label: 'Input',
    status: 'DEMONSTRATION',
    title: 'Share the product.',
    detail: 'A short brief, a website, and the assets you already have.',
  },
  {
    id: 'direction',
    number: '02',
    label: 'Direction',
    status: 'CREATIVE DIRECTION',
    title: 'Find the story.',
    detail: 'A point of view, a visual tone, and a narrative worth following.',
  },
  {
    id: 'storyboard',
    number: '03',
    label: 'Storyboard',
    status: 'SCENE PREVIEW',
    title: 'Shape the sequence.',
    detail: 'Scenes and pacing turn the direction into a storyboard.',
  },
  {
    id: 'output',
    number: '04',
    label: 'Output',
    status: 'CONCEPT PREVIEW',
    title: 'See the finished frame.',
    detail: 'A composed introduction, ready to review and export.',
  },
] as const;

export const appBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'http://localhost:5173';
