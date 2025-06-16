const greenland = { question: "On average in Greenland, how many tons of sea ice are melting per year due to climate change?", min: 1000000000, max: 1000000000000, correctAnswer: "280000000000", image: "https://i.natgeofe.com/n/af730b02-f5be-4fac-8d0c-8972eb049235/01_greenlandglacier_7166014512_37308667df_o.jpg", info: "", step: "1000000000" }

const california = { question: "How much did researchers estimate as the cost of the 2018 wildfires in California, which in recent years have worsened due to climate change?", min: 100000000000, max: 200000000000, correctAnswer: "148500000000", image: "https://www.munichre.com/content/dam/munichre/global/images/royalty-free/GettyImages-145057928.jpg/_jcr_content/renditions/cropped.3_to_1.jpg./cropped.3_to_1.jpg", info: "", step: "500000000" }

const brazil = { question: "How many hectares of amazon rainforest were lost to deforestation in 2021?", min: 100000, max: 2000000, correctAnswer: "1100000", image: "https://www.worldatlas.com/r/w2560-q80/upload/5a/c4/e6/shutterstock-1677523960.jpg", info: "", step: "100000" }

const alps = { question: "Researchers estimate that glaciers in the alps under what altitude will have melted by 2050 due to increasingly warming temperatures?", min: 100, max: 5000, correctAnswer: "3500", image: "https://www.pbs.org/wnet/nature/files/2021/01/pexels-denis-linine-714258.png", info: "", step: "100" }

const maldives = { question: "What percentage of the Maldives will be underwater by 2050 at the current rate of climate change?", min: 0, max: 100, correctAnswer: "80", image: "https://lp-cms-production.imgix.net/2021-10/shutterstockRF_444622738.jpg?auto=format&q=75&w=3840", info: "", step: "5" }

const australia = { question: "In the mass bleaching event of the Great Barrier Reef in 2022, sea surface rose up to how many degrees above normal?", min: 0.1, max: 5, correctAnswer: "4.0", image: "https://digital-classroom.nma.gov.au/sites/default/files/2020-07/Yr10_EnvironmentMovement_7_0.jpg?v=1", info: "", step: "0.1" }

const pakistan = { question: "How many people were affected by the Monsoon floods in Pakistan, which were caused by climate change, according to the government, in 2022?", min: 1000000, max: 50000000, correctAnswer: "33000000", image: "https://media.npr.org/assets/img/2022/08/29/gettyimages-1242738982_custom-443c2892eb4ca3bb2a68e31aeb7f3f1368d3f5d2-s1100-c50.jpg", step: '1000000' }


var country = ''

var map = L.map('map', {
    zoomControl: false,
    minZoom: 2,
    maxZoom: 4
}).setView([40, 0], 2)

var mapContainer = document.getElementById('mapContainer')

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var greenlandMarker = L.marker([69.6354163, -42.1736914]).addTo(map);
var californiaMarker = L.marker([36.778259, -119.417931]).addTo(map);
var brazilMarker = L.marker([-14.2400732, -53.1805017]).addTo(map);
var alpsMarker = L.marker([46.433334, 11.850000]).addTo(map);
var maldivesMarker = L.marker([1.924992, 73.399658]).addTo(map);
var australiaMarker = L.marker([-18.28499886, 147.6999972]).addTo(map);
var pakistanMarker = L.marker([30.375321, 69.345116]).addTo(map);

function onMapClick(e) {

    mapContainer.style.display = 'none'
    questionsDiv.style.display = 'block'

    switch (e.latlng.lat) {
        case 69.6354163:
            country = 'greenland'
            break
        case 36.778259:
            country = 'california'
            break
        case -14.2400732:
            country = 'brazil'
            break
        case 46.433334:
            country = 'alps'
            break
        case 1.924992:
            country = 'maldives'
            break
        case -18.28499886:
            country = 'australia'
            break
        case 30.375321:
            country = 'pakistan'
            break
    }
    questionText.innerHTML = eval(country + '.question')
    questionImage.src = eval(country + '.image')
    slider.min = eval(country + '.min')
    slider.max = eval(country + '.max')
    slider.step = eval(country + '.step')
    slider.value = eval(country + '.min')
    onSlided()
    correctAnswerText.style.display = 'flex'
    submitButton.style.display = 'flex'

}

greenlandMarker.on('click', onMapClick);
californiaMarker.on('click', onMapClick)
brazilMarker.on('click', onMapClick);
alpsMarker.on('click', onMapClick)
maldivesMarker.on('click', onMapClick)
australiaMarker.on('click', onMapClick)
pakistanMarker.on('click', onMapClick)


var closeButton = document.getElementById('closeButton')
var questionsDiv = document.getElementById('questionsDiv')
var slider = document.getElementById("slider");
var averageText = document.getElementById('averageText')
var isCorrectText = document.getElementById('isCorrectText')
var submitButton = document.getElementById('submitButton')
var questionText = document.getElementById("questionText")
var correctAnswerText = document.getElementById('correctAnswerText')
var showingSelectionText = document.getElementById("showingSelectionText");
var postSubmitInfo = document.getElementById('postSubmitInfo')
var questionImage = document.getElementById('questionImage')
showingSelectionText.innerHTML = "Selection: " + slider.value;

questionsDiv.style.display = 'none'

submitButton.addEventListener("click", onSubmitClicked)

closeButton.addEventListener('click', closeButtonClicked)

function closeButtonClicked() {
    mapContainer.style.display = 'block'
    questionsDiv.style.display = 'none'
    postSubmitInfo.style.display = 'none'
}

slider.oninput = onSlided

function onSlided() {
    showingSelectionText.innerHTML = 'Selection: ' + parseNumber(slider.value)
}

function parseNumber(value) {
    if (slider.value >= 1000000000) {
        return value / 1000000000 + 'b'
    } else if (slider.value >= 1000000) {
        return value / 1000000 + 'm'
    } else if (slider.value >= 1000) {
        return value / 1000 + 'k'
    } else {
        return value
    }
}
function calculate(array) {
    return Math.round(array.reduce((a, b) => a + b) / array.length)
}

function onSubmitClicked() {
    switch (country) {
        case 'greenland':
            if (localStorage.getItem('greenlandString')) {
                var greenlandStoredArray = JSON.parse(localStorage.getItem('greenlandString'))
                greenlandStoredArray.push(Number(slider.value))
                localStorage.setItem('greenlandString', JSON.stringify(greenlandStoredArray))
            } else {
                var greenlandArray = [Number(slider.value)]
                localStorage.setItem('greenlandString', JSON.stringify(greenlandArray));
            }
            var storedJSON = JSON.parse(localStorage.getItem('greenlandString'))
            var averageValue = calculate(storedJSON)
            averageText.innerHTML = 'Average Answer: ' + String(parseNumber(Math.floor(averageValue)))
            break

        case 'brazil':
            if (localStorage.getItem('brazilString')) {
                var brazilStoredArray = JSON.parse(localStorage.getItem('brazilString'))
                brazilStoredArray.push(Number(slider.value))
                localStorage.setItem('brazilString', JSON.stringify(brazilStoredArray))
            } else {
                var brazilArray = [Number(slider.value)]
                localStorage.setItem('brazilString', JSON.stringify(brazilArray));
            }
            var storedJSON = JSON.parse(localStorage.getItem('brazilString'))
            var averageValue = calculate(storedJSON)
            averageText.innerHTML = 'Average Answer: ' + String(parseNumber(Math.floor(averageValue)))
            break
        case 'alps':
            if (localStorage.getItem('alpsString')) {
                var alpsStoredArray = JSON.parse(localStorage.getItem('alpsString'))
                alpsStoredArray.push(Number(slider.value))
                localStorage.setItem('alpsString', JSON.stringify(alpsStoredArray))
            } else {
                var alpsArray = [Number(slider.value)]
                localStorage.setItem('alpsString', JSON.stringify(alpsArray));
            }
            var storedJSON = JSON.parse(localStorage.getItem('alpsString'))
            var averageValue = calculate(storedJSON)
            averageText.innerHTML = 'Average Answer: ' + String(parseNumber(Math.floor(averageValue)))
            break
        case 'california':
            if (localStorage.getItem('californiaString')) {
                var californiaStoredArray = JSON.parse(localStorage.getItem('californiaString'))
                californiaStoredArray.push(Number(slider.value))
                localStorage.setItem('californiaString', JSON.stringify(californiaStoredArray))
            } else {
                var californiaArray = [Number(slider.value)]
                localStorage.setItem('californiaString', JSON.stringify(californiaArray));
            }
            var storedJSON = JSON.parse(localStorage.getItem('californiaString'))
            var averageValue = calculate(storedJSON)
            averageText.innerHTML = 'Average Answer: ' + String(parseNumber(Math.floor(averageValue)))
            break
        case 'maldives':
            if (localStorage.getItem('maldivesString')) {
                var maldivesStoredArray = JSON.parse(localStorage.getItem('maldivesString'))
                maldivesStoredArray.push(Number(slider.value))
                localStorage.setItem('maldivesString', JSON.stringify(maldivesStoredArray))
            } else {
                var maldivesArray = [Number(slider.value)]
                localStorage.setItem('maldivesString', JSON.stringify(maldivesArray));
            }
            var storedJSON = JSON.parse(localStorage.getItem('maldivesString'))
            var averageValue = calculate(storedJSON)
            averageText.innerHTML = 'Average Answer: ' + String(parseNumber(Math.floor(averageValue)))
            break
        case 'australia':
            if (localStorage.getItem('australiaString')) {
                var australiaStoredArray = JSON.parse(localStorage.getItem('australiaString'))
                australiaStoredArray.push(Number(slider.value))
                localStorage.setItem('australiaString', JSON.stringify(australiaStoredArray))
            } else {
                var australiaArray = [Number(slider.value)]
                localStorage.setItem('australiaString', JSON.stringify(australiaArray));
            }
            var storedJSON = JSON.parse(localStorage.getItem('australiaString'))
            var averageValue = calculate(storedJSON)
            averageText.innerHTML = 'Average Answer: ' + String(parseNumber(Math.floor(averageValue)))
            break
        case 'pakistan':
            if (localStorage.getItem('pakistanString')) {
                var pakistanStoredArray = JSON.parse(localStorage.getItem('pakistanString'))
                pakistanStoredArray.push(Number(slider.value))
                localStorage.setItem('pakistanString', JSON.stringify(pakistanStoredArray))
            } else {
                var pakistanArray = [Number(slider.value)]
                localStorage.setItem('pakistanString', JSON.stringify(pakistanArray));
            }
            var storedJSON = JSON.parse(localStorage.getItem('pakistanString'))
            var averageValue = calculate(storedJSON)
            averageText.innerHTML = 'Average Answer: ' + String(parseNumber(Math.floor(averageValue)))
            break
    
}

submitButton.style.display = 'none'
postSubmitInfo.style.display = 'flex'
if (slider.value == eval(country + '.correctAnswer')) {
    isCorrectText.innerHTML = 'Exactly right!'
    correctAnswerText.style.display = 'none'
} else {
    console.log(slider.value)
    var correctInterval = parseNumber(Math.abs(eval(country + '.correctAnswer') - slider.value))
    correctAnswerText.innerHTML = 'Correct Answer: ' + parseNumber(eval(country + '.correctAnswer'))
    isCorrectText.innerHTML = 'You were ' + correctInterval + ' away'
}

}

