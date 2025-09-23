// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'iontail', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'manual', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 4, // How many projects to display.
        exclude: {
          forks: false, // Forked projects will not be displayed if set to true.
          projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        // Properties for manually specifying projects
        projects: ['iontail/N-TIDE', 'iontail/BRNet', 'rkdrn79/CoReaP', 'iontail/dive_into_mamba'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [
        {
          title: 'N-TIDE: Debiasing Unimodal Vision Models via Neutral Text Inversion with CLIP',
          description:
            'Research on mitigating social bias in unimodal vision models by leveraging CLIP-based neutral-text inversion inspired by the null-text inversion in DDIM and knowledge distillation to train a debiased image-only classifier.',
          imageUrl:
            'https://raw.githubusercontent.com/iontail/N-TIDE/main/assets/N_TIDE.png',
          link: 'https://github.com/iontail/N-TIDE.git',
        },
        {
          title: 'BRNet: a Bio-Receptor Networks for Object Detection with Zero-Shot Domain Adaptation',
          description:
            'Research on the low- light object detection task with boosting domain adaptation between low-light and well-lit conditions, carrying out experiments to validate and refine the proposed methodology.',
          imageUrl:
            'https://raw.githubusercontent.com/iontail/BRNet/main/assets/BRNet.png',
          link: 'https://github.com/iontail/BRNet.git',
        },
        {
          title: 'CoReaP: Collaborative Reconstruction with assitive priors',
          description:
            'An image inpainting model leveraging Deformable Convolution Tokenization (DCT), integrated Early and Late Fusion strategies, and a two-stream learning architecture comprising high-frequency and low-frequency pathways connected via inclusion residual connections, with high-frequency information serving as a prior for low-frequency refinement.',
          imageUrl:
            'https://raw.githubusercontent.com/rkdrn79/CoReaP/main/assets/coreap_teaser.png',
          link: 'https://github.com/rkdrn79/CoReaP.git',
        },
      ],
    },
  },
  seo: { title: 'Portfolio of Ariful Alam', description: '', imageURL: '' },
  social: {
    linkedin: 'chanheelee3722',
    x: '',
    mastodon: '',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '', // example: 'pewdiepie'
    udemy: '',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // example: '1/jeff-atwood'
    discord: '',
    telegram: '',
    website: '',
    phone: '',
    email: 'leechanhye3722@gmail.com',
  },
  resume: {
    fileUrl:
      'https://github.com/iontail/iontail/blob/main/Chanhee_Lee_CV_2025_08.pdf', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'python',
    'pytorch',
    'opencv',
    'numpy',
    'pandas'
  ],
  experiences: [
    {
      company: 'Efficient Learning Lab, Sungkyunkwan University',
      position: 'Position',
      from: 'August 2025',
      to: 'Present',
      companyLink: 'https://ell.skku.edu/',
    },
  ],
  certifications: [
    {
      name: 'ADsP',
      body: 'Advanced Data Analytics Semi-Professional',
      year: 'March 2024',
      link: 'https://www.dataq.or.kr/www/main.do',
    },
  ],
  educations: [
    {
      institution: 'Sungkyunkwan University',
      degree: 'Bachelor of Science in Applied Artificial Intelligence',
      from: '2021',
      to: 'Present',
    },
  ],
  publications: [],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: '', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 0, // How many articles to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: { id: '', snippetVersion: 6 },
  themeConfig: {
    defaultTheme: 'snowfall',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'caramellatte',
      'abyss',
      'silk',
      'procyon',
      'snowfall',
    ],
    bannerImageUrl: '/banner.jpg',
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with <a 
      class="text-primary" href="https://github.com/arifszn/gitprofile"
      target="_blank"
      rel="noreferrer"
    >GitProfile</a> and ❤️`,

  enablePWA: true,
};

export default CONFIG;
