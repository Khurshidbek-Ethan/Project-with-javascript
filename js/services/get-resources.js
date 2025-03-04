
async function getResources() {

	try {
		const response = await fetch('http://localhost:3000/offers')
		return await response.json()
	} catch (err) {
		console.log(err);
	} finally {
		console.log("Finally");
		
	}

}

// fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				chat_id: chatId,
// 				text: `Name: ${object.name}. Phone: ${object.phone}`,
// 			}),
// 		})
// 			.then(() => {
// 				showStatusMessage(message.success)
// 				form.reset()
// 			})
// 			.catch(() => showStatusMessage(message.failure))
// 			.finally(() => loader.remove())

export async function formDataPost(telegramTokenBot,chatId) {
	try {
		const respomse = await fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: `Name: ${object.name}. Phone: ${object.phone}`,
			}),
		})
	} catch (err) {
		
	}
}
	
export default getResources