export const siteConfig = {
  /** Wordmark shown in the header and footer. Monograph uses text, never a logo image. */
  name: "Niccolo's Viola Garden",
  tagline: "记录生活、迷思与足球",
  title: "Niccolo's Viola Garden",
  description:
    "Niccolo 的个人博客，记录生活随想、迷思探索与佛罗伦萨足球评述",
  siteUrl: "https://natukusa.cc",
  authorName: "NIccoloNatukusaP",
  email: "",
  language: "zh-CN",
  dateLocale: "zh-CN",
  locale: "zh_CN",
  socialImage: "/og-image.png",
  /** Shown in the home sidebar "About" card. */
  about:
    "你好，我是 NIccoloNatukusaP。目前研究生在读，常驻西安。热爱足球与生态摄影。这里记录我的生活、迷思，以及一些愚蠢的足球评述。",
  /**
   * Both forms below ship enabled with an empty `action`, which makes them fully
   * interactive demos that submit nowhere: a small script confirms the submit
   * and clears the fields. Paste your provider's endpoint into `action` to send
   * real submissions, or set `enabled: false` to disable the controls outright.
   */
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "订阅更新",
    description: "新文章发布时收到邮件通知",
  },
  contact: {
    enabled: false,
    action: "",
    method: "post",
    responseTime: "",
  },
  socials: [
    { label: "RSS", href: "/rss.xml" },
  ],
};

/** Header navigation. Add or remove entries freely; the header renders them in order. */
export const navigation = [
  { label: "文章", href: "/posts/" },
  { label: "分类", href: "/categories/" },
  { label: "关于", href: "/about/" },
  { label: "友链", href: "/friends/" },
];

/** Secondary navigation rendered in the footer. */
export const footerNavigation = [
  { label: "RSS", href: "/rss.xml" },
];
