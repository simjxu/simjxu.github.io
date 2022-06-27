---
layout: post
title: How to make a Syntax highlighted Notepad with Sublime
date: "2019-02-08"
---

To create a new syntax, go to Tools >> Developer >> New Syntax. This creates a .sublime-syntax file which you can use to edit what color the text will show as. Under the "match:" key value pair, you use regex to determine which types of text it matches. In the example shown below, I have dates with a newline character highlight as orange. The orange color for the Mariana theme matches the "scope:" key value pair of constant.numeric. What I essentially had done was look in the Mariana.sublime-color-scheme file to determine that this scope was an orange color.

Typically, this file is found in Sublime Text 3 >> Packages >> User. On Mac, this is under <username>/Library/Application Support/Sublime Text 3/Packages

To edit the Mariana theme file, on Mac use CMD+Shift+P to open the command palette, type "View Package File", and then type in Mariana to edit the file Mariana.sublime-color-scheme.

My file is called Plain text.sublime-syntax


```yaml
%YAML 1.2
---
%YAML 1.2
---
# http://www.sublimetext.com/docs/3/syntax.html
name: Regular Text
file_extensions:
  - txt
scope: text.plain
contexts:
  main:
    # Line starting with **
    - match: '^\*\*.*'
      push:
        - meta_scope: meta.separator
        - match: '$\n?'
          pop: true
    # # Highlight Plan
    # - comment: Plan (case-insensitive)
    #   match: \b(?:Plan)\b
    #   scope: support.function
    # Dates
    - comment: Dates
      match: '[0-9]{1,2}(/)[0-9]{1,2}(/)[0-9]{1,2}\n'
      scope: constant.numeric
      pop: true
    # Meeting
    - comment: Meetings
      match: '.*Mtg.*\n'
      scope: meta.diff
      pop: true
    # Feedback
    - comment: Feedback
      match: 'Feedback:'
      scope: variable.member
      pop: true
    # Important
    - comment: Important
      match: '.*::'
      scope: support.function
      pop: true
    # Finished
    - comment: Finished
      match: '.*`'
      scope: punctuation.section
      pop: true
    # Finished comment
    - comment: Comment after a backtick
      match: '(?<=`):.*'
      scope: string
      pop: true
    # Todo
    - comment: To do
      match: '^[ \t]*> .*'
      scope: keyword.operator
      pop: true
    # # Update (with . in pink)
    # - comment: Update
    #   match: '^[ \t]*\. .*\n'
    #   scope: meta.diff
    #   pop: true
    # Update (with . in yellow)
    - comment: Update
      match: '^[ \t]*\. .*\n'
      scope: markup.bold
      pop: true
    
```

Below is my modified Mariana file, which adds additional color variables. You can edit the Mariana.sublime-color-scheme directly in the folder <username>/Library/Application Support/Sublime Text 3/Packages/User

```json
{
    "name": "Mariana",
    "author": "Sublime HQ Pty Ltd, Dmitri Voronianski",
    "variables":
    {
        "black": "hsl(0, 0%, 0%)",
        "blue": "hsl(210, 50%, 60%)",
        "blue-vibrant": "hsl(210, 60%, 60%)",
        "blue2": "hsla(210, 13%, 40%, 0.7)",
        "blue3": "hsl(210, 15%, 22%)",
        "blue4": "hsl(210, 13%, 45%)",
        "blue5": "hsl(180, 36%, 54%)",
        "blue6": "hsl(221, 12%, 69%)",
        "green": "hsl(114, 31%, 75%)",
        "greengray": "hsl(114, 25%, 45%)",
        "grey": "hsl(0, 0%, 20%)",
        "orange": "hsl(32, 93%, 66%)",
        "orange2": "hsl(32, 85%, 55%)",
        "orange3": "hsl(40, 94%, 68%)",
        "pink": "hsl(312, 96%, 68%)",
        "red": "hsl(357, 79%, 65%)",
        "red2": "hsl(13, 99%, 65%)",
        "white": "hsl(0, 0%, 100%)",
        "white2": "hsl(0, 0%, 97%)",
        "white3": "hsl(219, 28%, 88%)",
        "yellow": "hsl(58, 100%, 72%)"
    },
    "globals":
    {
        "foreground": "var(white3)",
        "background": "var(blue3)",
        "accent": "var(blue-vibrant)",
        "caret": "var(orange)",
        "line_highlight": "var(blue2)",
        "selection": "var(blue2)",
        "selection_border": "var(blue4)",
        "inactive_selection": "var(blue2)",
        "misspelling": "var(red)",
        "shadow": "color(var(black) alpha(0.25))",
        "active_guide": "var(blue5)",
        "stack_guide": "color(var(blue5) alpha(0.5))",
        "highlight": "var(blue5)",
        "find_highlight_foreground": "var(grey)",
        "find_highlight": "var(orange3)",
        "brackets_options": "underline",
        "brackets_foreground": "var(orange)",
        "bracket_contents_options": "underline",
        "bracket_contents_foreground": "var(blue5)",
        "tags_options": "stippled_underline",
        "tags_foreground": "var(pink)"
    },
    "rules":
    [
        {
            "name": "Comment",
            "scope": "comment, punctuation.definition.comment",
            "foreground": "var(blue6)"
        },
        {
            "name": "String",
            "scope": "string",
            "foreground": "var(green)"
        },
        {
            "name": "Punctuation",
            "scope": "punctuation.definition - punctuation.definition.numeric.base",
            "foreground": "var(blue5)"
        },
        {
            "name": "Number",
            "scope": "constant.numeric",
            "foreground": "var(orange)",
            "background": "var(blue4)"
        },
        {
            "name": "Number Suffix",
            "scope": "storage.type.numeric",
            "foreground": "var(pink)",
            "font_style": "italic"
        },
        {
            "name": "Built-in constant",
            "scope": "constant.language",
            "foreground": "var(red)",
            "font_style": "italic"
        },
        {
            "name": "User-defined constant",
            "scope": "constant.character, constant.other",
            "foreground": "var(pink)"
        },
        {
            "name": "Member Variable",
            "scope": "variable.member",
            "foreground": "var(red)"
        },
        {
            "name": "Keyword",
            "scope": "keyword - keyword.operator, keyword.operator.word",
            "foreground": "var(pink)"
        },
        {
            "name": "Operators",
            "scope": "keyword.operator",
            "foreground": "var(red2)"
        },
        {
            "name": "Punctuation",
            "scope": "punctuation.separator, punctuation.terminator",
            "foreground": "var(yellow)"
        },
        {
            "name": "Punctuation",
            "scope": "punctuation.section",
            "foreground": "var(greengray)"
        },
        {
            "name": "Accessor",
            "scope": "punctuation.accessor",
            "foreground": "var(blue6)"
        },
        {
            "name": "Annotation Punctuation",
            "scope": "punctuation.definition.annotation",
            "foreground": "var(blue5)"
        },
        {
            "name": "JavaScript Dollar",
            "scope": "variable.other.dollar.only.js, variable.other.object.dollar.only.js, variable.type.dollar.only.js, support.class.dollar.only.js",
            "foreground": "var(blue5)"
        },
        {
            "name": "Storage",
            "scope": "storage",
            "foreground": "var(red)"
        },
        {
            "name": "Storage type",
            "scope": "storage.type",
            "foreground": "var(pink)",
            "font_style": "italic"
        },
        {
            "name": "Entity name",
            "scope": "entity.name.function",
            "foreground": "var(blue5)"
        },
        {
            "name": "Entity name",
            "scope": "entity.name - (entity.name.section | entity.name.tag | entity.name.label)",
            "foreground": "var(orange)"
        },
        {
            "name": "Inherited class",
            "scope": "entity.other.inherited-class",
            "foreground": "var(blue5)",
            "font_style": "italic"
        },
        {
            "name": "Function argument",
            "scope": "variable.parameter",
            "foreground": "var(orange)"
        },
        {
            "name": "Language variable",
            "scope": "variable.language",
            "foreground": "var(red)",
            "font_style": "italic"
        },
        {
            "name": "Tag name",
            "scope": "entity.name.tag",
            "foreground": "var(red)"
        },
        {
            "name": "Tag attribute",
            "scope": "entity.other.attribute-name",
            "foreground": "var(pink)"
        },
        {
            "name": "Function call",
            "scope": "variable.function, variable.annotation",
            "foreground": "var(blue)"
        },
        {
            "name": "Library function",
            "scope": "support.function, support.macro",
            "foreground": "var(blue)",
            "font_style": "bold italic"
        },
        {
            "name": "Library constant",
            "scope": "support.constant",
            "foreground": "var(pink)",
            "font_style": "italic"
        },
        {
            "name": "Library class/type",
            "scope": "support.type, support.class",
            "foreground": "var(blue)",
            "font_style": "italic"
        },
        {
            "name": "Invalid",
            "scope": "invalid",
            "foreground": "var(white2)",
            "background": "var(red)"
        },
        {
            "name": "Invalid deprecated",
            "scope": "invalid.deprecated",
            "foreground": "var(white2)",
            "background": "var(orange2)"
        },
        {
            "name": "YAML Key",
            "scope": "entity.name.tag.yaml",
            "foreground": "var(blue5)"
        },
        {
            "name": "YAML String",
            "scope": "source.yaml string.unquoted",
            "foreground": "var(white3)"
        },
        {
            "name": "markup headings",
            "scope": "markup.heading",
            "font_style": "bold"
        },
        {
            "name": "markup headings",
            "scope": "markup.heading punctuation.definition.heading",
            "foreground": "var(red2)"
        },
        {
            "name": "markup h1",
            "scope": "markup.heading.1 punctuation.definition.heading",
            "foreground": "var(red)"
        },
        {
            "name": "markup links",
            "scope": "string.other.link, markup.underline.link",
            "foreground": "var(blue)"
        },
        {
            "name": "markup bold",
            "scope": "markup.bold",
            "foreground": "var(yellow)",
        },
        {
            "name": "markup italic",
            "scope": "markup.italic",
            "font_style": "italic"
        },
        {
            "name": "markup underline",
            "scope": "markup.underline",
            "font_style": "underline"
        },
        {
            "name": "markup bold/italic",
            "scope": "markup.italic markup.bold | markup.bold markup.italic",
            "font_style": "bold italic"
        },
        {
            "name": "markup bold/underline",
            "scope": "markup.underline markup.bold | markup.bold markup.underline",
            "font_style": "bold underline"
        },
        {
            "name": "markup italic/underline",
            "scope": "markup.underline markup.italic | markup.italic markup.underline",
            "font_style": "italic underline"
        },
        {
            "name": "markup bold/italic/underline",
            "scope": "markup.bold markup.italic markup.underline | markup.bold markup.underline markup.italic | markup.italic markup.bold markup.underline | markup.italic markup.underline markup.bold | markup.underline markup.bold markup.italic | markup.underline markup.italic markup.bold",
            "font_style": "bold italic underline"
        },
        {
            "name": "markup hr",
            "scope": "punctuation.definition.thematic-break",
            "foreground": "var(orange)"
        },
        {
            "name": "markup numbered list bullet",
            "scope": "markup.list.numbered.bullet",
            "foreground": "var(green)",
            "font_style": "bold"
        },
        {
            "name": "markup blockquote",
            "scope": "markup.quote punctuation.definition.blockquote, markup.list punctuation.definition.list_item",
            "foreground": "var(orange)"
        },
        {
            "name": "markup code",
            "scope": "markup.raw",
            "background": "color(var(blue2) alpha(0.38))"
        },
        {
            "name": "markup code",
            "scope": "markup.raw.inline",
            "background": "color(var(blue2) alpha(0.5))"
        },
        {
            "name": "markup punctuation",
            "scope": "(text punctuation.definition.italic | text punctuation.definition.bold)",
            "foreground": "var(pink)"
        },
        {
            "name": "diff.header",
            "scope": "meta.diff, meta.diff.header",
            "foreground": "var(pink)",
            "font_style": "bold underline"
        },
        {
            "name": "diff.deleted",
            "scope": "markup.deleted",
            "foreground": "var(red)"
        },
        {
            "name": "diff.inserted",
            "scope": "markup.inserted",
            "foreground": "var(green)"
        },
        {
            "name": "diff.changed",
            "scope": "markup.changed",
            "foreground": "var(orange)"
        },
        {
            "name": "CSS Properties",
            "scope": "support.type.property-name",
            "foreground": "var(white3)"
        },
        {
            "scope": "constant.numeric.line-number.match",
            "foreground": "var(red)"
        },
        {
            "scope": "message.error",
            "foreground": "var(red)"
        },

        {
            "scope": "diff.deleted",
            "background": "hsla(357, 45%, 60%, 0.15)",
            "foreground_adjust": "l(+ 5%)"
        },
        {
            "scope": "diff.deleted.char",
            "background": "hsla(357, 60%, 60%, 0.30)",
            "foreground_adjust": "l(+ 10%)"
        },
        {
            "scope": "diff.inserted",
            "background": "hsla(180, 45%, 60%, 0.15)",
            "foreground_adjust": "l(+ 5%)"
        },
        {
            "scope": "diff.inserted.char",
            "background": "hsla(180, 60%, 60%, 0.30)",
            "foreground_adjust": "l(+ 10%)"
        },
    ]
}

```

Results:
![sublime_pic](https://raw.githubusercontent.com/simjxu/simjxu.github.io/gh-pages/img/sublime-highlight.jpg)