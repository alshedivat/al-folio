/* global */
/* All content for wenhao-lu.com personal site, derived from the Jekyll source.
   No em dashes anywhere. Components read from window.SITE. */

window.SITE = {
  name: 'Wenhao Lu',
  pronounce: '/wen-how loo/',
  role: 'High School Researcher',
  affil: 'AI Safety · Interpretability · AI4Math',
  location: 'Millburn, NJ',
  email: 'wenhao.lu.2020@gmail.com',
  phone: '(862) 340-3152',
  github: 'welu2027',
  linkedin: 'wenhaolu2027',
  instagram: 'welu28_',
  scholar: '5qOpxRYAAAAJ',

  summary: [
    "I'm a high school junior focused on AI safety, alignment, and policy. My research spans spectral graph theory, mechanistic interpretability, and AI4Math: three corners of the same question, can we build AI systems that stay accountable as they get more capable than us?",
    "Currently building NEXT Horizon, a STEM talent accelerator in 25+ countries backed by HRT, Codecrafters, and others, and WorldModelLens, the first interpretability library for world models.",
    "Olympiad competitor turned startup enthusiast. In my free time: creative writing, spikeball, baseball. Always down to talk research, weird ideas, or what to read next."
  ],

  tags: ['ai-safety','interpretability','world-models','llm-alignment','ai4math','spectral-graph-theory'],

  /* ---------- now (building) ---------- */
  now: [
    {
      kicker: 'BUILDING',
      title: 'NEXT Horizon',
      desc: 'STEM talent accelerator in 25+ countries. Backed by HRT, CodeCrafters, and 8 other sponsors. 650+ in the career pipeline.',
      stats: ['25+ countries', '10 sponsors', '650+ students'],
      href: 'https://nxthorizon.org',
    },
    {
      kicker: 'OPEN SOURCE',
      title: 'WorldModelLens',
      desc: 'First interpretability and observability library for World Models. Activation hooks, causal interventions, SAE-style concept discovery across DreamerV3, V-JEPA, IRIS.',
      stats: ['ai safety', 'mech-interp', 'WIP'],
      href: 'https://github.com/Bhavith-Chandra/WorldModelLens',
    },
  ],

  /* ---------- news ---------- */
  news: [
    { date: 'May 2026', html: 'Released <strong>WorldModelLens v0.2</strong>: interpretability for DreamerV3, V-JEPA, and IRIS in one toolkit.' },
    { date: 'Apr 2026', html: '<strong>NEXT Horizon</strong> expanded to <strong>25+ countries</strong>; new sponsorships from HRT and CodeCrafters.' },
    { date: 'Apr 2026', html: 'Selected as <strong>Non-Trivial Research Scholar</strong>.' },
    { date: 'Mar 2026', html: 'Earned <strong>USACO Platinum</strong> Division.' },
    { date: 'Mar 2026', html: 'Delegate on AI &amp; AI Governance at <strong>Harvard HPAIR VCONF</strong>.' },
    { date: 'Feb 2026', html: 'Joined <strong>NYU</strong> as an AI Safety Researcher; only high schooler in the group.' },
    { date: 'Jan 2026', html: 'Started <strong>Graph2Proof</strong> research at Stevens Institute of Technology.' },
  ],

  /* ---------- publications ---------- */
  publications: [
    {
      abbr: 'Diabetes',
      year: 2025,
      title: 'A Multi-Scenario Mathematical Modeling Framework for Equitable Semaglutide Coverage Allocation via Ensemble-Based Risk Scoring and Actuarial Cost Projection',
      authors: ['Lu, Wenhao', 'Xie, Amelia', 'You, Yimei'],
      venue: 'Diabetes, vol. 74, supplement 1, pp. 1050-P. American Diabetes Association.',
      abstract: 'Developed a novel risk stratification model for Semaglutide insurance coverage that replaces traditional affordability criteria with a necessity-driven approach, advancing health equity and projecting $269 billion in 10-year savings for the U.S. healthcare system.',
      tags: ['mathematical-modeling','health-equity','actuarial-science','policy','social-good'],
      links: [
        { label: 'scholar', href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=5qOpxRYAAAAJ&citation_for_view=5qOpxRYAAAAJ:u5HHmVD_uO8C' },
      ],
      selected: true,
    },
    {
      abbr: 'IEEE',
      year: 2026,
      title: 'Graph2Proof: Topology-Aware Reward Shaping for Natural Language Theorem Proving',
      authors: ['Lu, Wenhao'],
      venue: 'To appear in IEEE Xplore.',
      abstract: 'A two-phase framework that augments GRPO with a GNN-derived structural reward from a contrastively pre-trained proof-graph encoder (ProofGAT, separation margin 1.141), achieving 58.73% on FIMO and 61.46% on PutnamBench. Ranks 3rd and 4th overall, outperforming all open-source models at 32 to 72B scale.',
      tags: ['ai4math','llms','theorem-proving','graph-neural-networks','rl','spectral-graph-theory'],
      links: [
        { label: 'github', href: 'https://github.com/welu2027/Graph2Proof' },
      ],
      selected: true,
    },
    {
      abbr: 'IEEE',
      year: 2025,
      title: 'Topological and Spectral Fingerprints of Mathematical Proof Correctness: Structural, Laplacian, and Kernel-Based Characterizations',
      authors: ['Lu, Wenhao'],
      venue: 'To appear in IEEE Xplore.',
      abstract: 'Characterizes 10,000 theorem-proof graphs from DeepTheorem using structural, spectral, and kernel-based analysis. Correct proofs are more compact with higher Fiedler values (stronger logical connectivity via Cheeger\'s inequality). Proof graphs are 3.2x more similar within a theorem than across theorems, making them problem fingerprints first, correctness signals second.',
      tags: ['ai4math','theorem-proving','graph-neural-networks','spectral-graph-theory'],
      links: [
        { label: 'github', href: 'https://github.com/welu2027/Graph2Proof' },
      ],
      selected: false,
    },
  ],

  /* ---------- projects ---------- */
  projects: [
    {
      title: 'WorldModelLens',
      category: 'open-source',
      year: '2026',
      tagline: 'The first interpretability and observability library for World Models.',
      summary: 'Plays the role TransformerLens plays for LLMs, built for world model architectures: IRIS, DreamerV3, V-JEPA.',
      motivation: 'Mech-interp tools like TransformerLens and Neuronpedia were built entirely for LLMs. Researchers working on world models had to write custom one-off probing code per architecture, a massive barrier to the field.',
      novelty: 'Unified API for activation caching, causal interventions (activation patching, path patching), linear probing, SAE-style concept discovery, OOD detection, and belief / uncertainty tracking across diverse WM architectures. A Neuronpedia-style interactive visualization platform is in development.',
      impact: 'Making world models interpretable is a direct AI safety imperative. As world models scale into robotics and autonomous driving, WorldModelLens enables researchers to detect deceptive signals, belief instability, and hallucinations before they affect real-world behavior.',
      tags: ['world-models','mech-interp','state-space-models','ai-safety'],
      links: [
        { label: 'github', href: 'https://github.com/Bhavith-Chandra/WorldModelLens' },
      ],
    },
    {
      title: 'CIPHER',
      category: 'benchmark',
      year: '2026',
      tagline: 'Calibrated Introspection via Partially Hidden Environment Rules.',
      summary: 'A procedural benchmark testing whether LLMs can recognize and act on what they don\'t know.',
      motivation: 'LLMs are routinely deployed in settings where the right answer is "I don\'t know yet." Existing benchmarks reward fluent answers, not calibrated ones, leaving metacognition mostly unmeasured.',
      novelty: 'Procedurally-generated synthetic worlds with deliberately hidden causal rules and fully invented vocabulary. Models are scored across objective performance, calibration, attention to unknowns, and plan quality, in environments they could not have memorized.',
      impact: 'A reusable yardstick for the gap between knowing and knowing-you-know. Hosted on Kaggle Benchmarks for any model to compete.',
      tags: ['benchmarks','metacognition','llms','agi','reasoning'],
      links: [
        { label: 'github', href: 'https://github.com/welu2027/CIPHER' },
        { label: 'kaggle', href: 'https://www.kaggle.com/benchmarks/wenhaolu49/cipher' },
      ],
    },
    {
      title: 'Graph2Proof',
      category: 'research',
      year: '2026',
      tagline: 'Topology-aware reward shaping for natural-language theorem proving.',
      summary: 'A two-phase framework that augments GRPO with a GNN-derived structural reward from a contrastively pre-trained proof-graph encoder.',
      motivation: 'LLM theorem provers are rewarded only on final correctness, ignoring the structure of the proof they produced. Spectral graph theory offers a principled way to score intermediate proof structure.',
      novelty: 'ProofGAT, a contrastively trained graph attention encoder (separation margin 1.141), produces structural rewards that are added to GRPO rollouts. The system reaches 58.73% on FIMO and 61.46% on PutnamBench.',
      impact: 'Ranks 3rd on FIMO and 4th on PutnamBench overall, outperforming all open-source models at 32 to 72B scale, while using significantly smaller backbones.',
      tags: ['ai4math','llms','theorem-proving','graph-neural-networks','rl','spectral-graph-theory'],
      links: [
        { label: 'github', href: 'https://github.com/welu2027/Graph2Proof' },
      ],
    },
    {
      title: 'Where Does Knowledge Go?',
      category: 'research',
      year: '2025',
      tagline: 'Mechanistic tracing of temporal forgetting in RL-trained LLMs.',
      summary: 'Localizes temporal forgetting in RL-trained LLMs to a critical transformer layer range using activation patching, logit-lens, and representational geometry on Qwen2.5-7B DeepScaler checkpoints.',
      motivation: 'Prior work on forgetting in LLMs tracks what is forgotten through benchmark drops, but provides no insight into where inside the network that forgetting occurs.',
      novelty: 'Uses training checkpoints of Qwen2.5-7B on DeepScaler to find cases where earlier checkpoints answer correctly but later ones fail, then applies logit-lens, activation patching, and representational geometry (CKA, PCA trajectory analysis) to pinpoint responsible layers and heads.',
      impact: 'Localizing forgetting to specific transformer components provides actionable targets for regularization and circuit preservation during RL fine-tuning.',
      tags: ['mechanistic-interpretability','llms','rl','ai4math','reasoning'],
      links: [
        { label: 'github', href: 'https://github.com/welu2027/Temporal_Forgetting_Layer' },
      ],
    },
    {
      title: 'Semaglutide Coverage Model',
      category: 'research',
      year: '2025',
      tagline: 'Math modeling for equitable insurance coverage.',
      summary: 'A novel risk stratification model for Semaglutide insurance coverage replacing traditional affordability criteria with a necessity-driven approach.',
      motivation: 'Current Semaglutide coverage is gated by affordability tests, leaving high-need patients out. A health-equity-first model is missing in the literature.',
      novelty: 'Multi-scenario mathematical modeling framework using ensemble-based risk scoring and actuarial cost projection. Clinically validated with an MD collaborator at Atlantic Health System.',
      impact: 'Projects $269 billion in 10-year savings for the U.S. healthcare system. First-author paper published in Diabetes. Sole high school poster presenter at ADA 85th Scientific Sessions.',
      tags: ['mathematical-modeling','health-equity','actuarial-science','policy','social-good'],
      links: [
        { label: 'paper', href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=5qOpxRYAAAAJ&citation_for_view=5qOpxRYAAAAJ:u5HHmVD_uO8C' },
      ],
    },
  ],

  /* ---------- CV (from _data/cv.yml) ---------- */
  cv: {
    education: [
      {
        institution: 'Millburn High School',
        location: 'Millburn, NJ',
        when: '2023 to 2027',
        title: 'High School Diploma',
        score: 'GPA: 4.84 W / 4.00 UW. SAT: 1570 (800 M / 770 RW).',
        bullets: [
          "AP Biology, AP CSA, AP CSP, AP Physics 1 &amp; 2, AP Precalculus, AP Statistics, APUSH, AP Lang, AP Euro.",
        ],
      },
    ],
    research: [
      {
        company: 'New York University',
        position: 'AI Safety Researcher',
        location: 'New York, NY',
        when: '2026 to present',
        bullets: [
          "Building <strong>WorldModelLens</strong>, the first interpretability and observability library for world models and SSMs, analogous to TransformerLens but for WM architectures (IRIS, DreamerV3, V-JEPA). Only high schooler in a research group of NYU grad students.",
          "Developing a Neuronpedia-style interactive visualization platform to allow researchers to inspect world model internals in real time.",
        ],
      },
      {
        company: 'Wellesley College',
        position: 'Mathematics &amp; Democracy Researcher',
        location: 'Wellesley, MA',
        when: '2026 to present',
        bullets: [
          "Conducting interdisciplinary mathematical research on democratic systems as part of Wellesley College's Institute for Mathematics and Democracy (IMD). Incoming, summer 2026.",
        ],
      },
      {
        company: 'Stevens Institute of Technology',
        position: 'Spectral Graph Theory Researcher',
        location: 'Hoboken, NJ',
        when: '2025 to present',
        bullets: [
          "Developed <strong>Graph2Proof</strong>, the first spectral graph theory framework for topology-aware reward shaping in LLM proof generation and topological characterization of proof correctness.",
          "Introduced a spectral graph theory framework to characterize emergent reasoning behavior for interpretable model evaluation.",
          "3 IEEE / ICML manuscripts under review. Currently working on improving spectral graph theory techniques for image segmentation.",
        ],
      },
      {
        company: 'Atlantic Health System (Bridgewater Internal Medicine)',
        position: 'Math Modeling &amp; Policy Researcher',
        location: 'Bridgewater, NJ',
        when: '2024 to 2025',
        bullets: [
          "Developed a novel risk stratification model for equitable Semaglutide insurance coverage, advancing health equity and projecting $269 billion in 10-year U.S. healthcare savings.",
          "Collaborated with MD for clinical validation. Sole high school poster presenter at ADA 85th Scientific Sessions. First-author publication in Diabetes (DOI: 10.2337/db25-1050-P).",
        ],
      },
    ],
    experience: [
      {
        company: 'NEXT Horizon',
        position: 'Founder &amp; CEO',
        location: 'Remote',
        when: '2024 to present',
        bullets: [
          "Scaled talent accelerator equipping underrepresented students left behind in STEM with the skills, mentorship, and real-world experience to unlock STEM pathways and careers. Expanded to 25+ countries and 650+ in career pipeline.",
          "Backed by 10 sponsors including HRT and CodeCrafters (YC S22). Partnered with executives from PayPal, AWS, Meta, Microsoft.",
        ],
      },
      {
        company: 'Mustang Math',
        position: 'Regional Director',
        location: 'United States',
        when: '2025 to present',
        bullets: [
          "Lead regional operations for a national middle school math competition serving 1,500+ competitors annually, leading 200+ volunteers across 34 U.S. states.",
          "Directed the annual regional tournament cycle, including volunteer management, logistics, communications, and outreach.",
        ],
      },
      {
        company: 'Mockly',
        position: 'Machine Learning Intern',
        location: 'Remote',
        when: '2025',
        bullets: [
          "Early-stage AI startup led by undergrads from CMU, Caltech, and UT Austin focused on AI-powered mock interview training.",
          "Designed and implemented a production-ready, end-to-end streamlined AI training pipeline enabling high-quality AI mock interview analysis.",
        ],
      },
    ],
    awards: [
      { date: '2026', title: 'USACO Platinum Division', by: 'USA Computing Olympiad' },
      { date: '2026', title: 'Scholastic National Silver Medal', by: 'Alliance for Young Artists &amp; Writers' },
      { date: '2026', title: 'Harvard HPAIR VCONF, Delegate on AI &amp; AI Governance', by: 'Harvard Project on Asian &amp; International Relations' },
      { date: '2026', title: 'YC Startup School India Invitee (declined, travel)', by: 'Y Combinator' },
      { date: '2026', title: 'Non-Trivial Research Scholar', by: 'Non-Trivial' },
      { date: '2025', title: 'USAJMO Honorable Mention', by: 'Mathematical Association of America' },
      { date: '2025', title: 'ADA 85th Scientific Sessions Presenter', by: 'American Diabetes Association' },
      { date: '2025', title: 'US Navy Naval Horizons Highest Honors', by: 'US Navy, Office of Naval Research' },
      { date: '2024', title: 'Perfect Game USA Baseball: 2x PG Northeast All-State Selection. #75 ranked club team nationally (#3 NJ).', by: 'Perfect Game USA' },
    ],
    skills: [
      { name: 'Programming Languages', vals: 'Python, Java, MATLAB, LaTeX' },
      { name: 'Machine Learning', vals: 'PyTorch, scikit-learn, world models' },
      { name: 'Data Analysis', vals: 'Pandas, NumPy, Matplotlib' },
      { name: 'Management', vals: 'Logistics, sponsorships, startup operations' },
    ],
  },

  /* ---------- reading & listening ---------- */
  reading: {
    books: [
      { title: 'The Godfather', author: 'Mario Puzo', note: 'family, power, the slow logic of decisions you can\'t undo' },
      { title: 'AI 2027', author: 'Kokotajlo et al.', note: 'sober forecasting under uncertainty' },
      { title: 'Anthropic interpretability papers', author: 'various', note: 'circuits, SAE features, monosemanticity' },
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', note: 're-read every year' },
    ],
    listening: [
      { title: 'Lex Fridman #401', author: 'Demis Hassabis' },
      { title: 'Dwarkesh Patel', author: 'Sholto Douglas &amp; Trenton Bricken' },
      { title: '80,000 Hours', author: 'on AI governance' },
      { title: 'Conviction', author: 'Sarah Tavel' },
    ],
    elsewhere: [
      'spikeball + baseball',
      'creative writing, mostly short fiction',
      'random olympiad problems on the train',
      'cooking dumplings on weekends',
    ],
  },

  /* ---------- blog placeholder ---------- */
  blog: [
    /* When you write posts, drop them here:
       { date: 'Jun 2026', title: '...', summary: '...', len: '12 min', href: '#' } */
  ],
};
