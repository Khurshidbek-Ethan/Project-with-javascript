function ourMenu(slectorOurMenu) {
	class Ourmenu {
		constructor(src, alt, title, sale, descr, parentSelectLeft) {
			this.src = src,
			this.alt = alt,
				this.title = title,
				this.sale = sale,
				this.descr = descr,
				this.parent = document.querySelector(parentSelectLeft),
			this.formatUsd()
		}

		formatUsd() {
			this.sale = this.sale.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			})
		}

		renderMenu() {
			const menuEle = document.createElement('div')
			menuEle.classList.add('menu-item')
			menuEle.innerHTML += `
				<div>
				      <img src="${this.src}" alt="${this.alt}">
							<div>
								<h3>${this.title} <span class="primary-text">${this.sale}</span></h3>
								<p>${this.descr}</p>
				      </div>
				</div>
			
				`
			this.parent.append(menuEle)
		}
	}
	fetch('http://localhost:3000/ourMenu', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	})
		.then(res => res.json())
		.then(data => {
			data.forEach(resData => {
				const { src, alt, title, sale, descr } = resData
				new Ourmenu(
					src,
					alt,
					title,
					sale,
					descr,
					slectorOurMenu,
				).renderMenu()
			})
		})

}

export default ourMenu