# 01-Login

## Running the Sample

Install the dependencies.

```bash
npm install
```

Rename `.env.example` to `.env` and replace the values as follows:
* `AUTH0_CLIENT_ID` - the client id of the application you are testing
* `AUTH0_DOMAIN` - you auth0 domain/tenant
* `AUTH0_CLIENT_SECRET` - the client secret of the application you are testing 
* `AUTH0_CALLBACK_URL` - the callback URL to return after successfull authentication 
* `PORT` - the port number to run the sample app
* `AUTH0_API_CLIENT_ID` - the client id of an api application required in order to modify the demo application callback uri (see [creating api app](#creating-api-application))
* `AUTH0_API_CLIENT_SECRET` - the client secret of an api application required in order to modify the demo application callback uri (see [creating api app]


```bash
# copy configuration and replace with your own
cp .env.example .env
```

Run the app.

```bash
npm start
```

The app will be served at `localhost:PORT`.

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

### Creating API Application

1. In you Auth0 management console, go to the **APIs** sub-menu
2. Make sure you have an API defined, if not create one
3. Go to **Applications** sub-menu
4. Click on **Create Application**
5. Select **Machine to Machine Application** and click create
6. Select the API reference from the drop-list 
7. Select all scopes
8. Click Authorize (will create the app)

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

