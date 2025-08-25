async function getTonPrice() {
	const response = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network');
	const data = await response.json();
	return data.market_data.current_price.usd;
}


document.getElementById('main-form').addEventListener('input', checkForm);
document.getElementById('main-form').addEventListener('submit', checkForm);

function checkForm() {
	let form = document.getElementById('main-form');

    let num = form.num.value;

	let optionValueSend = showSelectSend();
	let optionValueGet = showSelectGet();
	
	getTonPrice().then(tonPrice => {
		const priceCrypto = {
			'BTC': 72252,
			'ETH': 2634,
			'SOL': 174,
			'TRX': 0.1702,
			'BNB': 585,
			'USDT': 1,
			'TON': tonPrice
		}

		let resNum = num * priceCrypto[optionValueSend]
		resNum = resNum / priceCrypto[optionValueGet]

		if (!isNaN(resNum)) {
			document.getElementById('you-get-swap-num').innerHTML = Number(resNum.toFixed(8));
		} else {
			document.getElementById('you-get-swap-num').innerHTML = 0;
		}

		if (resNum === 0 | isNaN(resNum)) {
			btnExchange = document.getElementById('btn-exchange');
			btnExchange.onclick = null;
			btnExchange.classList.remove('btn-swap-css');
		} else {
			btnExchange = document.getElementById('btn-exchange');
			btnExchange.onclick = onClickExchange;
			btnExchange.classList.add('btn-swap-css');
		}
	});
}

function showSelectSend() {
	const selectSend = document.querySelector('.select-send');
	const option = selectSend.querySelector(`option[value="${selectSend.value}"]`);
	return option.value;
}

function showSelectGet() {
	const selectGet = document.querySelector('.select-get');
	const option = selectGet.querySelector(`option[value="${selectGet.value}"]`);
	return option.value;
}

function onClickExchange() {
	const inactiveMenu = document.querySelector('.inactive-menu');
	const infoTitle = document.querySelector('.info-title');
	const infoContainer = document.querySelector('.info-container');
	const indexMain = document.getElementById('index-main');

	inactiveMenu.style.display = 'block';
	infoTitle.style.display = 'none';
	infoContainer.style.display = 'none';
	indexMain.style.height = '100vh';

	window.addEventListener('wheel', preventScroll, { passive: false });

	setTimeout(() => {
		app.showAlert('Error! Server overloaded.');
		inactiveMenu.style.display = null;
		infoTitle.style.display = null;
		infoContainer.style.display = null;
		indexMain.style.height = null;

		window.removeEventListener('wheel', preventScroll);
	}, 8000);
}

function preventScroll(event) {
	event.preventDefault();
}

$(document).ready(function() {
	$('.form-select').select2({
		minimumResultsForSearch: Infinity // Отключает поиск, если не нужен
	});
});


// getTonPrice().then(tonPrice => {
// 	document.getElementById('ton-price').textContent = tonPrice;
// });