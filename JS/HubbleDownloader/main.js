var scrape = require('scrape');
var _ = require('underscore')._;
var async = require('async');
var http = require('http-get');
var path = require('path');

var urlFunc = function(page){ return "http://www.spacetelescope.org/images/page/" + page };
var baseUrl = "http://www.spacetelescope.org";
var pathSaveTo = "/Volumes/New Mac HD/Downloads/MyHubble/";

var imagePageQueue = async.queue(function (image, callback) {
    console.log("Starting with: " + image.url + " on page " + image.page);
    
    scrape.request(image.url, function (err, $) {
        if (err){
            callback();
            return console.error(err);
        }
        
        var found = false;
        var urls = $(".archive_download .archive_dl_text a").map(function(a){ return a.attribs.href;});
        var imageUrl = _.find(urls, function(url){ return url.indexOf('/publicationjpg/') > -1});
        if(!imageUrl){
            imageUrl = _.find(urls, function(url){ return url.indexOf('/large/') > -1});
        }
        if(imageUrl){
            http.get(baseUrl + imageUrl, pathSaveTo + path.basename(imageUrl), function (error, result) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('File downloaded at: ' + result.file);
                }
                callback();
            });
        }else{
            console.error("Can't find link for " + image.url + "\nList of links:" + urls.join(", "));
            callback();
        }
    });
    

}, 10);

var imagesListPageQueue = async.queue(function (page, callback) {
    console.log("Starting page "+page);
    scrape.request(urlFunc(page), function (err, $) {
        var imagePages = $(".archive_normal td.imagerow a").map(function(a){
            return {url: baseUrl + a.attribs.href, page:page};
        });
        console.log("Page "+page+" contains "+imagePages.length+" images");
        imagePageQueue.push(imagePages);
        callback();
    });
}, 10);

for(var page=1; page<67; page++) {
    imagesListPageQueue.push(page);
}