Utils to work with `package.json` files.

Install globally or locally

    npm install -g @tcurdt/package-utils

# package-merge

With `package-merge` you merge multiple files into one `package.json` file.

    package-merge package.a.json package.b.json package.c.json > package.json

On the command line it exits when there is no strategy to merge the values.
In the API you can provide custom handling via callback.

# package-deps

    package-deps -d a/package.json b/package.json
    mkdirp@0.5.1
    moment@2.11.2

With `package-deps` you get the dependencies of all the project files passed in. With the `-d` option this also includes the `devDependencies`. On the command line clashing versions will be reported and the last version wins.

# package-resolve

Resolves dependencies set to `RESOLVE` to what's in the dict.

    cat package.json | package-resolve dict.json > out.json
