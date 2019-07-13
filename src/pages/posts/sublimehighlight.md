---
layout: post
title: How to make a Syntax highlighted Notepad with Sublime
date: "2019-02-08"
---

To create a new syntax, go to Tools >> Developer >> New Syntax. This creates a .sublime-syntax file which you can use to edit what color the text will show as. Under the "match:" key value pair, you use regex to determine which types of text it matches. In the example shown below, I have dates with a newline character highlight as orange. The orange color for the Mariana theme matches the "scope:" key value pair of constant.numeric. What I essentially had done was look in the Mariana.sublime-color-scheme file to determine that this scope was an orange color.
Typically, this file is found in Sublime Text 3 >> Packages >> User 
My file is called Plain text.sublime-syntax


```yaml
%YAML 1.2
---
# http://www.sublimetext.com/docs/3/syntax.html
name: Regular Text
file_extensions:
  - txt
scope: text.plain
contexts:
  main:
    # Dates
    - comment: Dates
      match: '[0-9]{1,2}(/)[0-9]{1,2}(/)[0-9]{1,2}\n'
      scope: constant.numeric
      pop: true
    # Highlight Plan
    - comment: Plan (case-insensitive)
      match: \b(?:Plan)\b
      scope: support.function
```

Results:
![sublime_pic](https://raw.githubusercontent.com/simjxu/simjxu.github.io/master/img/sublime-highlight.jpg)