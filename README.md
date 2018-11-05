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
> go to gatsby-themush
> Make updates to the site there
npm run deploy

To Do:
- Try out plugin Typography https://www.gatsbyjs.org/tutorial/part-two/
  > This allows you to set default changes without having to play with
    any CSS
- Try out CSS Modules when you get a chance (see same link above)
- Emotion lets you write CSS using JS
- Rhythm supposedly can help make the links to the blog posts look better