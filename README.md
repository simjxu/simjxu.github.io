Website help for gatsby-themush


To revert changes made to files:
git reset --hard

To remove files 
git clean -f -d

Return head to the master
git checkout master

Updating remote:
git checkout master
git reset --hard <commit SHA>
git push --force origin master

Updating the website:
- Checkout the branch gh-pages
    - git fetch && git checkout gh-pages && git reset --hard origin/gh-pages
- Make edits by adding a post
- Push these changes to the gh-pages branch. 
    - git push origin gh-pages
- Run npm deploy by typing `npm run deploy`. You can see in the file "package.json" that there is a term "deploy": "gatsby build && gh-pages -d public -b master", which pushes changes to the master.
    - npm run deploy

To Do:
- Try out plugin Typography https://www.gatsbyjs.org/tutorial/part-two/
  > This allows you to set default changes without having to play with
    any CSS
- Try out CSS Modules when you get a chance (see same link above)
- Emotion lets you write CSS using JS
- Rhythm supposedly can help make the links to the blog posts look better