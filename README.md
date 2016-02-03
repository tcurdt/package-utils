# package-compose

Allows you to merge multiple `package.json` files into one.


Install globally or locally

    npm install -g package-compose

then call `package-compose`.

    package-compose package.a.json package.b.json package.c.json > package.json

On the command line it exits when there is no strategy to merge the values.
In the API you can provide custom handling via callback.