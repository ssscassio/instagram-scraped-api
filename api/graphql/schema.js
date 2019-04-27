export default `
type Counts {
  followed_by: Int
  follows: Int
  media: Int
}
type User {
  username: String
  full_name: String
  counts: Counts
  profile_picture: String
  website: String
  bio: String
  isPrivate: Boolean
}
type Video {
  src: String
  thumbnail: String
}
type UserName {
  username: String
}
type Location {
  name: String
}
type Image {
  url: String
  height: Int
  width: Int
}
type Comment {
  text: String
  from: UserName
}
type MediaPreview {
  link: String
  picture: String
  picture_alt: String
  id: String
}
type Media {
  id: String
  created_time: String
  link: String
  type: String
  likes: Int
  comments: [Comment]
  caption: [Comment]
  images: [Image]
  location: Location
  users_in_photo: [UserName]
  videos: [Video]
}
type UserSearch {
  username: String
  full_name: String
  profile_picture: String
}
type Query {
  user(username: String): User!
  search(query: String, count: Int): [UserSearch]
  media(mediaId: String): Media!
  feed(username: String): [MediaPreview]
}
`;
