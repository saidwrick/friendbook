# Friendbook

Full Stack social media (Facebook) app that supports features such as creating accounts, profile pictures, adding & searching for friends, creating posts & comments, and likes.

[Live Demo](https://thefriendbook.netlify.app) (server might take a minute to start)

[Front-End Repo](https://github.com/saidwrick/friendbook)

[Back-End Repo](https://github.com/saidwrick/friendbook-back-end)

## Technologies
- JavaScript
- ReactJS
- NodeJS
- Express
- Vanilla CSS
- MongoDB
- Cloudniary (for pictures)
- Front-End Hosted on Netlify
- Back-End Hosted on Render

## Features
### Front-End

- Accounts
  - Create accounts with form validation (unique email required)
  - Login 
  - Authorized API access through Bearer Tokens
  - Persisted logins through localstorage, or sign-out when token expires

- User Profiles
  - Upload profile pictures
  - Expand profile picture on click
  - Edit user information
  - Show posts by user
  - Protected user pages, posts viewable only when Friend Requests are accepted
  
- Discover Users
  - Search all users
  - Filter by Friends or incoming Friend Requests
  - Friend "actions" (Add Friend, Accept Friend Request, Cancel Friend Request, Remove Friend)

- Posts and Comments
  - View posts from your friends 
  - Includes timestamp of when posts were created
  - Create and Delete posts and comments
  - Like/ Unlike posts and comments
  - Preview users who Liked content on hover and show all users in a modal on click 
  
- General
  - Dynamically generated content based on user account
  - Responsive web and mobile design
  - Graceful error handling (error messages within components when applicable, or entire 404/500 error pages)
  - Functional nav-bar, including drop-down settings menu
  - Pagination of results
  
### Back-End

- REST API
  - GET/ PUT/ POST/ DELETE actions for resources (accounts, posts, comments)
  - Proper Error Code Responses and Messages

- Database
  - Read & Write to MongoDB database using Mongoose ODM
  - Data model schemas for different resources
  - Virtual properties for computed results
 
- Security
  - Validates form content (sign-up info, posts, comments, etc.) before writing to database
  - Generate JWT tokens on Login validation (PassportJS)
  - Authorization required to access Routes
