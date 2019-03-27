const ROOT = "#react-root > section > main > div > div > article";
const USER = `${ROOT} > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > h2 > a`;
const MORE_BUTTON = `${ROOT} > div.eo2As > div.EtaWk > ul > li:nth-child(2) > div > button`;
const COMMENTS_BOX = `${ROOT} > div.eo2As > div.EtaWk > ul`;
const COMMENT = `ul > li > div.P9YgZ > div.C7I1f`;
const CAPTION_TEXT = `li:nth-child(1) > div > div > div > span`;
const FROM_PROFILE_PICTURE = `div.RR-M-.TKzGu > a > img`; // Logged in feature
const FROM_USERNAME = `div.C4VMK > h3`;
const COMMENT_TEXT = `div.C4VMK > span`;
const COMMENT_CREATED_TIME = `div.C4VMK > div.Igw0E > div._7UhW9 > time`; // Logged in feature

const MEDIA_HEADER = `${ROOT} > header`;
const CREATOR_PROFILE_PICTURE = `div.RR-M-.h5uC0.mrq0Z > span > img`;
const CREATOR_USERNAME = `div.o-MQd > div.PQo_0 > div.e1e1d > h2 > a`;
const LOCATION_NAME = `div.o-MQd > div.M30cS > a`;
const CREATION_TIME = `${ROOT} > div.eo2As > div.k_Q0X.NnvRN > a > time`;
const LIKES_COUNT_IMAGE = `${ROOT} > div.eo2As > section.EDfFK.ygqzn > div > div > a > span`;
const LIKES_VIDEO_BUTTON = `${ROOT} > div.eo2As > section.EDfFK.ygqzn > div > span`;
const LIKES_COUNT_VIDEO = `${ROOT} > div.eo2As > section.EDfFK.ygqzn > div > div > div.vJRqr > span`;
const LEFT_BOX = `${ROOT} > div._97aPb.wKWK0 > div > div`;
const USERS_IN_PHOTO = `${LEFT_BOX} > div.xUdfV`;
const USERNAME_IN_PHOTO = `a > span > span`;
const VIDEO = `${LEFT_BOX} > div > div.GRtmf.wymO0 > div > video`;
const IMAGE = `div.KL4Bh > img`;
const IMAGES = `${LEFT_BOX} > div > div.tN4sQ.zRsZI > div > div > div > ul > li`;
const IMAGE_FROM_IMAGES = `div > div > div > div.KL4Bh > img`;

module.exports = {
  USER,
  MORE_BUTTON,
  COMMENTS_BOX,
  COMMENT,
  CAPTION_TEXT,
  FROM_USERNAME,
  COMMENT_TEXT,
  MEDIA_HEADER,
  CREATOR_PROFILE_PICTURE,
  CREATOR_USERNAME,
  LOCATION_NAME,
  CREATION_TIME,
  LIKES_COUNT_IMAGE,
  VIDEO,
  LEFT_BOX,
  USERS_IN_PHOTO,
  USERNAME_IN_PHOTO,
  IMAGE,
  IMAGES,
  IMAGE_FROM_IMAGES,
  LIKES_COUNT_VIDEO,
  LIKES_VIDEO_BUTTON
};
