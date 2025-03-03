function classCard(selectorClass){
	class OfferMenu {
		constructor(src, alt, title, descr, discount, sale, parentSelector) {
			this.src = src
			this.alt = alt
			this.title = title
			this.descr = descr
			this.discount = discount
			this.sale = sale
			this.parent = document.querySelector(parentSelector)
			this.formatToUSD()
		}

		formatToUSD() {
			this.discount = this.discount.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			})
			this.sale = this.sale.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			})
		}
		render() {
			const element = document.createElement('div')
			element.innerHTML = `
						<img src="${this.src}" alt="${this.alt}">
						<div>
							<h3>${this.title}</h3>
							<p>${this.descr}</p>
							<p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
						</div>

			`
			this.parent.append(element)
		}
	}

	fetch('http://localhost:3000/offers', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	})
		.then(res => res.json())
		.then(data => {
			data.forEach(offer => {
				const { src, alt, title, descr, discount, sale } = offer
				new OfferMenu(
					src,
					alt,
					title,
					descr,
					discount,
					sale,
					selectorClass,
				).render()
			})
		})
}

export default classCard