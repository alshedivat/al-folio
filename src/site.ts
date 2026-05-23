export const site = {
  firstName: "Arnau",
  middleName: "",
  lastName: "Jimenez Castany",
  email: "arnau.jc91@gmail.com",
  description:
    "A personal website for software, machine learning, physics, and writing.",
  blogName: "Blog",
  blogDescription: "about Physics and Deep Learning",
  githubUsername: "arnaujc91",
  linkedinUrl: "https://www.linkedin.com/in/arnaujc91/",
};

export const fullName = [site.firstName, site.middleName, site.lastName]
  .filter(Boolean)
  .join(" ");
