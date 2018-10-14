'use strict';

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var jQuery;
var $ = jQuery = require('jquery')(window);

module.exports = {
    parseHtml: function (html) {

        var imgRegex = /<img ([^>]+)\s?>/ig;

        var DOM = $(html.replace(imgRegex, ''));
        var posts = DOM.find('.post').toArray();

        var list = posts.map(post => {
            post = $(post);
            var author_category = post.find('.author-category').text();
            var author_category_parts = author_category.split(',');

            var href = $(post).find('h4 a').attr('href');

            if (href) {
                return {
                    'date': author_category_parts[0],
                    'author': author_category_parts[1] ? author_category_parts[1] : null,
                    'title': post.find('h4').text().trim(),
                    'url': href,
                    'string_id': post.find('h4').text().trim() + '|' + author_category + '|' + href,
                    'viewed': false
                };
            }

            return null;
        }).filter(post => {
            return post;
        });

        return list;
    }
};
