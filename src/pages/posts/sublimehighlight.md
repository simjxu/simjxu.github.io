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
    # Highlight Plan
    - comment: Plan (case-insensitive)
      match: \b(?:Plan)\b
      scope: support.function
    # Dates
    - comment: Dates
      match: '[0-9]{1,2}(/)[0-9]{1,2}(/)[0-9]{1,2}\n'
      scope: constant.numeric
      pop: true
    # Meeting
    - comment: Meetings
      match: '.*Meeting.*\n'
      scope: string
      pop: true
    # Meeting
    - comment: Meetings
      match: '.*mtg\n'
      scope: string
      pop: 
    # Feedback
    - comment: Feedback
      match: 'Feedback.*\n'
      scope: variable.member
      pop: true
    # Important
    - comment: Important
      match: '.*:\n'
      scope: support.function
      pop: true
```

Results:
![sublime_pic](https://raw.githubusercontent.com/simjxu/simjxu.github.io/gh-pages/img/sublime-highlight.jpg)