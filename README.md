# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

## Product Screenshots

![Screenshot of Tweeter](https://raw.githubusercontent.com/zixialu/tweeter/master/docs/tweeter-main.png)
![Screenshot of compose form](https://raw.githubusercontent.com/zixialu/tweeter/master/docs/tweeter-compose.png)

## Getting Started

1. Install dependencies using the `npm install` command.
2. Create a `.env` file in the root directory with a cookie session key configured. This string will be used to encrypt users' cookies. The key should be in the following form:

   ```env
   COOKIE_SESSION_KEY=<YOUR_SECRET_KEY>
   ```

3. Start MongoDB using the `mongo` command, using the default port (27017).
4. Start the web server using the `npm start` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Node 5.10.x or above
- MongoDB 2.2.x
- Express
- body-parser
- chance
- cookie-session
- dotenv
- md5
