import icons from 'url:../../img/icons.svg'; //Parcel 2

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); //Dobija se empty array

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup); //Pretvara HTML String u DOM node
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements); //SVI ELEMENTI
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    // console.log(newElements);
    // console.log(curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //MENJAMO SAMO TEKST
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //First chil sadrzi tekst
        curEl.textContent = newEl.textContent;
        // console.log(newEl.firstChild.nodeValue.trim() + 'sasasasasaa');
      }

      //MENJAMO ATRIBUTE (DATA)
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });

    //Necemo renderovati markup, samo cemo ga dobaviti da ga poredimo sa prethodnim i ako se izvrsila promena, onda apdejtujemo
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
      </div>`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
