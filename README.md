# NC-News front end app

This project is the frontend component to support the news backend [available here](https://github.com/Mielie/NewsAppBackEnd).

The backend is currently being served using render and a copy of this app is running on netlify and is [available here](https://my-nc-news.netlify.app)

## Requirements

This project was written using Node.js v19.3.0 and react.js v18.2.0

## Usage

The front-end UI is responsive and will work on devices as small as an iPhone SE. On first visiting the site you can view with pagination, filter (based on article topic and/or author) and sort articles as well as read user comments for each article. Logging in to the services using the login link in the top right will enable you to vote up articles and comments as well as make new comments and delete any comments that originated from that user account.

The app supports URL search and sort queries in addition to using the UI.

## Running locally

To run the app locally first clone the repository:

`git clone https://github.com/Mielie/nc-news`

The install the dependencies from the project root folder:

`npm install`

To execute the run script:

`npm run start`
