---
# This file needs front matter for Jekyll to process it; the dashes are enough.
---
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

{% assign siblings = site.pages | group_by_exp: "e", "e.url | split: '/' | pop | join: '/' | append: '/'" | sort: "name" %}

window.hyde_siblings = {
    {% for sibling in siblings %}
        {%- assign layouts = sibling.items | group_by: "layout" | sort: "name" -%}
        {{ sibling.name | jsonify }}: {
            {% for layout in layouts %}
                {%- if layout.name == "" -%}
                    {%- continue -%}
                {%- endif -%}
                    {% case layout.name %}
                        {%- when "directory" or
                                 "default" or
                                 "eng_index" or
                                 "individual_blog" or
                                 "class" or
                                 "enumeration" or
                                 "function" or
                                 "method" or
                                 "page" -%}
                            {%- assign entries = layout.items | sort: "title" -%}
                            {{layout.name | jsonify}} : [
                                {% for entry in entries %} {
                                        {%- if entry.title -%}
                                            "title" : {{entry.title | jsonify}},
                                        {%- endif -%}
                                        {%- if entry.url -%}
                                            "url" : {{entry.url | jsonify}},
                                        {%- endif -%}
                                        {%- if entry.hyde -%}
                                            "hyde" : {
                                                {%- if entry.hyde.owner -%}
                                                    "owner" : {{entry.hyde.owner | jsonify}},
                                                {%- endif -%}
                                                {%- if entry.hyde.brief -%}
                                                    "brief" : {{entry.hyde.brief | jsonify}},
                                                {%- endif -%}
                                                {%- if entry.hyde.description -%}
                                                    "description" : {{entry.hyde.description | jsonify}},
                                                {%- endif -%}
                                                {%- if entry.hyde.tab -%}
                                                    "tab" : {{entry.hyde.tab | jsonify}},
                                                {%- endif -%}
                                                {%- if entry.hyde.icon -%}
                                                    "icon" : {{entry.hyde.icon | jsonify}},
                                                {%- endif -%}
                                                {%- if entry.hyde.short_title -%}
                                                    "short_title" : {{entry.hyde.short_title | jsonify}},
                                                {%- endif -%}
                                            },
                                        {%- endif -%}
                                    },
                                {% endfor %}
                        ],
                        {%- when "library" -%}
                            {%- assign sub_libs = layout.items | group_by: "hyde.library-type" | sort: "name" -%}
                            {% for sub_lib in sub_libs %}
                                {{sub_lib.name | jsonify}} : [
                                    {%- assign entries = sub_lib.items | sort: "title" -%}
                                    {% for entry in entries %} {
                                            {%- if entry.title -%}
                                                "title" : {{entry.title | jsonify}},
                                            {%- endif -%}
                                            {%- if entry.url -%}
                                                "url" : {{entry.url | jsonify}},
                                            {%- endif -%}
                                            {%- if entry.hyde -%}
                                                "hyde" : {
                                                    {%- if entry.hyde.owner -%}
                                                        "owner" : {{entry.hyde.owner | jsonify}},
                                                    {%- endif -%}
                                                    {%- if entry.hyde.brief -%}
                                                        "brief" : {{entry.hyde.brief | jsonify}},
                                                    {%- endif -%}
                                                    {%- if entry.hyde.description -%}
                                                        "description" : {{entry.hyde.description | jsonify}},
                                                    {%- endif -%}
                                                    {%- if entry.hyde.tab -%}
                                                        "tab" : {{entry.hyde.tab | jsonify}},
                                                    {%- endif -%}
                                                    {%- if entry.hyde.icon -%}
                                                        "icon" : {{entry.hyde.icon | jsonify}},
                                                    {%- endif -%}
                                                    {%- if entry.hyde.short_title -%}
                                                        "short_title" : {{entry.hyde.short_title | jsonify}},
                                                    {%- endif -%}
                                                },
                                            {%- endif -%}
                                        },
                                    {% endfor %}
                                ],
                            {% endfor %}
                        {%- else -%}
                            "nothing!",
                    {%- endcase -%}
            {% endfor %}
        },
    {% endfor %}
};

window.hyde_index = {
    {% for sibling in siblings %}
        {%- assign layouts = sibling.items | group_by: "layout" | sort: "name" -%}
        {{ sibling.name | jsonify }}: {
            {%- for layout in layouts -%}
                {%- case layout.name -%}
                    {%- when "directory" -%}
                        {%- assign directories = layout.items | sort: "title" -%}
                        "directory": `<h3>Directories</h3>
                            <table class='associated-table'>
                                {%- for p in directories -%}
                                    <tr>
                                        <td class='name'>
                                          <div><a href="{{p.url | relative_url}}"><code>{{ p.title | escape }}</code></a></div>
                                        </td>
                                        <td class='brief'>
                                            {%- if p.hyde.brief -%}
                                                {{ p.hyde.brief | markdownify | replace: "`", "&#96;" }}
                                            {%- elsif p.hyde.description -%}
                                                {{ p.hyde.description | markdownify | replace: "`", "&#96;" }}
                                            {%- else -%}
                                                {{ '_No details given_' | markdownify | replace: "`", "&#96;" }}
                                            {%- endif -%}
                                            {%- if p.hyde.annotation -%}
                                                <span class='annotation'>({{p.hyde.annotation | join: ", "}})</span>
                                            {%- endif -%}
                                        </td>
                                    </tr>
                                    {%- endfor -%}
                            </table>`,
                    {%- when "library" -%}
                        {%- assign sub_libs = layout.items | group_by: "hyde.library-type" | sort: "name" -%}
                        {%- for sub_lib in sub_libs -%}
                            {%- case sub_lib.name -%}
                                {%- when "sourcefile" -%}
                                    {%- assign sourcefiles = sub_lib.items | sort: "title" -%}
                                    "sourcefile": `<h3>Sources</h3>
                                    <table class='associated-table'>
                                      {%- for p in sourcefiles -%}
                                        <tr>
                                            <td class='name'>
                                              <div><a href="{{p.url | relative_url}}"><code>{{ p.title | escape }}</code></a></div>
                                            </td>
                                            <td class='brief'>
                                                {%- if p.hyde.brief -%}
                                                    {{ p.hyde.brief | markdownify | replace: "`", "&#96;" }}
                                                {%- elsif p.hyde.description -%}
                                                    {{ p.hyde.description | markdownify | replace: "`", "&#96;" }}
                                                {%- else -%}
                                                    {{ '_No details given_' | markdownify | replace: "`", "&#96;" }}
                                                {%- endif -%}
                                                {%- if p.hyde.annotation -%}
                                                    <span class='annotation'>({{p.hyde.annotation | join: ", "}})</span>
                                                {%- endif -%}
                                            </td>
                                        </tr>
                                      {%- endfor -%}
                                    </table>`,
                                {%- when "library" -%}
                                    {%- assign libraries = sub_lib.items | sort: "title" -%}
                                    "library": `<h3>Subcomponents</h3>
                                    <table class='associated-table'>
                                      {%- for p in libraries -%}
                                        <tr>
                                            <td class='name'>
                                              <div><a href="{{p.url | relative_url}}">{{ p.title | escape }}</a></div>
                                            </td>
                                            <td class='brief'>
                                                {%- if p.hyde.brief -%}
                                                    {{ p.hyde.brief | markdownify | replace: "`", "&#96;" }}
                                                {%- elsif p.hyde.description -%}
                                                    {{ p.hyde.description | markdownify | replace: "`", "&#96;" }}
                                                {%- else -%}
                                                    {{ '_No details given_' | markdownify | replace: "`", "&#96;" }}
                                                {%- endif -%}
                                                {%- if p.hyde.annotation -%}
                                                    <span class='annotation'>({{p.hyde.annotation | join: ", "}})</span>
                                                {%- endif -%}
                                            </td>
                                        </tr>
                                      {%- endfor -%}
                                    </table>`,
                            {%- endcase -%}
                        {%- endfor -%}
                    {%- when "class" -%}
                        {%- assign classes = layout.items | sort: "title" -%}
                        "class": `<h3>Classes</h3>
                          <table class='associated-table'>
                            {%- for p in classes -%}
                              <tr>
                                <td class='name'>
                                  <div><a href="{{p.url | relative_url}}">{{ p.title | escape }}</a></div>
                                </td>
                                <td class='brief'>
                                  {%- if p.hyde.inline.brief -%}
                                    {{ p.hyde.inline.brief | markdownify | replace: "`", "&#96;"}}
                                  {%- endif -%}

                                  {%- if p.hyde.brief -%}
                                    {%- if p.hyde.brief == "__OPTIONAL__" or
                                           p.hyde.brief == "__INLINED__" -%}
                                      &ZeroWidthSpace;
                                    {%- else -%}
                                      {{ p.hyde.brief | markdownify | replace: "`", "&#96;"}}
                                    {%- endif -%}
                                  {%- endif -%}

                                  {%- if p.hyde.annotation -%}
                                    <span class='annotation'>({{p.hyde.annotation | join: ", "}})</span>
                                  {%- endif -%}
                                </td>
                              </tr>
                            {%- endfor -%}
                          </table>`,
                    {%- when "function" -%}
                        {%- assign functions = layout.items | sort: "title" -%}
                        "function": `<h3>Functions</h3>
                        <table class='definition-table'>
                          {%- for p in functions -%}
                            <tr>
                                <td class='decl'>
                                  <a href="{{p.url | relative_url}}">{{ p.title | escape }}</a>
                                </td>
                                <td class='defn'>
                                    {%- if p.hyde.inline.brief -%}
                                      {{ p.hyde.inline.brief | join: "<br>" | markdownify | replace: "`", "&#96;"}}
                                    {%- endif -%}
                                    {%- if p.hyde.brief -%}
                                      {%- if p.hyde.brief == "__OPTIONAL__" or
                                             p.hyde.brief == "__INLINED__" -%}
                                        &ZeroWidthSpace;
                                      {%- else -%}
                                        {{ p.hyde.brief | markdownify | replace: "`", "&#96;"}}
                                      {%- endif -%}
                                    {%- endif -%}

                                    {%- assign overload_count = p.hyde.overloads | size -%}

                                    {%- if overload_count > 1 -%}
                                      &nbsp;<span class="annotation">({{overload_count}} overloads)</span>
                                    {%- endif -%}

                                    {%- if p.hyde.annotation -%}
                                      <span class='annotation'>({{p.hyde.annotation | join: ", "}})</span>
                                    {%- endif -%}
                                </td>
                            </tr>
                          {%- endfor -%}
                        </table>`,
                    {%- when "method" -%}
                        {%- assign methods = layout.items -%}
                        "method": `<h3>Member Functions</h3>
                        <table class='definition-table'>

                        {%- for p in methods -%}
                          {%- if p.hyde.is_ctor -%}
                            <tr>
                                <td class='decl'>
                                    <a href='{{p.url | relative_url}}'>(constructor)</a>
                                </td>
                                <td class='defn'>
                                    {%- assign overload_count = p.hyde.overloads | size -%}
                                    {%- if overload_count > 1 -%}
                                        <span class="annotation">({{overload_count}} overloads)</span>
                                    {%- endif -%}
                                </td>
                            </tr>
                          {%- endif -%}
                        {%- endfor -%}

                        {%- for p in methods -%}
                          {%- if p.hyde.is_dtor -%}
                            <tr>
                                <td class='decl'><a href='{{p.url | relative_url}}'>(destructor)</a></td>
                            </tr>
                          {%- endif -%}
                        {%- endfor -%}

                        {%- for p in methods -%}
                          {%- if p.hyde.is_ctor or p.hyde.is_dtor -%}
                            {%- continue -%}
                          {%- endif -%}

                          <tr>
                            <td class='decl'>
                              <a href="{{p.url | relative_url}}">{{ p.title | escape }}</a>
                            </td>
                            <td class='defn'>
                              {%- if p.hyde.inline.brief -%}
                                {{ p.hyde.inline.brief | join: "<br>" | markdownify | replace: "`", "&#96;"}}
                              {%- endif -%}

                              {%- if p.hyde.brief -%}
                                {%- if p.hyde.brief == "__OPTIONAL__" or
                                       p.hyde.brief == "__INLINED__" -%}
                                  &ZeroWidthSpace;
                                {%- else -%}
                                  {{ p.hyde.brief | markdownify | replace: "`", "&#96;"}}
                                {%- endif -%}
                              {%- endif -%}

                              {%- assign overload_count = p.hyde.overloads | size -%}

                              {%- if overload_count > 1 -%}
                                &nbsp;<span class="annotation">({{overload_count}} overloads)</span>
                              {%- endif -%}

                              {%- if p.hyde.annotation -%}
                                <span class='annotation'>({{p.hyde.annotation | join: ", "}})</span>
                              {%- endif -%}
                            </td>
                          </tr>
                        {%- endfor -%}
                        </table>`,
                    {%- when "enumeration" -%}
                    {%- assign enums = layout.items -%}
                    "enumeration": `<h3>Enumerations</h3>
                    <table class='associated-table'>
                    {%- for p in enums -%}
                    <tr>
                      <td class='name'>
                      <div><a href="{{p.url | relative_url}}">{{ p.title | escape }}</a></div>
                      </td>
                      <td class='brief'>
                        {%- if p.hyde.inline.brief -%}
                          {{ p.hyde.inline.brief | markdownify | replace: "`", "&#96;"}}
                        {%- endif -%}

                        {%- if p.hyde.brief -%}
                          {%- if p.hyde.brief == "__OPTIONAL__" or
                                 p.hyde.brief == "__INLINED__" -%}
                            &ZeroWidthSpace;
                          {%- else -%}
                            {{ p.hyde.brief | markdownify | replace: "`", "&#96;"}}
                          {%- endif -%}
                        {%- endif -%}

                        {%- if p.hyde.annotation -%}
                          <span class='annotation'>({{p.hyde.annotation | join: ", "}})</span>
                        {%- endif -%}
                      </td>
                    </tr>
                    {%- endfor -%}
                    </table>`,
                    {%- when "page" -%}
                    {%- assign pages = layout.items | sort: "title" | reverse -%}
                    "page": `{%- for p in pages -%}
                    <tr>
                        <td>
                            <i class="fa fa-book"></i>
                        </td>
                        <td>
                            {%- if p.hyde.date -%}
                                {{ p.hyde.date }}
                            {%- endif -%}
                        </td>
                        <td>
                            <a href="{{ BASE_PATH }}{{ p.url }}">{{ p.title | markdownify | replace: "`", "&#96;" }}</a>
                        </td>
                    </tr>
                    {%- endfor -%}`,
                    {%- when "eng_index" -%}
                        {%- assign subdocs = layout.items | sort: "title" -%}
                        "eng_index":`{%- for p in subdocs -%}
                            <tr>
                                <td>
                                    <i class="fa fa-folder"></i>
                                </td>
                                <td>
                                    <a href="{{ BASE_PATH }}{{ p.url }}">{{ p.title | markdownify | replace: "`", "&#96;" }}</a>
                                </td>
                            </tr>
                            {%- endfor -%}`,
                {%- endcase -%}
            {%- endfor -%}
        },
    {% endfor %}
};

window.hyde_tabs = `
    {% assign tabbed = site.pages | where_exp:"p", "p.hyde.tab" | sort:"tab" %}
    {% for p in tabbed %}
        <a class="page-link" href="{{ p.url | prepend: site.baseurl }}">{{ p.hyde.tab }}</a>
    {% endfor %}
    `;

{%-comment-%}
// Save this for debugging purposes. Leave it commented out so it doesn't fail to parse, etc.
// window.blarglblargh = {
//     {% for sibling in siblings %}
//         {%- assign layouts = sibling.items | group_by: "layout" | sort: "name" -%}
//         {{ sibling.name | jsonify }}: {
//             {%- for layout in layouts -%}
//                 {{layout.name}},
//             {%- endfor -%}
//         },
//     {% endfor %}
// }
{%-endcomment-%}

window.hyde_title_index = {
    {% for p in site.pages %}
        {{ p.url | jsonify }}: {{ p.title | jsonify }},
    {%- endfor -%}
};
