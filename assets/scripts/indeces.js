---
---
{% assign siblings = site.pages | group_by_exp: "e", "e.url | split: '/' | pop | join: '/' | append: '/'" | sort:"name" %}

window.hyde_index = {
    {% for sibling in siblings %}
        {{ sibling.name | jsonify }}: {
            {% assign sub_libs = sibling.items | where: "layout", "library" %}

            {% assign directories = sibling.items | where: "layout", "directory" | sort: "title" %}
            "directory":
            {% if directories.size != 0 %}
`<h3>Directories</h3>
<table class='associated-table'>
                {% for p in directories %}
    <tr>
        <td class='name'>
          <div><a href="{{p.url}}"><code>{{ p.title | escape }}</code></a></div>
        </td>
        <td class='brief'>
            {%- if p.brief -%}
                {{ p.brief | markdownify }}
            {%- elsif p.description -%}
                {{ p.description | markdownify }}
            {%- else -%}
                {{ '_No details given_' | markdownify }}
            {%- endif -%}
            {%- if p.annotation -%}
                <span class='annotation'>({{p.annotation | join: ", "}})</span>
            {%- endif -%}
        </td>
    </tr>
                {% endfor %}
</table>`,
            {% else %}
            "",
            {% endif %}

            {% assign sourcefiles = sub_libs | where: "library-type", "sourcefile" | sort: "title" %}
            "sourcefile":
            {% if sourcefiles.size != 0 %}
`<h3>Sources</h3>
<table class='associated-table'>
  {% for p in sourcefiles %}
    <tr>
        <td class='name'>
          <div><a href="{{p.url | relative_url}}"><code>{{ p.title | escape }}</code></a></div>
        </td>
        <td class='brief'>
            {% if p.brief %}
                {{ p.brief | markdownify }}
            {% elsif p.description %}
                {{ p.description | markdownify }}
            {% else %}
                {{ '_No details given_' | markdownify }}
            {% endif %}
            {% if p.annotation %}
                <span class='annotation'>({{p.annotation | join: ", "}})</span>
            {% endif %}
        </td>
    </tr>
  {% endfor %}
</table>`,
            {% else %}
            "",
            {% endif %}

            {% assign libraries = sub_libs | where: "library-type", "library'" | sort: "title" %}
            "library":
            {% if libraries.size != 0 %}
`<h3>Subcomponents</h3>
<table class='associated-table'>
  {% for p in libraries %}
    <tr>
        <td class='name'>
          <div><a href="{{p.url | relative_url}}">{{ p.title | escape }}</a></div>
        </td>
        <td class='brief'>
            {% if p.brief %}
                {{ p.brief | markdownify }}
            {% elsif p.description %}
                {{ p.description | markdownify }}
            {% else %}
                {{ '_No details given_' | markdownify }}
            {% endif %}
            {% if p.annotation %}
                <span class='annotation'>({{p.annotation | join: ", "}})</span>
            {% endif %}
        </td>
    </tr>
  {% endfor %}
</table>`
            {% else %}
            "",
            {% endif %}

            {% assign classes = sibling.items | where: "layout", "class" | sort: "title" %}
            "class":
            {% if classes.size != 0 %}
            `<h3>Classes</h3>
              <table class='associated-table'>
                {% for p in classes %}
                  <tr>
                    <td class='name'>
                      <div><a href="{{p.url | relative_url}}">{{ p.title | escape }}</a></div>
                    </td>
                    <td class='brief'>
                      {% if p.brief %}
                        {{ p.brief | markdownify }}
                      {% elsif p.description %}
                        {{ p.description | markdownify }}
                      {% else %}
                        {{ '_No details given_' | markdownify }}
                      {% endif %}
                      {% if p.annotation %}
                        <span class='annotation'>({{p.annotation | join: ", "}})</span>
                      {% endif %}
                    </td>
                  </tr>
                {% endfor %}
              </table>`
            {% else %}
            "",
            {% endif %}

            {% assign functions = sibling.items | where: "layout", "function" | sort: "title" %}
            "function":
            {% if functions.size != 0 %}
            `<h3>Functions</h3>
            <table class='associated-table'>
              {% for p in functions %}
                <tr>
                    <td class='name'>
                      <div><a href="{{p.url | relative_url}}">{{ p.title | escape }}</a></div>
                    </td>
                    <td class='brief'>
                        {% if p.brief %}
                            {{ p.brief | markdownify }}
                        {% elsif p.description %}
                            {{ p.description | markdownify }}
                        {% else %}
                            {{ '_No details given_' | markdownify }}
                        {% endif %}
                        {% if p.annotation %}
                            <span class='annotation'>({{p.annotation | join: ", "}})</span>
                        {% endif %}
                    </td>
                </tr>
              {% endfor %}
            </table>`
            {% else %}
            "",
            {% endif %}

        },
    {%endfor%}
};
