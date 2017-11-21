# BlogAssignment

## Live Version

A live version of above project is hosted at http://latin-potatoes.bitballoon.com. For back-end, a demo server using json-server was hosted on Heroku at https://morning-sea-25541.herokuapp.com/. Append 'blogposts', 'users', or 'userdetails' to the end of heroku link to get information.

If you refresh the bitballoon link, start from the root again, that is http://latin-potatoes.bitballoon.com. Changes made to the server (creating a new post, favoriting, deleting, etc.) will revert back to original if the Heroku app is inactive for more than 30 minutes. 

## Implementations

- Login (Username and Password details can be found at [link](https://morning-sea-25541.herokuapp.com/users))
- Recent posts can be viewed on the home page.
- All the posts can be seen in 'All Posts' section.
- Click on title of the post or 'read more' to open a detailed view of the post.
- Creating, Updating, Deleting, and Favoriting a post, all of which require login.

## Additional Implementations

- Click on 'Search/Filter' in the nagivation bar for search functionality based on blog title and filtering using blog category.
- As Navbar is a long-living component, its change-detection behavior was set to 'OnPush'. Imformation is communicated to it using shared services and BehaviorSubjects from RxJS.
- All the components w/o a direct relationship communicate with each other using shared services and BehaviorSubjects.
