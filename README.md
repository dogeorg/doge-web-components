# doge-web-components

**Reusable web components for Dogecoin**

Want to promote Dogecoin on your blogsite, request a tip, add a fitting Doge meme, sell a product even? 
Doge Components are here to make this easy for you.  Browse the [Doge Component Library](https://fetch.dogecoin.org), find some you like,
add them to your webpage and voilà!

**Quick and easy**
Within your HTML file, add a doge component and start using it.

```
<script type="module" src="https://fetch.dogecoin.org/doge-qr"></script>
<doge-qr address="D89DhnsgKncmN12RejxudfU8AwXp3946q1" theme="such-doge"></doge-qr>
```

**Optionally**, add the initial.css stylesheet to the head of your page to reduce FOUC (flash of unstyled content).

```
<link rel="stylesheet" href="https://fetch.dogecoin.org/initial.css"
```

## Run locally

Ensure you have NodeJS installed and the project dependencies
```
npm install
```

Run a dev server via:
```
npm run dev
```

For convenience, run the following to have 'hot reloading' (your web browser will refresh the page on file change.)
```
npm run build:watch
```

[Visit your site](http://localhost:8080)