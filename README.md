# Instagram Crawled API

Simple project to random select a winner from comments of a Instagram giveway, promotion or contest using technologies learned at XXI SIECOMP

## Technologies used

- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [ExpressJs](https://expressjs.com/)
- [Express-Validator](https://express-validator.github.io/docs/)

## Crawler

### Usage

## API

Instagram RESTful API using express

### Setting up

```
$ PORT=3000 npm run server
```

#### Users

- **/users/:username** _User basic information_

  - **username** `:string - (Required) The username of a user to get information about`

  ```
  {
    "data": {
      "bio": "",
      "counts": {
        "followed_by": 0,
        "follows": 0,
        "media": 0
      },
      "full_name": "",
      "profile_picture": "",
      "username": "",
      "website": ""
    }
  }
  ```

- **/users/search?q=** _Search for a user by name_

  - **q** `:string - (Required) A query String`
  - **count** `:integer - Number of users to return`

  ```
  {
    "data": [
      {
        "full_name": "",
        "profile_picture": "",
        "username": ""
      }
    ]
  }
  ```

- **/users/:username/media/recent** _Get Recent media from a user_

  - **username** `:string - (Required) The username of a user to get recent feed`

  ```
  {
    "data": [
      {
        "link": "",
        "picture": "",
        "picture_alt": ""
      }
    ]
  }
  ```

## Articles and sites used to do this

- [Instagram API Documentation by Any ⚡️ API](https://any-api.com/instagram_com/instagram_com/docs/)
- [Best practices Express Structure](https://www.terlici.com/2014/08/25/best-practices-express-structure.html)
- [How to make input validation simple and clean in your Express.js app](https://medium.freecodecamp.org/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7)
- [Scrape Infinite Scroll with Puppeteer](https://intoli.com/blog/scrape-infinite-scroll/)
