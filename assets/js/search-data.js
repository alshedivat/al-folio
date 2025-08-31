// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "news-from-obfuscated-garbage-to-clarity",
          title: 'From Obfuscated Garbage to Clarity',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_3/";
            },},{id: "news-slices-of-suspicion-the-pentagon-pizza-theory",
          title: 'Slices of Suspicion – The Pentagon Pizza Theory',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_1/";
            },},{id: "news-brilliant-and-simple-filename-based-sandbox-evasion",
          title: 'Brilliant and Simple - Filename-Based Sandbox Evasion',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-promptly-bad-idea-malware-meets-ai",
          title: 'A Promptly Bad Idea - Malware Meets AI',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_4/";
            },},{id: "news-lamehug-russians-let-gpt-do-the-dirty-work",
          title: 'LameHug - Russians Let GPT Do the Dirty Work',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_5/";
            },},{id: "news-plague-in-your-pam-silent-stealthy-persistent",
          title: 'Plague in Your PAM – Silent, Stealthy, Persistent',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_6/";
            },},{id: "news-volt-typhoon-constructed-intelligence-or-defeated-adversary",
          title: 'Volt Typhoon – Constructed Intelligence or Defeated Adversary?',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_7/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%65%6C%6C%6F@%6D%62%6F%6C%6C.%65%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/kaeptenbalu", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/manuel-boll-78097b217/", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://ctftime.org/user/82511", "_blank");
        },
      },{
        id: 'social-custom_social1',
        title: 'Custom_social1',
        section: 'Socials',
        handler: () => {
          window.open("https://freakazoids.de/", "_blank");
        },
      },{
        id: 'social-custom_social2',
        title: 'Custom_social2',
        section: 'Socials',
        handler: () => {
          window.open("https://app.hackthebox.com/profile/61653", "_blank");
        },
      },{
        id: 'social-custom_social3',
        title: 'Custom_social3',
        section: 'Socials',
        handler: () => {
          window.open("https://www.credly.com/users/manuel-boll/badges#credly", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
