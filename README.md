**Old tweets cleaner**
--
Specify a date, and watch all your older tweets get deleted 

Node.js module for deleting tweets based on a .csv archive file from Twitter. You must first get your archive file from your [Twitter account](https://twitter.com/settings/account). Be careful, you can't use the newer archive file [available here](https://twitter.com/settings/your_twitter_data) because you will get a different file (.js) instead of a .csv file.

--

**1 - Install this script** 
--
Node.js must be already installed on your system

```
$ cd your/project/directory
```
> Go into the working project directory and run the following:


```
$ npm install
```
> This will install all necessary packages / dependencies in the project


**2 - Adjust your settings**
--

* Edit the file "credentials-template.js" with your [Twitter App tokens](https://developer.twitter.com/en/apps)
* Save it as "credentials.js" in the "conf" folder
* Copy your tweets.csv file into the "files" folder


**3 - Start the process**
--

###WARNING:###
The script will NOT ask for an extra confirmation.
If tweets are matching your query, they WILL BE DELETED right away. So remember this: "Measure twice, cut once!"

> Run the script with:

```
$ node clean.js 2018-12-31
```
And don't forget to specify the date!


**Results**
--

> Results will be displaying something like this:

```
Starting Operations ----------
Considering deletion of tweets older than 2018-12-31

Building the list of tweets
99 tweets added / 666 tweets discarded

Trying to delete tweet: 0001112223334445678
Successfully deleted tweet 1 with id: 0001112223334445678

>> [Looping through individual tweets here]

Operations Finished ----------
Total tweets deleted: 99

```



## Credits

This is a fork of the [original project from kakts](https://github.com/kakts/tweet-cleaner). It's also inspired by the fork of [Sujal](https://github.com/sujal/tweet-cleaner).