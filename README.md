# doge-web-components

Reusable web components for Dogecoin

## Two ways to consume components.

Want to promote Dogecoin on your blogsite, request a tip, add a fitting Doge meme, sell a product even? 
Doge Components are here to make this easy for you.  Browse the [Doge Component Library](todo), find some you like,
add them to your webpage and voilà!

### 1. Cherry Pick (Under development)

Quick and easy.
Within your HTML file, add a doge component and start using it.

```
<script type="module" src="https://fetch.dogecoin.org/qr"></script>
<doge-qr address="D89DhnsgKncmN12RejxudfU8AwXp3946q1" caption="Treat me a coffee?"></doge-qr>
```

---

### 2. Fetch Lib (Coming Soon)

Within your HTML file, add configure.js, configure and utilise.

```
<script type="text/javascript" src="https://fetch.dogecoin.org/lib/configure.js"></script>
```

```
<script type="text/javascript">
	dogeFetch.init({
		components: ['qr', 'price', 'pal'],
		resourcePath: '<your-site>/resources',
		componentPath: '<your-site>/components'
	});
</script>
```

```
<doge-qr
	address="D89DhnsgKncmN12RejxudfU8AwXp3946q1"
	caption="Buy me a coffee"
>
</doge-qr>

<doge-price
	source="rss://coinmarketcap.com/currencies/dogecoin"
	curr="USD"
	refresh="5"
>
</doge-price>

<doge-pal
	max-width="600"
>
</doge-pal>
```
