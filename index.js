const config = require('./config');
const twit = require('twit');
const T = new twit(config);
const twts = require('./data/tweets.js');
const tweets = twts.tweets;

const spence = '880634071419846657';
const burgers = '15751083';
const duckboi = '865898987836014592';
const henry = '925160703006330880';

//streams for burgers and replies
console.log("listening...")
var stream = T.stream('statuses/filter', {follow: burgers});
stream.on('tweet', function(tweet, err){
  console.log("we found a tweet...");
  console.log(tweet);
  var statusObj = {status: "@" + tweet.user.screen_name + " tired of this guy? lets replace him with @willfisher4cong",
                in_reply_to_status_id: tweet.id_str
}
  T.post('statuses/update', statusObj, function(err,tweetReply, resp){
    if(err){
      console.log("error in posting", err)
    }
    console.log("it worked!!");
    console.log(tweetReply.text);
  });
});

//streams for someone and retweets
var stream2 = T.stream('statuses/filter', {follow: duckboi});
 stream2.on('tweet', function(tweet, err){
   var retweet = tweet.id_str;
   T.post('statuses/retweet/:id', { id: retweet }, function (err, data, response) {
     console.log(data)
   });
 });


 //streams for mentions of someone
 var stream3 = T.stream('statuses/filter', {track: "rep michael burgess"})
  stream.on('tweet', function(tweet){
    console.log("we found a tweet...");
    var statusObj = {status: "sup @" + tweet.user.screen_name + "? wanna replace burgess? follow @willfisher4cong",
                    in_reply_to_status_id: tweet.id_str
    }
    T.post('statuses/update', statusObj, function(err,tweetReply, resp){
      if(err){
        console.log("error in posting", err)
      }
      console.log("it worked!!");
      console.log(tweetReply.text);
    });
  });


//follow reply
const stream4 = T.stream('user')
  stream4.on('follow',followed)
  function followed(eventMsg){
    console.log("the follow bot is starting")
    var screenName = eventMsg.source.screen_name;
    tweetIt({status: "sup @" + screenName + " thanks for the follow I all the support I can get to make sure @realdonaldtrump keeps getting his daily intake of dicks" });
  }
  function tweetIt(params){
        T.post('statuses/update', params, tweeted);
        function tweeted(err, data, response){
          if(err){
            console.log("there was an error", err);
          }
          else{
            console.log("it worked!!!")
          }x
      }
  }
