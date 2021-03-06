const $input = $('#search');
const $gifContainer = $('#giph-container');
const $countbdge = $('#count-badge');
let currentImageCount = 0;

$('form').on('submit', addGif);

// creates a div with the gif in it based on axios results
function createDiv(res) {
	let allResults = res.data.length;
	if (allResults) {
		let randomIdx = Math.floor(Math.random() * allResults);
		let $newDiv = $('<div>', {
			class: 'gif-div col-md-6 col-xl-4 text-center p-1'
		});
		let $gif = $('<img>', {
			src: res.data[randomIdx].images.original.url,
			class: 'gif-img'
		});
		$newDiv.append($gif);
		$gifContainer.append($newDiv);
	}
}

// makes ajax request and clears search input
async function addGif(e) {
	e.preventDefault();

	const response = await axios.get(
		`https://api.giphy.com/v1/gifs/search?q=${$input.val()}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
	);
	console.log(response);

	createDiv(response.data);

	// Updates the remove button badge if input is not empty
	if (!$input.val()) {
		return;
	}
	currentImageCount += 1;
	$countbdge.text(currentImageCount);

	// Empties the input
	$input.val('');
}

// removes all images
$('#remove-btn').on('click', function () {
	$gifContainer.empty();

	currentImageCount = 0;
	$countbdge.text(currentImageCount);
});
