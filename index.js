// choose 'seed color; with an <input type="color"/>
// choose color scheme mode in a <select> box
// clicking button makes request to the color api to get a color scheme
// display the scheme colors and hex values on the page
// click hex values to copy to clipboard

let colorsArray = [];
const form = document.getElementById("get-scheme");

form.addEventListener("submit", function (event) {
  colorsArray = [];
  event.preventDefault();
  const chooseColor = document.getElementById("choose-color").value.substr(1);
  const chooseType = document.getElementById("choose-type").value;

  // console.log(chooseColor, chooseType);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${chooseColor}&mode=${chooseType}`
  )
    .then((res) => res.json())
    .then((data) => {
      colorsArray.push(data.colors);
      console.log(colorsArray);
      renderColors();
    });
});

function renderColors() {
  let html = "";
  // Each element (colorSet) is an array of color objects.
  for (let colorSet of colorsArray) {
    // iterates over each color object within the current colorSet array. Each color is an object that contains color information
    for (let color of colorSet) {
      html += `
      <div class="color-item">
        <p class="color-tag" data-color="${color.hex.value}"></p>
        <p class="color-hex" data-color="${color.hex.value}">${color.hex.value}</p>
      </div>
        `;
    }
  }
  document.getElementById("color-container").innerHTML = html;

  const colorTags = document.querySelectorAll(".color-tag");
  colorTags.forEach((colorTag) => {
    colorTag.style.backgroundColor = colorTag.getAttribute("data-color");
    colorTag.style.height = "170px";
    colorTag.style.margin = "0";
  });

  const colorHexElements = document.querySelectorAll(".color-hex");
  colorHexElements.forEach((colorHex) => {
    colorHex.style.cursor = "pointer";
    colorHex.addEventListener("click", () => {
      const hexValue = colorHex.getAttribute("data-color");
      navigator.clipboard
        .writeText(hexValue)
        .then(() => {
          colorHex.textContent = "Copied!";
          setTimeout(function () {
            colorHex.textContent = colorHex.getAttribute("data-color");
          }, 3000);

          // alert(`Copied ${hexValue} to clipboard!`);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  });
}
