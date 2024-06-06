# jekyll-theme-adobe-hyde

This is a [Jekyll theme](https://jekyllrb.com/docs/themes/) for use with the [Hyde C++ documentation tool](https://github.com/adobe/hyde). The theme works directly with [GitHub Pages](https://pages.github.com/).

This theme is based on [the slate theme](jekyll-theme-slate) and incorporates a number of templates we've developed for various [Hyde based sites](http://stlab.cc/libraries/stlab2Fcopy_on_write.hpp/copy_on_write3CT3E/).

The inspiration for the layout comes from [cppreference](https://en.cppreference.com/w/cpp/string/basic_string). Please help us improve the templates by [contributing](#contributing)!

###### Table Of Contents

<!-- TOC depthFrom:2 depthTo:5 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installation](#installation)
	- [GitHub Pages](#github-pages)
	- [Using Ruby Gems (does not work with GitHub pages)](#using-ruby-gems-does-not-work-with-github-pages)
- [Usage](#usage)
	- [Adding a Header Image](#adding-a-header-image)
	- [Customizing the Theme](#customizing-the-theme)
- [Contributing](#contributing)
- [Development](#development)
- [License](#license)

<!-- /TOC -->

## Installation

### GitHub Pages

If using GitHub Pages or the [jekyll-remote-theme plugin](https://github.com/benbalter/jekyll-remote-theme), specify the theme as a remote theme in your `_config.yml` file:

```
remote_theme: adobe/hyde-theme@v2.0.2
```

It is strongly recommended that you use a version tag to avoid having an updated version of the theme break your site.

### Using Ruby Gems (does not work with GitHub pages)

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

### Adding a Header Image

The following configuration options can be used in the `_config.yml` file

```yaml
adobe_hyde:
    # The header image to use on the site
    header_image: <relative url of image>
    # The source url root for the documented code, i.e. `https://github.com/<org>/<repo>/blob/main`
    source_root: <source url root>
    # The path root for the documented code, corresponding to the `hyde --hyde-yaml-dir=` option, i.e. `/includes` if `hyde --hyde-yaml-dir=./includes`
    hyde_yaml_dir: <hyde yaml dir>
```

### Customizing the Theme

The theme includes variable overrides that won't overwrite theme files. This lets you customize some of the layout and coloring parameters of the theme, and still keep up with the latest theme changes easily. To start, copy these three files from the theme to the same location in your local Jekyll site:

  - `_sass/_overrides.scss`
  - `_sass/_overrides-light.scss`
  - `_sass/_overrides-dark.scss`

You can customize theme variables within these files. See an example of this in the [`stlab.cc` repository](https://github.com/stlab/stlab.github.io/tree/master/_sass).

_TODO: More documentation is needed for features such as `{% include figure.md %}`._

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/adobe/hyde-theme. This project is intended to be a safe, welcoming space for collaboration. Please see the [code of conduct](./CODE_OF_CONDUCT.md) and [contributing](./.github/CONTRIBUTING.md) documents.

## Development

_TODO: These instructions need to be updated. We don't currently have test content in the repo._

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `jekyll-theme-adobe-hyde.gemspec` accordingly.

## Cleanup / Linting

To run the cleanup / linter tool over the files in this repository:

    find . -name '*.scss' | xargs -L 1 bundle exec sass-convert -i

## License

The theme is available as open source under the terms of the [Apache License 2.0](./LICENSE.txt).
