# jekyll-theme-adobe-hyde

This is a [Jekyll theme](https://jekyllrb.com/docs/themes/) for use with the [Hyde C++ documentation tool](https://github.com/adobe/hyde). The theme works directly with [GitHub Pages](https://pages.github.com/).

This theme is based on [the slate theme](jekyll-theme-slate) and incorporates a number of templates we've developed for various [Hyde based sites](http://stlab.cc/libraries/stlab2Fcopy_on_write.hpp/copy_on_write3CT3E/).

The inspiration for the layout comes from [cppreference](https://en.cppreference.com/w/cpp/string/basic_string). Please help us improve the templates by [contribute](#contributing)!

## Installation

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "jekyll-theme-adobe-hyde"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: jekyll-theme-adobe-hyde
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install jekyll-theme-adobe-hyde

## Usage

To add a header image in the `_config.yml` add

```yaml
adobe_hyde:
    header_image: <relative url of image>
```

_Write usage instructions here. Describe your available layouts, includes, sass and/or assets._

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/adobe/hyde-theme. This project is intended to be a safe, welcoming space for collaboration. Please see the [code of conduct](./CODE_OF_CONDUCT.md) and [contributing](./.github/CONTRIBUTING.md) documents.

## Development

_These instructions need to be updated. We don't currently have test content in the repo._

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `jekyll-theme-adobe-hyde.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [Apache License 2.0](./LICENSE.txt).
