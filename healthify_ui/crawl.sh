cd ../healthify
pwd
rm $1
scrapy crawl ingredients -o $1 -a source=fullmeals -a recipe=$2