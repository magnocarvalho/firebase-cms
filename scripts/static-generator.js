const Nightmare = require('nightmare'),
      fs = require('fs'),
      cheerio = require('cheerio'),
      mkdirp = require('mkdirp'),
      selector = 'html';

let links = [
  'https://admin-ellite.firebaseapp.com/',
  'https://admin-ellite.firebaseapp.com/blog',
  'https://admin-ellite.firebaseapp.com/products',
  'https://admin-ellite.firebaseapp.com/search',
  'https://admin-ellite.firebaseapp.com/cart'];

let getLinks = (i) => {
  let nightmareLink = Nightmare({
      waitTimeout: 300000,
      gotoTimeout: 300000,
      loadTimeout: 300000,
      executionTimeout: 300000,
    })
    .goto(links[i])
    .wait('h1 a')
    .wait(1000)
    .evaluate((selector) => {
      return document.querySelector(selector).innerHTML;
     }, selector)
    .end()
    .then((content) => {
      let $ = cheerio.load(content);
      let thelinks = $('a');
      $(thelinks).each((i, link) => {
        if (links.indexOf('https://admin-ellite.firebaseapp.com' + $(link).attr('href')) === -1) {
          links.push('https://admin-ellite.firebaseapp.com' + $(link).attr('href'));
        }
      });

      scrape();
    })
    .catch((error) => {
      console.error('Link list failed:', error);
    });
}

let scrape = () => {
  console.log(links);
  for (let x = 0; x < links.length; x++) {
    let nightmareScrape = Nightmare({
        waitTimeout: 300000,
        gotoTimeout: 300000,
        loadTimeout: 300000,
        executionTimeout: 300000,
      })
      .goto(links[x])
      .wait('h1 a')
      .wait(1000)
      .evaluate((selector) => {
        return document.querySelector(selector).innerHTML;
       }, selector)
      .end()
      .then((content) => {
        let stream;

        if (x === 0) {
          mkdirp('./static', (err) => {
            if (err) console.error('dir not created')
            else console.log('dir created')
          });
          stream = fs.createWriteStream("./static/index.html");
        } else {
          let path = './static' + links[x].replace('https://admin-ellite.firebaseapp.com', '');
          path = path.split('/');
          path = path.slice(0, -1);
          path = path.join('/');

          mkdirp(path, (err) => {
            if (err) console.error('dir not created ' + path)
            else console.log('dir created ' + path)
          });
          stream = fs.createWriteStream("./static" + links[x].replace('https://admin-ellite.firebaseapp.com', '') + ".html");
        }
        stream.once('open', (fd) => {
            stream.write(content);
            stream.end();
        })
      })
      .catch((error) => {
        console.error('Scraper failed:', error);
      });
  }
}

for (let i = 0; i < links.length; i++) {
  getLinks(i);
}