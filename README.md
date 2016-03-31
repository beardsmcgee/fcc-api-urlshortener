example usage:

POST to http://www.urlshortener.com with json {"url":"http://www.google.com"}
will return {"original_url":"http://www.google.com", "short_url":"http://www.urlshortener.com/1"}

GET to http://www.urlshortener.com/1 will redirect the browser to http://www.google.com

created using node / express / mongo