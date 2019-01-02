const Twitter = require('twitter');
const _ = require('lodash');
const async = require('neo-async');
const config = require('./conf/credentials');
const csv = require('csvtojson');

// Create Twitter client instance
const client = new Twitter(config);

// This script delete user tweets in descending date order.
// It can delete max 3200 tweets one time.


const MAX_API_REQUEST_COUNT = 3200;

let list = [];
let deleteCount = 0;
let lastTweetId = 0;

let tweetAdded = 0;
let tweetNotAdded = 0;


if (process.argv.length <= 2) {
    console.log("Missing argument: date");
    console.log("Correct syntax is: \"node clean.js 2018-12-31\"");
    process.exit(-1);
}

const limitDate = process.argv[2];
const finalTimestamp = Date.parse(limitDate);

console.log('\n' + 'Starting Operations ----------' + '\n');

csv()
  .fromFile('./files/tweets.csv')
  .on('json',(jsonObj)=>{
    const tweetTimestamp = Date.parse(jsonObj.timestamp);
    if (finalTimestamp > tweetTimestamp) {
      list.push(jsonObj.tweet_id);
      tweetAdded+=1;
    } else {
      tweetNotAdded+=1;
    }
  })
  .on('done',(error)=>{
    console.log('Considering deletion of tweets older than ' + limitDate);
    console.log('\nBuilding the list of tweets');
    console.log(tweetAdded + ' tweets added / ' + tweetNotAdded + ' tweets discarded');

    async.eachSeries(list, (tweetId, next) => {
      // If the deleteCount exceeds MAX_API_REQUEST_COUNT, it will be skipped.
      if (deleteCount > MAX_API_REQUEST_COUNT) {
        console.error("Maximum API limit reached ----------");
        return next();
      }
      // Delete specified tweets.
      console.error('\n' + "Trying to delete tweet: " + tweetId);
      client.post('statuses/destroy/' + tweetId, (err, result, response) => {
        if (err) {
          return next(err);
        }
        deleteCount++;
        lastTweetId = tweetId;
        console.log('Successfully deleted tweet ' + deleteCount + " with id: " + tweetId, );
        next();
      });
    }, (err, res) => {
      if (res) {
        console.error("Res ----------");
        console.error(res);
        // console.error("code" + err[code]);
      }

        console.log('\n' + 'Operations Finished ----------');
        console.log('Total tweets deleted: ' + deleteCount);
        if (deleteCount > 0) { console.log('Last tweet has id: ' + lastTweetId);}
        console.log('\n');

      if (err) {
        console.error("Error ----------");
        console.error(err);
        // console.error("code" + err[code]);
        return;
      }

    });



  });

