import { closeModal, openModal } from './modal'
import {formDataPost} from '../services/get-resources'
function forms(formSelector, modalTimerId) {
	const form = document.querySelector(formSelector),
		
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

		formDataPost(telegramTokenBot,chatId).then(() => {
				showStatusMessage(message.success)
				form.reset()
			})
			.catch(() => showStatusMessage(message.failure))
			.finally(() => loader.remove())
	})

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog')

		modalDialog.classList.add('hide')
		openModal('.modal__content', '.modal', modalTimerId)

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`

		document.querySelector('.modal').append(statusModal)

		setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove('hide')
			closeModal('.modal')
		}, 4000)
	}
}

export default forms
