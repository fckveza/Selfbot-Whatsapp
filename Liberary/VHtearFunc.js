'Build 1.3 VHtear Selfbot > Thank to Baileys'

const {
	MessageType,
	Mimetype
} = require("@adiwajshing/baileys");
const fs = require('fs');
const request = require('request');
const Requests = require('node-fetch');
const {
	exec
} = require("child_process")

exports.VHsendContact = (client, toId, teks, teks2) => {
	const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + teks + '\n' + 'ORG:VHtear\n' + 'TEL;type=CELL;type=VOICE;waid=' + teks2.split("@s.whatsapp.net")[0] + ':+' + teks2.split("@s.whatsapp.net")[0] + '\n' + 'END:VCARD'
	client.sendMessage(toId, {
		displayname: teks,
		vcard: vcard
	}, MessageType.contact)
}


exports.VHsendMessage = (client, to, text) => {
	client.sendMessage(to, text, MessageType.text)
}

exports.VHsendImageUrl = (client, to, url, quote) => {
	var names = Date.now() / 10000;
	var download = function (uri, filename, callback) {
		request.head(uri, function (err, res, body) {
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
	};
	download(url, './media/' + names + '.jpeg', async function () {
		console.log('done');
		let media = fs.readFileSync('./media/' + names + '.jpeg')
		await client.sendMessage(to, media, MessageType.image, {
			caption: quote
		})
	});
}

exports.VHsendVideoUrl = (client, to, url, quote) => {
	var names = Date.now() / 10000;
	var download = function (uri, filename, callback) {
		request.head(uri, function (err, res, body) {
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
	};
	download(url, './media/' + names + '.mp4', async function () {
		console.log('done');
		let media = fs.readFileSync('./media/' + names + '.mp4')
		await client.sendMessage(to, media, MessageType.video, {
			caption: quote
		})
	});
}

exports.VHsendAudioUrl = (client, to, url, quote) => {
	var names = Date.now() / 10000;
	var download = function (uri, filename, callback) {
		request.head(uri, function (err, res, body) {
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
	};
	download(url, './media/' + names + '.mp3', async function () {
		console.log('done');
		let media = fs.readFileSync('./media/' + names + '.mp3')
		await client.sendMessage(to, media, MessageType.audio, {
			mimetype: Mimetype.mp4Audio
		})
	});
}

exports.VHsendStickerUrl = (client, to, url) => {
	var names = Date.now() / 10000;
	var download = function (uri, filename, callback) {
		request.head(uri, function (err, res, body) {
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
	};
	download(url, './media/' + names + '.png', async function () {
		console.log('done');
		let filess = './media/' + names + '.png'
		let asw = './media/' + names + '.webp'
		exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
			let media = fs.readFileSync(asw)
			client.sendMessage(to, media, MessageType.sticker)
		});
	});
}

exports.VHsendStickerPath = (client, to, path) => {
	var names = Date.now() / 10000;
	let filess = path
	let asw = './media/' + names + '.webp'
	exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
		let media = fs.readFileSync(asw)
		client.sendMessage(to, media, MessageType.sticker)
	});
}

exports.VHsendMention = (client, to, home, mids) => {
	var text = home.split("VHtears").join("").split("@s.whatsapp.net").join("")
	client.sendMessage(to, text, MessageType.text, {
		contextInfo: {
			"mentionedJid": mids
		}
	})
}

exports.Removebg = (asu, sayang, beforePath, PremiumKey) => {
	let fileSu = beforePath;
	let formData = {
		image: {
			value: fs.createReadStream(fileSu),
			options: {
				filename: fileSu,
				contentType: 'image/jpeg'
			}
		}
	};
	let options = {
		url: 'https://api.vhtear.com/removebg&apikey=' + PremiumKey,
		method: 'POST',
		formData: formData
	};
	request(options, function (err, resp, body) {
		if (err)
			console.log(err);
		if (!err && resp.statusCode == 200) {
			console.log("Upload success horay!!!");
			const user = JSON.parse(body)
			let we = "*Detail Image*\n\nCreated-time : " + user.result.create_time + "\nUrl : " + user.result.image
			asu.sendMessage(sayang, we, MessageType.text)
			var names = Date.now() / 10000;
			var download = function (uri, filename, callback) {
				request.head(uri, function (err, res, body) {
					request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
				});
			};
			download(user.result.image, './media/' + names + '.png', async function () {
				console.log('done');
				let filess = './media/' + names + '.png'
				let asw = './media/' + names + '.webp'
				exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
					let media = fs.readFileSync(asw)
					asu.sendMessage(sayang, media, MessageType.sticker)
				});
			});
		}
	});
}

exports.Searchanime = (asu, sayang, beforePath, PremiumKey) => {
	let fileSu = beforePath;
	let formData = {
		image: {
			value: fs.createReadStream(fileSu),
			options: {
				filename: fileSu,
				contentType: 'image/jpeg'
			}
		}
	};
	let options = {
		url: 'https://api.vhtear.com/searchanimewithimage&apikey=' + PremiumKey,
		method: 'POST',
		formData: formData
	};
	request(options, function (err, resp, body) {
		if (err)
			console.log(err);
		if (!err && resp.statusCode == 200) {
			console.log("Upload success horay!!!");
			const user = JSON.parse(body)
			let sakura = user.result
			let no = 0
			let ret_ = "*Result Anime Detail*\n"
			for (var prop in sakura) {
				no += 1
				ret_ += "\n\n" + no + ". Similarity : " + sakura[prop].similarity
				ret_ += "\nDesk : " + sakura[prop].description
				for (var vz in sakura[prop].urlitem) {
					if (sakura[prop].urlitem[vz] != []) {
						ret_ += "\nUrl : " + sakura[prop].urlitem[vz]
					}
				}
			}
			asu.sendMessage(sayang, ret_, MessageType.text)
		}
	});
}

function os_func() {
	this.execCommand = function (cmd) {
		return new Promise((resolve, reject) => {
			exec(cmd, (error, stdout, stderr) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(stdout)
			});
		})
	}
}