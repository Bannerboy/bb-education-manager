<div align="center">
  <a href="https://www.bannerboy.com">
    <img alt="bannerboy" src="http://bannerboy.com/img/icons/logo-stroke.svg" height="150px" />
  </a>
</div>

<br />

# Platform for managing and reviewing Tutorials and Courses

This tool is for internally reviewing and keeping track of courses that you're team is taking. The idea is that anyone can enroll in courses and review them, so others in the team can make sure they spend their time on courses that keeps a high quality.

## Current Tech-Stack

* [Create React App](https://github.com/facebook/create-react-app).
* [Firebase](https://firebase.google.com/)
* [Styled-Components](https://styled-components.com/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Firebase Setup
The current setup uses collections for storing information about the signed up users and the courses. Currently they're working towards collections named `courses` and `users` - so if you're responsible for setting up the Firebase backend; please add those in, or create your own names and update them in the [firebase.js](src/components/Firebase/firebase.js) file.

Make sure to create a dotenv for your Firebase-settings and prefix them with `REACT_APP_`.

Don't forget to set up your Firebase whitelist as the environment variables will be bundled in your code anyways.

## Styling
Currently the components are styled with Styled-Components.

This means that the stylesheets are scoped for every component, and contained inside of every component file. Inside the global folder there is a [variables.js](src/components/global/variables.js) file to adjust some values that are repeated, for more general or none-scoped styling please refer to the [globalStyle.js](src/components/global/globalStyle.js).

## Things to be done
- [ ] Write code-tests for the platform.
- [ ] Make the names in the [variables.js](src/components/global/variables.js) more general instead of color-dependant.
- [ ] Make a similar system to the "Enrolled Users" for users who completed courses.
- [ ] Styling overhaul.
- [ ] Potential system for letting users add a comment regarding the course.
- [ ] System for updating courses that have been published.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Styled-Components, check out the [Styled-Components documentation](https://styled-components.com/docs).

To learn Firebase, check out the [Firebase documentation](https://firebase.google.com/docs/reference/js) or their [YouTube channel](https://www.youtube.com/user/Firebase).