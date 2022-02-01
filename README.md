# Project-Management (client)

To run this client you need :

  - yarn
  - Node.js

If you work on Windows this link are utils to install yarn :

- https://www.liquidweb.com/kb/how-to-install-yarn-on-windows/
- https://sung.codes/blog/2017/12/30/yarn-global-add-command-not-work-windows/

## For dev
To run client use the following commands :

  - yarn install :
    download all the necessary node mudules to run the server.

  - yarn start:
    Run the client on localhoost:3001

## For deploy on Appach server

Create an .htaccess file and fill it in as follows:

Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

