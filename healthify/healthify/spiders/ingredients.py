import scrapy
import healthify.config as config
from healthify.items import HealthifyItem


class TypeOne(scrapy.Spider):
    name = 'ingredients'

    def start_requests(self):
        source = getattr(self, 'source', None)
        recipe_link = getattr(self, 'recipe', None)
        print recipe_link
        if source is None or source not in config.SOURCES:
            raise Exception("Invalid source!!!")
        if recipe_link is None:
            raise Exception("Invalid Recipe!!!")
        self.crawl_source = config.SOURCES[source]
        self.allowed_domains = self.crawl_source['ALLOWED_DOMAINS']
        self.start_url = self.crawl_source['START_URLS'][0] + recipe_link
        print self.start_url
        yield scrapy.Request(self.start_url, callback=self.parse)

    def parse(self, response):
        item = HealthifyItem()
        for element in response.xpath(self.crawl_source['XPATH']):
            text = element.xpath(self.crawl_source['TEXT_XPATH']).extract()
            item['text'] = text
            yield item
