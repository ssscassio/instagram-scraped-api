const HEADER = `#react-root > section > main > div > header`;
const USERNAME = `${HEADER} > section > div.nZSzR > h1`;
const FULL_NAME = `${HEADER} > section > div.-vDIg > h1`;
const PROFILE_PICTURE = `${HEADER} > div > div > span > img`;
const PROFILE_PICTURE_PRIVATE = `${HEADER} > div > div > div > button > img`;
const BIO = `${HEADER} > section > div.-vDIg > span`;
const WEBSITE = `${HEADER} > section > div.-vDIg > a.yLUwa`;
const COUNTS = `${HEADER} > section > ul`;
const MEDIA_COUNT = `${COUNTS} > li:nth-child(1) > a > span`;
const FOLLOWED_BY_COUNT = `${COUNTS} > li:nth-child(2) > a > span`;
const FOLLOWS_COUNT = `${COUNTS} > li:nth-child(3) > a > span`;
const IS_PRIVATE = `#react-root > section > main > div > div.Nd_Rl._2z6nI > article > div > div > h2`;

module.exports = {
  USERNAME,
  FULL_NAME,
  PROFILE_PICTURE,
  PROFILE_PICTURE_PRIVATE,
  BIO,
  WEBSITE,
  MEDIA_COUNT,
  FOLLOWED_BY_COUNT,
  FOLLOWS_COUNT,
  IS_PRIVATE
};
