'use strict' // qatiy rejim -> eski style codelarni xatoga chiqaradi
window.addEventListener('DOMContentLoaded', () => {
	//  Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabContents = document.querySelectorAll('.tab_content'),
		tabParents = document.querySelector('.tabheader__items')

	function hideTabContents() {
		tabContents.forEach(tabContent => {
			tabContent.classList.add('hide')
			tabContent.classList.remove('show')
		})
		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active')
		})
	}

	function showTabContent(index = 0) {
		tabContents[index].classList.add('show', 'fade')
		tabContents[index].classList.remove('hide')
		tabs[index].classList.add('tabheader__item_active')
	}

	hideTabContents()
	showTabContent(0)

	tabParents.addEventListener('click', event => {
		const target = event.target

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, index) => {
				if (target === tab) {
					hideTabContents()
					showTabContent(index)
				}
			})
		}
	})

	// Loader
	const loaderWrapper = document.querySelector('.loader-wrapper')

	setTimeout(() => {
		loaderWrapper.style.display = 'none'
	}, 1000)

	// Timer
	const deadline = '2025-03-26'

	function getTimerRemaining(endtime) {
		let days, hours, minutes, seconds
		const time = Date.parse(endtime) - Date.parse(new Date())
		if (time <= 0) {
			days = 0
			hours = 0
			minutes = 0
			seconds = 0
		} else {
			;(days = Math.floor(time / (1000 * 60 * 60 * 24))),
				(hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
				(minutes = Math.floor((time / (1000 * 60)) % 60)),
				(seconds = Math.floor((time / 1000) % 60))
		}
		return {
			totalTime: time,
			days,
			hours,
			minutes,
			seconds,
		}
	}

	function formatNumber(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`
		} else {
			return number
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const time = getTimerRemaining(endtime)
			days.textContent = formatNumber(time.days)
			hours.textContent = formatNumber(time.hours)
			minutes.textContent = formatNumber(time.minutes)
			seconds.textContent = formatNumber(time.seconds)

			if (time.totalTime <= 0) {
				clearInterval(timeInterval)
			}
		}
	}
	setClock('.timer', deadline)

	// Modal
	const modalOpenBtns = document.querySelectorAll('[data-modal ]'),
		modal = document.querySelector('.modal'),
		// modalCloseBtn = document.querySelector('[data-modal-close]'),
		modalContent = document.querySelector('.modal__content')

	function openModel() {
		modalContent.classList.add('.modal_fade')
		modal.classList.add('show')
		modal.classList.remove('hide')
		// document.body.style.overflow = 'hidden'
		clearInterval(modelTimerId)
	}
	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', openModel)
	})
	function closeModel() {
		modal.classList.add('hide')
		modal.classList.remove('show')
		document.body.style.overflow = ''
	}
	// modalCloseBtn.addEventListener('click', closeModel)

	modal.addEventListener('click', event => {
		if (
			event.target === modal ||
			event.target.getAttribute('data-modal-close') === ''
		) {
			closeModel()
		}
	})

	document.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModel()
		}
	})

	const modelTimerId = setTimeout(openModel, 50000)

	// Class

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
					'.offers-items'
				).render()
			})
		})
	//  Form
	const form = document.querySelector('form'),
		telegramTokenBot = '7979610186:AAG8_jA2-XKfhHezYjlEYYXOiAxCthPydvk',
		chatId = '6256749180'
	const message = {
		loading: 'Loading...',
		success: 'Thanks for contacting with us',
		failure: 'Something went wrong',
	}
	form.addEventListener('submit', event => {
		event.preventDefault()
		const loader = document.createElement('div')
		loader.classList.add('loader')
		loader.style.width = '20px'
		loader.style.height = '20px'
		loader.style.marginTop = '20px'

		form.append(loader)
		const formData = new FormData(form)
		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})
		// console.log(object)

		fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: `Name:${object.name},Phone:${object.phone}`,
			}),
		})
			.then(() => {
				showStatusMessage(message.success)
				form.reset()
			})
			.catch(() => showStatusMessage(message.failure))
			.finally(() => {
				loader.remove()
			})
	})

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog')
		modalDialog.classList.add('hide')
		openModel()

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
					<div class="modal__content">
					<div data-modal-close class="modal__close">&times;</div>
					<div class="modal__title">${message}</div >
					</div>
			`
		document.querySelector('.modal').append(statusModal)
		setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove('hide')
			closeModel()
		}, 4000)
	}

	// OUR MENU

	class Ourmenu {
		constructor(src, alt, title, sale, descr,parentSelectLeft) {
			this.src = src,
			this.alt = alt,
			this.title = title,
			this.sale = sale,
			this.descr = descr,
			this.parent = document.querySelector(parentSelectLeft)
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
			menuEle.innerHTML +=

				`
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
		headers:{"Content-Type":"application/json"}
	}).then((res) => res.json()).then((data) => {
		data.forEach((resData) => {
			const { src, alt, title, sale, descr } = resData
			new Ourmenu(src,alt,title,sale,descr,'.menu-items',).renderMenu()
		})
		
	})

	// SLIDER
	const slides = document.querySelectorAll(".offer__slide"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		slidesWrapper = document.querySelector(".offer__slider-wrapper"),
		slidesInner = document.querySelector(".offer__slider-inner"),
		width = window.getComputedStyle(slidesWrapper).width

	let slideIndex = 1,
		offset = 0

	if(slides.length < 10) {
		total.textContent = `0${slides.length}`
		current.textContent = `0${slideIndex}`
	}else {
		total.textContent = slides.length
		current.textContent = slideIndex
	}

	slidesInner.style.width = 100 * slides.length + "%"
	slidesInner.style.display = "flex"
	slidesInner.style.transition = "all .5s ease"

	slidesWrapper.style.overflow = "hidden"

	slides.forEach(slide => {
		slide.style.width = width
	})

	next.addEventListener("click", () => {
		if(offset === +width.replace(/\D/g,'') * (slides.length - 1) ) { 
			offset = 0
		} else {
			offset += +width.replace(/\D/g,'')
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if(slideIndex === slides.length) {
			slideIndex = 1
		}else {
			slideIndex++
		}

		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

	prev.addEventListener("click", () => {
		if(offset === 0) { 
			offset = +width.replace(/\D/g,'') * (slides.length - 1)
		} else {
			offset -= +width.replace(/\D/g,'')
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if(slideIndex === 1) {
			slideIndex = slides.length
		}else {
			slideIndex--
		}

		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

})
