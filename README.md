# Instagram Crawled API

Simple project to random select a winner from comments of a Instagram giveway, promotion or contest using technologies learned at XXI SIECOMP

## Technologies used

- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [ExpressJs](https://expressjs.com/)

## API

Instagram RESTful API using express

### Setting up

```
$ PORT=3000 npm run server
```

#### Users

- **/users/{user-name}** _User basic information_
  - **user-name** `The username of a user to get information about`
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
