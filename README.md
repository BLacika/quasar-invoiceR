# Quasar App (invoice-r)

This is one of my hobbyproject, which is unfinished. This is because I noticed
that I can't used to the new syntax. I suffered for 3 days on a seemingly simple task.
This was a dialog, where you can enter the invoice lines details, or you can modify
the earlier details. I don't like this new ref, reactive etc. things. I managed to show
the data from the given line, but with empty details, i can't apply any automatism.
I had to pass down a prop with type of object, than to access this, i had implement 
a computed variable. This variable could be pass to corresponding fields.
With this solution i got for examle rowData.value.product.etc.etc. This is ugly.
So i gave up after 3 days. I have no desire to dig myself deeper in the new Vue 3 world,
how things now works.
Despite all things, Quasar is my favourite framework. I wish Svelte or React had one own Quasar.

A Quasar Framework app

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
