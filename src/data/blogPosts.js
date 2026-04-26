export const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Architecture: Micro-frontends or Monoliths?",
    excerpt: "Exploring the shifting paradigms in modern web development and how to choose the right architecture for your scale.",
    date: "April 10, 2024",
    readTime: "8 min read",
    category: "Architecture",
    author: {
      name: "Dr. Elena Vasquez",
      role: "Associate Professor",
      avatar: "/images/pic.jpeg"
    },
    tags: ["React", "Architecture", "Micro-frontends"],
    image: "/images/pic.jpeg",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "The debate between micro-frontends and monoliths has reached a fever pitch in 2024. As applications grow in complexity, the traditional monolithic approach often becomes a bottleneck for large, distributed teams."
      },
      {
        type: "heading",
        text: "The Rise of Micro-frontends"
      },
      {
        type: "paragraph",
        text: "Micro-frontends bring the benefits of microservices to the frontend. They allow teams to work independently on different parts of an application, using different technologies if necessary. However, this comes with its own set of challenges, including shared state management and consistent styling."
      },
      {
        type: "code",
        language: "javascript",
        code: "const App = () => {\n  return (\n    <MicroFrontendContainer>\n      <ModuleFederationPlugin />\n    </MicroFrontendContainer>\n  );\n};"
      },
      {
        type: "paragraph",
        text: "When deciding which path to take, consider your team structure first. If you have a single team, a monolith is almost always the right choice. If you have ten teams, micro-frontends might be your salvation."
      }
    ]
  }
];
