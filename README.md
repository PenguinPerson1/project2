App - Has universal framing elements
  / - Shows favorited topics (possibly recent cards)
  /add - Allows you to add a new note
  /c/:category - Displays overall info for category and list of topics
    /t/:topic - Displays all cards under this topic (add search)
  /n/:id - Displays a single notecard and allows you to edit/delete it
  

Notes: [
  {
    id: 1
    category: javascript
    topic: objects
    title: Objects Using Class
    text: a bunch of text I don't want to write out
    links: [
      http://aLinkThatIsTotallyReal,
      http://anotherRealLink
    ]
  },
  {
    id: 2
    category: react
    topic: structure
    title: How to Navigate with Components
    text: a bunch of text I don't want to write out
    links: [
      http://aLinkThatIsTotallyReal,
      http://anotherRealLink
    ]
  }
]
Favorites: [
  ["javascript","objects"],
  ["react","structure"]
]
Recents: [
  1,
  2
]
