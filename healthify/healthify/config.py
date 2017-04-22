SOURCES = {
    "fullmeals": {
                "NAME": "fullmeals",
                "ALLOWED_DOMAINS": "http://fullmeals.com",
                "START_URLS": [
                    "http://fullmeals.com/"
                ],
                "XPATH": "//div[contains(@class,'ingredients')]/ul/li/span",
                "TEXT_XPATH": "text()",
    }
}
