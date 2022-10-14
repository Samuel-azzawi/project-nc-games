## Running the repo

- Create the files `.env.development`, `.env.test`.
- Inside each file you should add `PGDATABASE=nc_games`, `PGDATABASE=nc_games_test`, respectively.

### Install the project's dependencies:

- Make sure that you have npm, superuser, pg, dotenv and express installed by running the following.

```sh
npm install
npm install express
npm install pg
npm install dotenv
npm install superuser
```

## Functions clarification

- All functions inside controllers end with C.
- All functions inside models end with M.

## Notes

- Make sure to add .env and node_modules files to .gitignore.
- Use `npm run test` to run the tests.
- if you want to run the server locally you can use `npm run start`.
