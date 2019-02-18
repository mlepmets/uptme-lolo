const newsItems = document.querySelectorAll('.newsItem')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modalContent')
const closeButton = document.querySelector('.closeButton')
const closeButtonMobile = document.querySelector('.closeButtonMobile')
// avab/sulgeb modali
function toggleModal() {
  modal.classList.toggle('showModal')
  document.body.classList.toggle('overflow-hidden')

}

// nodelist foreach polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// modal sulgemine tühjal kohal klikkides
function windowOnClick(event) {
  event.preventDefault();
  if (event.target === modal) {
    toggleModal()
  }
}
window.addEventListener('click', windowOnClick)
closeButton.addEventListener('click', toggleModal)
closeButtonMobile.addEventListener('click', toggleModal)


newsItems.forEach(function (item) {
  item.addEventListener('click', function () {

    // kui mõnda artiklit on juba avatud, eemaldada selle sisu modalist
    let articleContent = document.querySelector('.articleContent')
    if (articleContent) {
      articleContent.innerHTML = '<p>Loading ...</p>'
    }
    const articleURI = item.dataset.fullarticle


    // näita modal
    toggleModal()

    // sisesta artikkel modalisse
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        articleContent.innerHTML = xhr.responseText;
      }
    };
    xhr.open('GET', '/article/' + articleURI, true);
    xhr.send();
    // lisada sisu
    // let item = document.createElement('link')
    // item.setAttribute('rel', 'import')
    // item.setAttribute('href', 'test.html')
    // modalContent.appendChild(item)
  })
})