const {
	WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	ReVHectMode,
	ProxyAgent,
	waChatKey
} = require("@adiwajshing/baileys");

const fs = require('fs');
const request = require('request');
const Requests = require('node-fetch');
const {
	exec
} = require("child_process")

const {
	VHsendImageUrl,
	VHsendVideoUrl,
	VHsendContact,
	VHsendMessage,
	VHsendAudioUrl,
	VHsendStickerUrl,
	VHsendStickerPath,
	VHsendMention,
	Removebg,
	Searchanime
} = require('./Liberary/VHtearFunc');

const PremiumKey = "Chat to buy https://wa.me/6281238552767"
const Host = "https://api.vhtear.com"

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

async function SBVHtear() {
	const VH = new WAConnection()
	VH.on('qr', qr => {
		console.log('PLEASE SCAN the QR CODE')
	});
	VH.on('credentials-updated', () => {
		const authInfo = VH.base64EncodedAuthInfo()
		fs.writeFileSync('./data.json', JSON.stringify(authInfo, null, '\t'))
	})
	fs.existsSync('./data.json') && VH.loadAuthInfo('./data.json')
	await VH.connect()
	console.log('Name : ' + VH.user.name + ' (' + VH.user.jid + ')')
	if (process.platform === 'win32' || process.platform === 'win64') {
		return
	} else if (process.platform === 'linux') {
		var os = new os_func();
		os.execCommand("rm -f ./media/*.mp3");
		os.execCommand("rm -f ./media/*.mp4");
		os.execCommand("rm -f ./media/*.jpeg");
		os.execCommand("rm -f ./media/*.png");
		os.execCommand("rm -f ./media/*.webp");
		os.execCommand("sync; echo 3 > /proc/sys/vm/drop_caches");
	} else if (process.platform === 'darwin') {
		return
	}
	VH.on('chat-update', async(chat) => {
		if (!chat.hasNewMessage) return
		m = JSON.parse(JSON.stringify(chat)).messages[0] // pull the new message from the update
		const messageContent = m.message
		if (!messageContent) return
		let to = m.key.remoteJid
		let id = m.key.remoteJid
		let sender = m.participant
		let isGroup = m.key.remoteJid.endsWith('@g.us')
		let setkey = ""
		let type = Object.keys(m.message)[0]
		const sakura = JSON.stringify(messageContent)
		const Qimage = type === 'extendedTextMessage' && sakura.includes('imageMessage')
		let txt = (type === 'conversation' && m.message.conversation.startsWith(setkey)) ? m.message.conversation : (type == 'zzzimageMessage') && m.message.imageMessage.caption.startsWith(setkey) ? m.message.imageMessage.caption : (type == 'zzzvideoMessage') && m.message.videoMessage.caption.startsWith(setkey) ? m.message.videoMessage.caption : (type == 'extendedTextMessage') && m.message.extendedTextMessage.text.startsWith(setkey) ? m.message.extendedTextMessage.text : ''
		if (m.key.fromMe) {
			if (txt == "hi") {
				VHsendMessage(VH, to, "Hi sayang!!!")
			} else if (txt == "me") {
				VHsendMention(VH, to, "Hey @VHtears" + VH.user.jid, [VH.user.jid])
				VHsendContact(VH, to, "VHtear", VH.user.jid)
			} else if (txt == "tagall") {
				var vz = await VH.groupMetadata(to)
				var memB = vz.participants
				let mids = []
				let ve_ = "*Tag All Groups*\n"
				let no = 0
				for (let vh of memB) {
					no += 1
					ve_ += "\n" + no + ". @" + vh.jid
					mids.push(vh.jid)
				}
				VHsendMention(VH, to, ve_, mids)
			} else if (txt == "removechat") {
				let hani = await VH.chats.all()
				VH.setMaxListeners(20)
				for (let DOR of hani) {
					VH.deleteChat(DOR.jid)
				}
				VHsendMessage(VH, to, "Success..")
			} else if (txt == "sticker") {
				if (Qimage) {
					const HUU = Qimage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
					const media = await VH.downloadAndSaveMediaMessage(HUU, './media/' + m.key.id)
					VHsendStickerPath(VH, to, media)
				}
			} else if (txt == "removebg") {
				if (Qimage) {
					const HUU = Qimage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
					const media = await VH.downloadAndSaveMediaMessage(HUU, './media/' + m.key.id)
					Removebg(VH, to, media, PremiumKey)
				}
			} else if (txt == "searchanime") {
				if (Qimage) {
					const HUU = Qimage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
					const media = await VH.downloadAndSaveMediaMessage(HUU, './media/' + m.key.id)
					Searchanime(VH, to, media, PremiumKey)
				}
			} else if (txt.startsWith("clear")) {
				var os = new os_func();
				os.execCommand("rm -f ./media/*.mp3");
				os.execCommand("rm -f ./media/*.mp4");
				os.execCommand("rm -f ./media/*.jpeg");
				os.execCommand("rm -f ./mp4/*.mp4");
				os.execCommand("sync; echo 3 > /proc/sys/vm/drop_caches");
				VHsendMessage(VH, to, "Success..")
			} else if (txt == "help") {
				try {
					var data = fs.readFileSync('Liberary/help.txt', 'utf8');
					VHsendMessage(VH, to, data.toString())
				} catch (e) {
					console.log('Error:', e.stack);
				}
			} else if (txt.startsWith('tiktok')) {
				const vhani = txt.replace('tiktok' + " ", "")
				const cuj = vhani.split(" ")
				let pesan = `𝗧𝗜𝗞𝗧𝗢𝗞 𝗠𝗘𝗡𝗨\n\n𝗖𝗼𝗺𝗺𝗮𝗻𝗱:\n  1. ${setkey}tiktok profile {username}\n  3. ${setkey}tiktok hastag {query}\n  3. ${setkey}tiktok download {link post}`
				if (vhani == "") {
					VHsendMessage(VH, to, pesan)
				} else {
					if (cuj[0] == "profile") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + '/tiktokprofile?query=' + cuj[1] + '&apikey=' + PremiumKey)
							const pp = await response.json()
							const cok = pp.result
							let dat = "*TIKTOK PROFILE*\n"
							dat += "\n*_Username_*: " + cok.username
							dat += "\n*_Title_*: " + cok.title
							dat += "\n*_Verified_*: " + cok.verified
							dat += "\n*_Follow_*: " + cok.follow
							dat += "\n*_Follower_*: " + cok.follower
							dat += "\n*_Like_*: " + cok.like_count
							dat += "\n*_Post_*: " + cok.video_post
							dat += "\n*_Bio_*: " + cok.bio
							dat += "\n*_Description_*: " + cok.description
							dat += "\n*_Url_account_*: " + cok.url_account
							await VHsendImageUrl(VH, to, cok.picture, dat)
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "hastag") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + '/tiktokhastag?query=' + cuj[1] + '&apikey=' + PremiumKey)
							const pp = await response.json()
							const cok = pp.result
							let dat = "*TIKTOK HASTAG*\n"
							let no = 0
							for (var prop in cok) {
								no += 1
								dat += "\n" + no + "."
								dat += "\n*_Name_*: " + cok[prop].name
								dat += "\n*_Nick_*: " + cok[prop].nickName
								dat += "\n*_Title_*: " + cok[prop].title
								dat += "\n*_Image_*: " + cok[prop].urlImage
								dat += "\n*_Url_*: " + cok[prop].urlImage + "\n"
							}
							await VHsendImageUrl(VH, to, cok[0].urlImage, dat)
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "download") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + '/tiktokdl?link=' + cuj[1] + '&apikey=' + PremiumKey)
							const pp = await response.json()
							const mek = pp.result
							await VHsendVideoUrl(VH, to, mek.video, "")
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else {
						VHsendMessage(VH, to, pesan)
					}
				}
			} else if (txt.startsWith('instagram')) {
				const vhani = txt.replace('instagram' + " ", "")
				const cuj = vhani.split(" ")
				let pesan = `𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠 𝗠𝗘𝗡𝗨\n\n𝗖𝗼𝗺𝗺𝗮𝗻𝗱:\n  1. ${setkey}instagram profile {username}\n  2. ${setkey}instagram story {username}\n  3. ${setkey}instagram highlight {username}\n  4. ${setkey}instagram tv {username}\n  5. ${setkey}instagram hastag {query}\n  6. ${setkey}instagram download {link post}`
				if (vhani == "") {
					VHsendMessage(VH, to, pesan)
				} else {
					if (cuj[0] == "profile") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + '/igprofile?query=' + cuj[1] + '&apikey=' + PremiumKey)
							const vez = await response.json()
							const cok = vez.result
							let ve = "*INSTAGRAM PROFILE*\n"
							ve += "\n • Username: " + cok.username + ""
							ve += "\n • Full_name: " + cok.full_name + ""
							ve += "\n • Follower: " + cok.follower + ""
							ve += "\n • Follow: " + cok.follow + ""
							ve += "\n • Is_private: " + cok.is_private + ""
							ve += "\n • Count post: " + cok.post_count + ""
							ve += "\n • Biography: " + cok.biography + ""
							await VHsendImageUrl(VH, to, cok.picture, ve)
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "story") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + '/igstory?query=' + cuj[1] + '&apikey=' + PremiumKey)
							const vez = await response.json()
							const cok = vez.result.story.itemlist
							for (var io = 0; io < cok.length; io++) {
								if (cok[io].type === "image") {
									await VHsendImageUrl(VH, to, cok[io].urlDownload, "")
								} else {
									await VHsendVideoUrl(VH, to, cok[io].urlDownload, "")
								}
							}
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "highlight") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							var itel = []
							var amer = []
							const barang = cuj[1].split("|")
							const hasil = barang[0]
							const value = Number(barang[1]) - 1
							const response = await Requests(Host + '/ighighlight?query=' + hasil + '&apikey=' + PremiumKey)
							const pp = await response.json()
							const cok = pp.result.highlight
							let no = 0
							let dat = "*Instagram Highlight*"
							for (var prop in cok) {
								itel.push(cok[prop]);
								amer.push(prop);
								no += 1
								dat += `\n\n*${no}*.` + " " + prop + "| " + cok[prop].itemcount + "-Item"
							}
							if (barang.length == 1) {
								dat += "\n\n*To see detail*: " + setkey + "instagram highlight " + hasil + "| nomer"
								VHsendMessage(VH, to, dat)
							}
							if (barang.length == 2) {
								let dat = "*_Detail Highlight:" + amer[value] + "_*"
								dat += "\n*Username*: " + itel[value].owner_username
								dat += "\n\n->_<| Beta VHSelfbot |>_<-"
								VHsendMessage(VH, to, dat)
								const mek = itel[value].item.itemlist
								for (var io = 0; io < itel[value].item.itemlist.length; io++) {
									if (mek[io].type === "image") {
										await VHsendImageUrl(VH, to, mek[io].urlDownload, "")
									} else {
										await VHsendVideoUrl(VH, to, mek[io].urlDownload, "")
									}
								}
							}
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "tv") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							var itels = []
							var amers = []
							const barang = cuj[1].split("|")
							const hasil = barang[0]
							const value = Number(barang[1]) - 1
							const response = await Requests(Host + '/igtv?query=' + hasil + '&apikey=' + PremiumKey)
							const ve = await response.json()
							const cok = ve.result.igTv
							let no = 0
							let dat = "*Instagram Tv*"
							for (var props in cok) {
								itels.push(cok[props]);
								amers.push(props);
								no += 1
								dat += `\n\n*${no}*. ` + cok[props].caption.slice(0, 20)
							}
							if (barang.length == 1) {
								dat += "\n\n*To see detail*: " + setkey + "instagram tv " + hasil + "| nomer"
								VHsendMessage(VH, to, dat)
							}
							if (barang.length == 2) {
								let dat = "*_Detail Tv:" + hasil + "_*"
								dat += "\n*Caption*: " + cok[value].caption
								dat += "\n\n->_<| Beta VHSelfbot |>_<-"
								await VHsendImageUrl(VH, to, cok[value].urlImage, dat)
								await VHsendVideoUrl(VH, to, cok[value].urlVideo, "")
							}
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "hastag") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const barang = cuj[1].split("|")
							const hasil = barang[0]
							const value = Number(barang[1]) - 1
							const response = await Requests(Host + '/ighastag?query=' + hasil + '&apikey=' + PremiumKey)
							const ve = await response.json()
							const cok = ve.result.data
							let no = 0
							let dat = "*Instagram Tv*"
							for (var props in cok) {
								no += 1
								dat += `\n\n*${no}*. ` + cok[props].caption.slice(0, 22)
							}
							if (barang.length == 1) {
								dat += "\n\n*To see detail*: " + setkey + "instagram hastag " + hasil + "| nomer"
								VHsendMessage(VH, to, dat)
							}
							if (barang.length == 2) {
								let dat = "*_Detail Hastag*_\n"
								dat += "\nUsername: " + cok[value].owner_username
								dat += "\n*Caption*: " + cok[value].caption
								dat += "\n\n->_<| Beta VHSelfbot |>_<-"
								let su = cok[value].post
								for (var props in su) {
									if (su[props].type === "image") {
										await VHsendImageUrl(VH, to, su[props].urlDownload, dat)
									} else {
										await VHsendVideoUrl(VH, to, su[props].urlDownload, dat)
									}
								}
							}
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "download") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + '/instadl?link=' + cuj[1] + '&apikey=' + PremiumKey)
							const ve = await response.json()
							const cok = ve.result.post
							for (var io = 0; io < cok.length; io++) {
								if (cok[io].type === "image") {
									await VHsendImageUrl(VH, to, cok[io].urlDownload, "")
								} else {
									await VHsendVideoUrl(VH, to, cok[io].urlDownload, "")
								}
							}
							await VHsendMessage(VH, to, "_*Instagram Post*_\n\n_*Desk*_: " + ve.result.caption)
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else {
						VHsendMessage(VH, to, pesan)
					}
				}
			} else if (txt.startsWith("facebook download")) {
				const vhani = txt.replace('facebook download' + " ", "")
				const response = await Requests(Host + "/fbdl?link=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				const fox = data.result
				let veza = "*_FACEBOOK DOWNLOAD_*"
				VHsendVideoUrl(VH, to, fox.Videourl, veza)
			} else if (txt.startsWith('youtube')) {
				const vhani = txt.replace('youtube' + " ", "")
				const cuj = vhani.split(" ")
				var jaran = ""
				if (cuj[2] != null) {
					jaran = cuj[1] + " " + cuj[2]
				} else {
					jaran = cuj[1]
				}
				if (cuj[3] != null) {
					jaran = cuj[1] + " " + cuj[2] + " " + cuj[3]
				}
				let pesan = `𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗠𝗘𝗡𝗨\n\n𝗖𝗼𝗺𝗺𝗮𝗻𝗱:\n  1. ${setkey}youtube mp3 {title}\n  2. ${setkey}youtube search {title}\n  3. ${setkey}youtube download {link}`
				if (vhani == "") {
					VHsendMessage(VH, to, pesan)
				} else {
					if (cuj[0] == "search") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const barang = cuj[1].split("|")
							const hasil = barang[0]
							const value = Number(barang[1]) - 1
							const response = await Requests(Host + '/youtube?query=' + hasil + '&apikey=' + PremiumKey)
							const pp = await response.json()
							const cok = pp.result
							if (barang.length == 1) {
								let dat = "*𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗦𝗘𝗔𝗥𝗖𝗛*\n"
								let no = 0
								for (var a = 0; a < cok.length; a++) {
									no += 1
									let mam = cok[a].title.substring(0, 30)
									dat += `\n*${no}*.` + " " + mam + " | " + cok[a].duration + "sec"
								}
								dat += "\n\n*To download*: " + setkey + "youtube search " + hasil + "|number"
								await VHsendImageUrl(VH, to, "https://fontlot.com/wp-content/uploads/2020/03/youtube-logo-font.jpg", dat)
							}
							if (barang.length == 2) {
								const response = await Requests(Host + '/ytdl?link=https://youtu.be/' + cok[value].id + '&apikey=' + PremiumKey)
								const ve = await response.json()
								const mek = ve.result
								let dat = "*_Detail YTDL*_\n"
								dat += "\nTitle: " + mek.title
								dat += "\nSize: " + mek.size
								dat += "\nExt: " + mek.ext
								dat += "\n\n->_<| Beta VHSelfbot |>_<-"
								await VHsendVideoUrl(VH, to, mek.UrlVideo, dat)
								await VHsendAudioUrl(VH, to, mek.UrlMp3, "")
							}
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "download") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + '/ytdl?link=' + cuj[1] + '&apikey=' + PremiumKey)
							const ve = await response.json()
							const mek = ve.result
							let dat = "*_Detail YTDL*_\n"
							dat += "\nTitle: " + mek.title
							dat += "\nSize: " + mek.size
							dat += "\nExt: " + mek.ext
							dat += "\n\n->_<| Beta VHSelfbot |>_<-"
							await VHsendVideoUrl(VH, to, mek.UrlVideo, dat)
							await VHsendAudioUrl(VH, to, mek.UrlMp3, "")
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else if (cuj[0] == "mp3") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + "/ytmp3?query=" + jaran + "&apikey=" + PremiumKey)
							const ve = await response.json()
							const mek = ve.result
							let dat = "*_Detail MP3*_\n"
							dat += "\nTitle: " + mek.title
							dat += "\nDuration: " + mek.duration
							dat += "\nSize: " + mek.size
							dat += "\nExt: " + mek.ext
							dat += "\n\n->_<| Beta VHSelfbot |>_<-"
							await VHsendImageUrl(VH, to, mek.image, dat)
							await VHsendAudioUrl(VH, to, mek.mp3, "")
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else {
						VHsendMessage(VH, to, pesan)
					}
				}
			} else if (txt.startsWith('googlesearch')) {
				const vhani = txt.replace('googlesearch' + " ", "")
				const response = await Requests(Host + '/googlesearch?query=' + vhani + '&apikey=' + PremiumKey)
				const ppek = await response.json()
				const mek = ppek.result
				let no = 0
				let ve_ = "*Google Search*\n"
				for (var propss in mek) {
					no += 1
					ve_ += "\n\n" + no + ". " + mek[propss]
				}
				VHsendMessage(VH, to, ve_)
			} else if (txt.startsWith('googleimage')) {
				const vhani = txt.replace('googleimage' + " ", "")
				const barang = vhani.split("|")
				const hasil = barang[0]
				const value = Number(barang[1])
				const response = await Requests(Host + '/googleimg?query=' + hasil + '&apikey=' + PremiumKey)
				const ppek = await response.json()
				const mek = ppek.result.result_search
				let num = 0
				for (var ere in mek) {
					num += 1
					await VHsendImageUrl(VH, to, mek[ere])
					if (num == value) {
						break
					}
				}
			} else if (txt.startsWith('playstore')) {
				const vhani = txt.replace('playstore' + " ", "")
				const response = await Requests(Host + '/playstore?query=' + vhani + '&apikey=' + PremiumKey)
				const ppek = await response.json()
				const mek = ppek.result
				let no = 0
				let ve_ = "*Playstore*\n"
				for (var cg of mek) {
					no += 1
					ve_ += "\n\n" + no + ". AppID : " + cg.app_id
					ve_ += "\nAppID : " + cg.app_id
					ve_ += "\nUrl : https://play.google.com"+ cg.url
					ve_ += "\nTitle : " + cg.title
					ve_ += "\nDeveloper : " + cg.developer
					ve_ += "\nDescription : " + cg.description
				}
				await VHsendMessage(VH, to, ve_)
			} else if (txt.startsWith('smule')) {
				const vhani = txt.replace('smule' + " ", "")
				const cuj = vhani.split(" ")
				let pesan = `𝗦𝗠𝗨𝗟𝗘 𝗠𝗘𝗡𝗨\n\n𝗖𝗼𝗺𝗺𝗮𝗻𝗱:\n  1. ${setkey}smule record {username}\n  2. ${setkey}smule download {link record}`
				if (vhani == "") {
					VHsendMessage(VH, to, pesan)
				} else {
					if (cuj[0] == "record") {
						const barang = cuj[1].split("|")
						const hasil = barang[0]
						const value = Number(barang[1]) - 1
						VHsendMessage(VH, to, 'Please wait. . .')
						const response = await Requests('https://www.smule.com/' + hasil + '/performances/json')
						const pp = await response.json()
						const cok = pp.list
						let no = 0
						let dat = "𝗦𝗠𝗨𝗟𝗘 𝗥𝗘𝗖𝗢𝗥𝗗𝗜𝗡𝗚\n"
						for (var prop in cok) {
							no += 1
							dat += `\n*${no}*.` + " " + cok[prop].title.substring(0, 26) + " | *" + cok[prop].type + "*"
						}
						if (barang.length == 1) {
							dat += "\n\n*To see detail*: " + setkey + "smule record " + hasil + "|number"
							VHsendMessage(VH, to, dat)
						}
						if (barang.length == 2) {
							try {
								let urel = "https://www.smule.com/p/" + cok[value].performance_key
								let dat = "𝗥𝗘𝗖𝗢𝗥𝗗𝗜𝗡𝗚 𝗗𝗘𝗧𝗔𝗜𝗟\n"
								dat += "\n • Username: " + hasil
								dat += "\n • Title: " + cok[value].title
								dat += "\n • Artist: " + cok[value].artist
								dat += "\n • Title: " + cok[value].title
								dat += "\n • Like: " + cok[value].stats.total_loves
								dat += "\n • Comment: " + cok[value].stats.total_comments
								dat += "\n • Type: " + cok[value].type
								dat += "\n • Desk: " + cok[value].message
								dat += "\n • Created_at: " + cok[value].created_at
								dat += "\n • From city: " + cok[value].orig_track_city.city + " | " + cok[value].orig_track_city.country
								dat += "\n • Url: " + urel
								const response = await Requests(Host + '/getsmule?link=' + urel + '&apikey=' + PremiumKey)
								const pp = await response.json()
								const mek = pp.result
								if (mek.Type === "audio") {
									await VHsendImageUrl(VH, to, mek.image, dat)
									await VHsendAudioUrl(VH, to, mek.url, "")
								} else {
									await VHsendVideoUrl(VH, to, mek.url, dat)
								}
							} catch (err) {
								console.log('Error, ' + err)
							}
						}
					} else if (cuj[0] == "download") {
						try {
							VHsendMessage(VH, to, 'please wait..')
							const response = await Requests(Host + '/getsmule?link=' + cuj[1] + '&apikey=' + PremiumKey)
							const pp = await response.json()
							const mek = pp.result
							if (mek.Type === "audio") {
								await VHsendImageUrl(VH, to, mek.image, mek.title)
								await VHsendAudioUrl(VH, to, mek.url, "")
							} else {
								await VHsendVideoUrl(VH, to, mek.url, mek.title)
							}
						} catch (err) {
							console.log('Error, ' + err)
						}
					} else {
						VHsendMessage(VH, to, pesan)
					}
				}
			} else if (txt.startsWith("starmaker download")) {
				const vhani = txt.replace('starmaker download' + " ", "")
				const response = await Requests(Host + "/starmakerdl?link=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				const cok = data.result
				let dat = "*STARMAKER*\n"
				for (var iu = 0; iu < cok.length; iu++) {
					dat += "\n*_Title_*: " + cok[iu].judul
					dat += "\n*_Description_*: " + cok[iu].desc
					dat += "\n\n*VHtear Selfbot*"
					VHsendImageUrl(VH, to, cok[iu].image, dat)
					VHsendVideoUrl(VH, to, cok[ui].url)
				}
			} else if (txt.startsWith("cocofun download")) {
				const vhani = txt.replace('cocofun download' + " ", "")
				const response = await Requests(Host + "/cocodownload?link=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				const cok = data.result
				VHsendVideoUrl(VH, to, cok.video, "*COCOFUN DOWNLOAD*")
			} else if (txt.startsWith("xxx-search")) {
				const vhani = txt.replace('xxx-search' + " ", "")
				const response = await Requests(Host + "/xxxsearch?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result.data
				let fox = "*_XXX SEARCH_*\n\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n*Title* : " + asu[a].title
					fox += "\n*Link* : " + asu[a].url
					fox += "\n*Durasi* : " + asu[a].duration
				}
				VHsendImageUrl(VH, to, asu[0].image, fox)
			} else if (txt.startsWith("xxx-download")) {
				const vhani = txt.replace('xxx-download' + " ", "")
				const response = await Requests(Host + "/xxxdownload?link=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result.urlVideo
				VHsendVideoUrl(VH, to, asu[0].videoUrl, "*XXX DOWNLOAD*")
			} else if (txt.startsWith("lk21")) {
				const vhani = txt.replace('lk21' + " ", "")
				const response = await Requests(Host + "/downloadfilm?judul=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result.data
				let fox = "*_LK21 DOWNLOAD_*\n\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n*Resolution* : " + asu[a].resolusi
					fox += "\n*Link* : " + asu[a].urlDownload
				}
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("neonimesearch")) {
				const vhani = txt.replace('neonimesearch' + " ", "")
				const response = await Requests(Host + "/neonime_search?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*_NOENIME SEARCH_*\n\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\nTitle : " + asu[a].title
					fox += "\nLink : " + asu[a].link
				}
				VHsendImageUrl(VH, to, asu[0].image, fox)
			} else if (txt == "neonimedownload") {
				console.log("belum")
			} else if (txt.startsWith("nekopoisearch")) {
				const vhani = txt.replace('nekopoisearch' + " ", "")
				const response = await Requests(Host + "/nekosearch?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*_NEKOPOI SEARCH_*\n\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\nTitle : " + asu[a].title
					fox += "\nDetail : " + asu[a].detail
				}
				VHsendImageUrl(VH, to, asu[0].image, fox)
			} else if (txt.startsWith("nekohentai")) {
				const response = await Requests(Host + "/nekohentai&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Neko Hentai*\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n*Title :*" + asu[a].title
					fox += "*Detail :*\n" + asu[a].detail
					fox += "*Link :*\n" + asu[a].url
				}
				VHsendImageUrl(VH, to, asu[0].image, fox)
			} else if (txt.startsWith("neko3d")) {
				const response = await Requests(Host + "/neko3d&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Neko 3D*\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n*Title :*\n" + asu[a].title
					fox += "\n*Detail :*\n" + asu[a].description
					fox += "*\n*Link :*\n" + asu[a].url
				}
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("nekojavcosplay")) {
				const response = await Requests(Host + "/nekojavcosplay&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Neko JAV Cosplay*\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n" + asu[a].detail
					fox += "*\n*Link :*\n" + asu[a].url
				}
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("nekonewepisode")) {
				const response = await Requests(Host + "/nekonewepisode&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Neko New Episode*\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n*Title :*\n" + asu[a].title
					fox += "*\n*Date :*\n" + asu[a].date
					fox += "*\n*Link :*\n" + asu[a].url
				}
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("nekojavlist")) {
				const response = await Requests(Host + "/nekojavlist&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Neko JAV List*\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n*Title :*" + asu[a].title
					fox += "\n*Seri :*\n" + asu[a].seri
					fox += "\n*Link :*\n" + asu[a].url
				}
				VHsendMessage(VH, to, fox)

			} else if (txt.startsWith("ongoinganoboy")) {
				const response = await Requests(Host + "/ongoinganoboy&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*_On Going Anoboy_*\n\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\nTitle : " + asu[a].title
					fox += "\nLink : " + asu[a].url
				}
				VHsendImageUrl(VH, to, asu[0].image, fox)
			} else if (txt == "nhentaisearch") {
				console.log("belum")
			} else if (txt == "nhentaidownload") {
				console.log("belum")
			} else if (txt == "nhentairandom") {
				console.log("belum")
			} else if (txt.startsWith("joox")) {
				const vhani = txt.replace('joox' + " ", "")
				const response = await Requests(Host + "/music?query=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				const cok = data.result
				let dat = "*JOOX MUSIC*\n"
				for (var iu = 0; iu < cok.length; iu++) {
					dat += "\n*_Title_*: " + cok[iu].judul
					dat += "\n*_Artis_*: " + cok[iu].penyanyi
					dat += "\n*_Duration_*: " + cok[iu].duration
					dat += "\n*_Size_*: " + cok[iu].filesize
					dat += "\n\n*VHtear Selfbot*"
					VHsendImageUrl(VH, to, cok[iu].linkImg, dat)
					VHsendAudioUrl(VH, to, `${cok[iu].linkMp3}`, "joox")
				}
			} else if (txt.startsWith("lirik")) {
				const vhani = txt.replace('lirik' + " ", "")
				const response = await Requests(Host + "/liriklagu?query=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				VHsendMessage(VH, to, data.result.result)
			} else if (txt.startsWith("chord")) {
				const vhani = txt.replace('chord' + " ", "")
				const response = await Requests(Host + "/chordguitar?query=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				VHsendMessage(VH, to, data.result.result)
			} else if (txt.startsWith('pinterest')) {
				const vhani = txt.replace('pinterest' + " ", "")
				const barang = vhani.split("|")
				const hasil = barang[0]
				const value = Number(barang[1])
				const response = await Requests(Host + '/pinterest?query=' + hasil + '&apikey=' + PremiumKey)
				const ppek = await response.json()
				const mek = ppek.result
				let num = 0
				for (var ere in mek) {
					num += 1
					await VHsendImageUrl(VH, to, mek[ere])
					if (num == value) {
						break
					}
				}
			} else if (txt.startsWith("pinterdownload")) {
				const vhani = txt.replace('pinterdownload' + " ", "")
				VHsendImageUrl(VH, to, vhani, "*Pinterest*")
			} else if (txt.startsWith("zodiak")) {
				const vhani = txt.replace('zodiak' + " ", "")
				const response = await Requests(Host + "/zodiak?query=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				const elfox = data.result
				let fox = "*Result Zodiak*"
				fox += "\n\n*Zodiac :*" + elfox.zodiak
				fox += "\n\n*Ramalan :*\n" + elfox.ramalan
				fox += "\n\n*Nomor Keberuntungan :*\n" + elfox.nomorKeberuntungan
				fox += "\n\n*Motivasi :*\n" + elfox.motivasi
				fox += "\n\n*Inspirasi :*\n" + elfox.inspirasi
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("wikipedia")) {
				const vhani = txt.replace('wikipedia' + " ", "")
				const response = await Requests(Host + "/wikipedia?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				const pp = datas.result.ImgResult
				let fox = "*_WIKIPEDIA_*\n"
				fox += "\n*Result :*\n" + asu.Info
				for (var a = 0; a < pp.length; a++) {}
				VHsendImageUrl(VH, to, pp[0], fox)
			} else if (txt.startsWith("brainly")) {
				const vhani = txt.replace('brainly' + " ", "")
				const response = await Requests(Host + "/branly?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*VHSelfbot*\n\n" + asu.data
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("kbbi")) {
				const vhani = txt.replace('kbbi' + " ", "")
				const response = await Requests(Host + "/kbbi?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*VHSelfbot*\n\n" + asu.hasil
				fox += "\n\n\nSource :" + asu.source
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("calcu")) {
				const vhani = txt.replace('calcu' + " ", "")
				const response = await Requests(Host + "/calculator?value=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*VHSelfbot*\n\n" + asu.data
				fox += "\n\n\nInfo :\n" + asu.info
				fox += "\n\nMedia : https://api.vhtear.com"
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("corona")) {
				const vhani = txt.replace('corona' + " ", "")
				const response = await Requests(Host + "/calculator?value=" + vhani + "&apikey=" + PremiumKey)
				const datax = await response.json()
				const datas = datax.result
				let fox = "*Corona Info*\n\n"
				for (var a = 0; a < pp.length; a++) {
					fox += "\n*Negara : *" + datas.country
					fox += "\n*Mati : *" + datas.deaths
					fox += "\n*Kasus : *" + datas.cases
					fox += "\n*Sembuh : *" + datas.recovered
					fox += "\n*Kritis : *" + datas.critical
					fox += "\n\n*Hari ini :*"
					fox += "\n   #Mati: " + datas.todayDeaths
					fox += "\n   #Kasus: " + datas.todayCases
					fox += "\n\nMedia : https://api.vhtear.com"
					VHsendMessage(VH, to, fox)
					console.log("belum")
				}
			} else if (txt.startsWith("cuaca")) {
				const vhani = txt.replace('cuaca' + " ", "")
				const response = await Requests(Host + "/weather?city=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*VHSelfbot*\n\n" + asu.weather
				fox += "\n" + asu.location
				fox += "\n\nMedia : https://api.vhtear.com"
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("bmkg")) {
				const vhani = txt.replace('bmkg' + " ", "")
				const response = await Requests(Host + "/infogempa&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*_Info Gempa_*\n\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n\nSource : " + asu[a].Source
					fox += "\nKedalaman : " + asu[a].Kedalaman
					fox += "\nWilayah : " + asu[a].Wilayah
					fox += "\nPotensi : " + asu[a].Potensi
					fox += "\nMagnitude : " + asu[a].magnitude
					fox += "\nTanggal : " + asu[a].Tanggal
					fox += "\nJam : " + asu[a].Jam
				}
				VHsendMessage(VH, to, fox)
			} else if (txt == "cekresi") {
				console.log("belum")
			} else if (txt == "cekongkir") {
				console.log("belum")
			} else if (txt.startsWith("togel")) {
				const response = await Requests(Host + "/togel&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result.hasil
				let fox = "*_Result Togel_*\n\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\nNegara : " + asu[a].Negara
					fox += "\nSenin : " + asu[a].Senin
					fox += "\nSelasa : " + asu[a].Selasa
					fox += "\nRabu : " + asu[a].Rabu
					fox += "\nKamis : " + asu[a].Kamis
					fox += "\nJumat : " + asu[a].Jumat
					fox += "\nSabtu : " + asu[a].Sabtu
					fox += "\nMinggu : " + asu[a].Minggu
				}
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("kurs")) {
				console.log("belum")
			} else if (txt.startsWith("resep")) {
				const vhani = txt.replace('resep' + " ", "")
				const response = await Requests(Host + "/resepmasakan?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Result Resep*\n"
				fox += "\n*Title :*\n" + asu.title
				fox += "\n\n*Deskripsi :*\n" + asu.desc
				fox += "\n\n*Bahan :*\n" + asu.bahan
				fox += "\n\n*Cara :*\n" + asu.cara
				VHsendImageUrl(VH, to, asu.image, fox)
			} else if (txt.startsWith("shopee")) {
				console.log("belum")
			} else if (txt.startsWith("gsmarena")) {
				const vhani = txt.replace('gsmarena' + " ", "")
				const response = await Requests(Host + "/gsmarena?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Result GSMarena*\n"
				fox += "\n*Title :*\n" + asu.title
				fox += "\n\n*Spesifikasi :*\n" + asu.spec
				VHsendImageUrl(VH, to, asu.image, fox)
			} else if (txt.startsWith("quranlist")) {
				const response = await Requests(Host + "/quranlist?&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result.list
				let fox = "*_Result Quran_*\n\n"
				let no = 0
				for (var a = 0; a < asu.length; a++) {
					no += 1
					fox += "\n" + asu[a]
				}
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("jadwalsholat")) {
				const vhani = txt.replace('jadwalsholat' + " ", "")
				const response = await Requests(Host + "/jadwalsholat?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Result Sholat*\n"
				fox += "\n*Kota :* " + asu.kota
				fox += "\n*Tanggal :* " + asu.tanggal
				fox += "\n*Shubuh :* " + asu.Shubuh
				fox += "\n*Zduhur :* " + asu.Zduhur
				fox += "\n*Ashr :* " + asu.Ashr
				fox += "\n*Magrib :* " + asu.Magrib
				fox += "\n*Isya :* " + asu.Isya
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("artinama")) {
				const vhani = txt.replace('artinama' + " ", "")
				const response = await Requests(Host + "/artinama?nama=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				VHsendMessage(VH, to, asu.hasil)
			} else if (txt.startsWith("artimimpi")) {
				const vhani = txt.replace('artimimpi' + " ", "")
				const response = await Requests(Host + "/artimimpi?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				VHsendMessage(VH, to, asu.hasil)
			} else if (txt.startsWith("jodoh")) {
				const vhani = txt.replace('jodoh' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = await Requests(Host + "/primbonjodoh?nama=" + fox + "&pasangan=" + vez + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				VHsendMessage(VH, to, asu.hasil)
			} else if (txt.startsWith("weton")) {
				const vhani = txt.replace('weton' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const zal = pemisah[2]
				const response = await Requests(Host + "/ramalweton?tgl=" + fox + "&bln=" + vez + "&thn=" + zal + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				VHsendMessage(VH, to, asu.hasil)
			} else if (txt.startsWith("nomor")) {
				const vhani = txt.replace('nomor' + " ", "")
				const response = await Requests(Host + "/nomerhoki?no=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				VHsendMessage(VH, to, asu.hasil)
			} else if (txt.startsWith("harijadian")) {
				const vhani = txt.replace('harijadian' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const zal = pemisah[2]
				const response = await Requests(Host + "/harijadian?tgl=" + fox + "&bln=" + vez + "&thn=" + zal + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				VHsendMessage(VH, to, asu.hasil)
			} else if (txt == "herolistml") {
				const response = await Requests(Host + "/mlherolist?apikey=" + PremiumKey)
				const data = await response.json()
				const asu = data.result.hasil
				let fox = "*List Hero*\n"
				let no = 0
				for (var a = 0; a < asu.length; a++) {
					no += 1
					fox += "\n" + no + ". " + asu[a].title
				}
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("heroml")) {
				const vhani = txt.replace('heroml' + " ", "")
				const response = await Requests(Host + "/herodetail?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Detail Hero*\n"
				fox += "*Title :* " + asu.title
				fox += "\n*Quotes :*\n" + asu.quotes
				fox += "\n*Info :*\n" + asu.info
				fox += "\n*Attributes :*" + asu.attributes
				VHsendImageUrl(VH, to, asu.pictHero, fox)
			} else if (txt.startsWith("ipwho")) {
				const vhani = txt.replace('ipwho' + " ", "")
				const response = await Requests(Host + "/ipwhois?ipaddr=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*Detail IP Address*\n"
				fox += "*IP :* " + asu.ip_address
				fox += "\n*City :* " + asu.city
				fox += "\n*Region :* " + asu.region
				fox += "\n*Country :* " + asu.country
				fox += "\n*Postal Code :* " + asu.postal_code
				fox += "\n*Latitude_longitude :* " + asu.latitude_longitude
				fox += "\n*Time Zone :* " + asu.time_zone
				fox += "\n*Calling Code :* " + asu.calling_code
				fox += "\n*Currency :* " + asu.currency
				fox += "\n*Kode Bahasa :* " + asu.languages
				fox += "\n*Org :* " + asu.org
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("textscreen")) {
				const vhani = txt.replace('textscreen' + " ", "")
				const response = await Requests(Host + "/textscreen?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				VHsendMessage(VH, to, asu.text)
			} else if (txt.startsWith("ceritasex")) {
				const vhani = txt.replace('ceritasex' + " ", "")
				const response = await Requests(Host + "/cerita_sex&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = asu.judul
				fox += "\n" + asu.cerita
				VHsendImageUrl(VH, to, asu.image, fox)
			} else if (txt == "randompuisi") {
				const response = Host + "/puisi_image&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*Puisi Image*")
			} else if (txt == "randompantun") {
				const response = await Requests(Host + "/random_pantun&apikey=" + PremiumKey)
				const data = await response.json()
				VHsendMessage(VH, to, data.result.pantun)
			} else if (txt == "quoteid") {
				const response = await Requests(Host + "/quoteid&apikey=" + PremiumKey)
				const data = await response.json()
				VHsendMessage(VH, to, data.result.kata)
			} else if (txt == "quotes") {
				const response = await Requests(Host + "/quotes?apikey=" + PremiumKey)
				const data = await response.json()
				VHsendMessage(VH, to, data.result.content)
			} else if (txt == "randomcat") {
				const response = await Requests(Host + "/randomcat?apikey=" + PremiumKey)
				const data = await response.json()
				VHsendImageUrl(VH, to, data.result.url, "*_Random Cat_*")
			} else if (txt == "randomnekonime") {
				const response = await Requests(Host + "/randomnekonime&apikey=" + PremiumKey)
				const data = await response.json()
				VHsendImageUrl(VH, to, data.result.result, "*_Random Nekonime_*")
			} else if (txt == "randomloli") {
				const response = await Requests(Host + "/randomloli&apikey=" + PremiumKey)
				const data = await response.json()
				VHsendImageUrl(VH, to, data.result.result, "*RANDOM LOLI*")
			} else if (txt == "randomwibu") {
				const response = await Requests(Host + "/randomwibu&apikey=" + PremiumKey)
				const data = await response.json()
				let fox = "*Nama : *" + data.result.nama
				fox += "*\nDeskripsi : *" + data.result.deskripsi
				VHsendImageUrl(VH, to, data.result.foto, fox)
			} else if (txt.startsWith("urlshortener")) {
				const vhani = txt.replace('urlshortener' + " ", "")
				const response = await Requests(Host + "/shortener?link=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				VHsendMessage(VH, to, data.result.Short)
			} else if (txt.startsWith("ssweb")) {
				const vhani = txt.replace('ssweb' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/ssweb?link=" + fox + "&type=" + vez + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_SSWEB_*")
			} else if (txt.startsWith("jarak")) {
				const vhani = txt.replace('jarak' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = await Requests(Host + "/distance?from=" + fox + "&to=" + vez + "&apikey=" + PremiumKey)
				const datas = await response.json()
				VHsendMessage(VH, to, datas.result.data)
			} else if (txt.startsWith("alamat")) {
				const vhani = txt.replace('alamat' + " ", "")
				const response = await Requests(Host + "/infoalamat?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*_Info Alamat_*\n\n"
				fox += "\n*Info :*\n" + asu.data
				fox += "\n*Deskripsi :*\n" + asu.deskripsi
				VHsendMessage(VH, to, fox)
			} else if (txt == "berita terbaru") {
				console.log("belum")
			} else if (txt == "jadwal bola") {
				const response = await Requests(Host + "/jadwalbola&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result.data
				let fox = "*_Result Bola_*\n\n"
				let no = 0
				for (var a = 0; a < asu.length; a++) {
					no += 1
					fox += "\n\n<" + no + ">\n"
					fox += "Kick Off : " + asu[a].kickoff
					fox += "\nPertandingan : " + asu[a].pertandingan
					fox += "\nStasiun TV : " + asu[a].stasiuntv
				}
				VHsendMessage(VH, to, fox)
			} else if (txt.startsWith("motor")) {
				const vhani = txt.replace('motor' + " ", "")
				const response = await Requests(Host + "/infomotor?merk=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*_Info Motor_*\n\n"
				fox += "\n*Title :*\n" + asu.title
				fox += "\n\n*Spesifikasi :*\n" + asu.spesifikasi
				fox += "\n\n*Kekurangan :*\n" + asu.kekurangan
				fox += "\n\n*Kelebihan :*\n" + asu.kelebihan
				fox += "\n\n*Harga :*\n" + asu.harga
				VHsendImageUrl(VH, to, asu.image, fox)
			} else if (txt.startsWith("mobil")) {
				const vhani = txt.replace('mobil' + " ", "")
				const response = await Requests(Host + "/infomobil?merk=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result
				let fox = "*_Info Mobil_*\n\n"
				fox += "\n*Title :*\n" + asu.title
				fox += "\n\n*Spesifikasi :*\n" + asu.spesifikasi
				fox += "\n\n*Kekurangan :*\n" + asu.kekurangan
				fox += "\n\n*Kelebihan :*\n" + asu.kelebihan
				fox += "\n\n*Harga :*\n" + asu.harga
				VHsendImageUrl(VH, to, asu.image, fox)
				
			} else if (txt.startsWith("otakusearch")) {
				const vhani = txt.replace('otakusearch' + " ", "")
				const response = await Requests(Host + "/otakusearch?query=" + vhani + "&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result.data
				let fox = "*_Result Otaku_*\n\n"
				let no = 0
				for (var a = 0; a < asu.length; a++) {
					no += 1
					fox += "\n\n<" + no + ">\n"
					fox += "*Title :*\n" + asu[a].title
					fox += "\n*Link :*\n" + asu[a].link
					fox += "\n*Date :*\n" + asu[a].datetime
				}
				VHsendImageUrl(VH, to, asu[0].image, fox)
				
			} else if (txt == "otakulatest") {
				const response = await Requests(Host + "/otakulatest&apikey=" + PremiumKey)
				const datas = await response.json()
				const asu = datas.result.data
				let fox = "*_Latest Otaku_*\n\n"
				let no = 0
				for (var a = 0; a < asu.length; a++) {
					no += 1
					fox += "\n\n<" + no + ">\n"
					fox += "*Title :*\n" + asu[a].title
					fox += "\n*Link :*\n" + asu[a].link
					fox += "\n*Date :*\n" + asu[a].datetime
				}
				VHsendImageUrl(VH, to, asu[0].image, fox)
				
			} else if (txt.startsWith("nulis")) {
				const vhani = txt.replace('nulis' + " ", "")
				const response = Host + "/write?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_MAGER NULIS_*")
				
			} else if (txt.startsWith('wasticker')) {
				const vhani = txt.replace('wasticker' + " ", "")
				const barang = vhani.split("|")
				const hasil = barang[0]
				const value = Number(barang[1])
				const response = await Requests(Host + '/wasticker?query=' + hasil + '&apikey=' + PremiumKey)
				const ppek = await response.json()
				const mek = ppek.result.data
				let num = 0
				for (var ere in mek) {
					num += 1
					await VHsendStickerUrl(VH, to, mek[ere])
					if (num == value) {
						break
					}
				}
			
			} else if (txt.startsWith("watertext")) {
				const vhani = txt.replace('watertext' + " ", "")
				const response = Host + "/water_maker?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*WATER MAKER*")
			} else if (txt.startsWith("swatertext")) {
				const vhani = txt.replace('swatertext' + " ", "")
				const response = Host + "/water_maker?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("firetext")) {
				const vhani = txt.replace('firetext' + " ", "")
				const response = Host + "/fire_maker?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*FIRE MAKER*")
			} else if (txt.startsWith("sfiretext")) {
				const vhani = txt.replace('sfiretext' + " ", "")
				const response = Host + "/fire_maker?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("metaltext")) {
				const vhani = txt.replace('metaltext' + " ", "")
				const response = Host + "/metal_maker?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*METAL MAKER*")
			} else if (txt.startsWith("smetaltext")) {
				const vhani = txt.replace('smetaltext' + " ", "")
				const response = Host + "/metal_maker?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
			
			} else if (txt.startsWith("ballontext")) {
				const vhani = txt.replace('ballontext' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/balloonmaker?text1=" + fox + "&text2=" + vez + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*BALLON MAKER*")
			} else if (txt.startsWith("sballontext")) {
				const vhani = txt.replace('sballontext' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/balloonmaker?text1=" + fox + "&text2=" + vez + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("padlock")) {
				const vhani = txt.replace('padlock' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/padlock?text1=" + fox + "&text2=" + vez + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*PAD LOCK*")
			} else if (txt.startsWith("spadlock")) {
				const vhani = txt.replace('spadlock' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/padlock?text1=" + fox + "&text2=" + vez + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("giftext")) {
				const vhani = txt.replace('giftext' + " ", "")
				const response = Host + "/textxgif?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*GIF MAKER*")
			} else if (txt.startsWith("sgiftext")) {
				const vhani = txt.replace('sgiftext' + " ", "")
				const response = Host + "/textxgif?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("slidingtext")) {
				const vhani = txt.replace('slidingtext' + " ", "")
				const response = Host + "/slidingtext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendVideoUrl(VH, to, response, "*SLIDING MAKER*")
			} else if (txt.startsWith("zslidingtext")) {
				const vhani = txt.replace('zslidingtext' + " ", "")
				const response = Host + "/slidingtext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("bannerff")) {
				const vhani = txt.replace('bannerff' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/bannerff?title=" + fox + "&text=" + vez + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*BANNER FF*")
			} else if (txt.startsWith("sbannerff")) {
				const vhani = txt.replace('sbannerff' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/bannerff?title=" + fox + "&text=" + vez + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("fflogo ")) {
				const vhani = txt.replace('fflogo' + " ", "")
				const response = Host + "/logoff?hero=alok&text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_FF MAKER_*")
			} else if (txt.startsWith("sfflogo ")) {
				const vhani = txt.replace('sfflogo' + " ", "")
				const response = Host + "/logoff?hero=alok&text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("mllogo")) {
				const vhani = txt.replace('mllogo' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/logoml?hero=" + fox + "&text=" + vez + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*ML LOGO*")
			} else if (txt.startsWith("smllogo")) {
				const vhani = txt.replace('smllogo' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/logoml?hero=" + fox + "&text=" + vez + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("gamelogo")) {
				const vhani = txt.replace('gamelogo' + " ", "")
				const response = Host + "/gamelogo?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_GAME MAKER_*")
			} else if (txt.startsWith("sgamelogo")) {
				const vhani = txt.replace('sgamelogo' + " ", "")
				const response = Host + "/gamelogo?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("blackpinktext")) {
				const vhani = txt.replace('blackpinktext' + " ", "")
				const response = Host + "/blackpinkicon?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_BLACKPINK MAKER_*")
			} else if (txt.startsWith("sblackpinktext")) {
				const vhani = txt.replace('sblackpinktext' + " ", "")
				const response = Host + "/blackpinkicon?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("thundertext")) {
				const vhani = txt.replace('thundertext' + " ", "")
				const response = Host + "/thundertext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_THUNDER MAKER_*")
			} else if (txt.startsWith("sthundertext")) {
				const vhani = txt.replace('sthundertext' + " ", "")
				const response = Host + "/thundertext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("silktext")) {
				const vhani = txt.replace('silktext' + " ", "")
				const response = Host + "/silktext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_SILK MAKER_*")
			} else if (txt.startsWith("zsilktext")) {
				const vhani = txt.replace('zsilktext' + " ", "")
				const response = Host + "/silktext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
			
			} else if (txt.startsWith("partytext")) {
				const vhani = txt.replace('partytext' + " ", "")
				const response = Host + "/partytext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_PARTY MAKER_*")
			} else if (txt.startsWith("spartytext")) {
				const vhani = txt.replace('spartytext' + " ", "")
				const response = Host + "/partytext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("romancetext")) {
				const vhani = txt.replace('romancetext' + " ", "")
				const response = Host + "/romancetext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_ROMANCE MAKER_*")
			} else if (txt.startsWith("sromancetext")) {
				const vhani = txt.replace('sromancetext' + " ", "")
				const response = Host + "/romancetext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("googletext")) {
				const vhani = txt.replace('googletext' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const zal = pemisah[2]
				const response = Host + "/googletext?text1=" + fox + "&text2=" + vez + "&text3=" + zal + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*GOOGLE TEXT*")
			} else if (txt.startsWith("sgoogletext")) {
				const vhani = txt.replace('sgoogletext' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const zal = pemisah[2]
				const response = Host + "/googletext?text1=" + fox + "&text2=" + vez + "&text3=" + zal + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("glowtext")) {
				const vhani = txt.replace('glowtext' + " ", "")
				const response = Host + "/glowtext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_GLOW MAKER_*")
			} else if (txt.startsWith("sglowtext")) {
				const vhani = txt.replace('sglowtext' + " ", "")
				const response = Host + "/glowtext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("lovetext")) {
				const vhani = txt.replace('lovetext' + " ", "")
				const response = Host + "/lovemessagetext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_LOVE MAKER_*")
			} else if (txt.startsWith("slovetext")) {
				const vhani = txt.replace('slovetext' + " ", "")
				const response = Host + "/lovemessagetext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("glitchtext")) {
				const vhani = txt.replace('glitchtext' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/glitchtext?text1=" + fox + "&text2=" + vez + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_GLITCH MAKER_*")
			} else if (txt.startsWith("sglitchtext")) {
				const vhani = txt.replace('sglitchtext' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/glitchtext?text1=" + fox + "&text2=" + vez + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("galaxytext")) {
				const vhani = txt.replace('galaxytext' + " ", "")
				const response = Host + "/galaxytext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*_GALAXY MAKER_*")
			} else if (txt.startsWith("sgalaxytext")) {
				const vhani = txt.replace('sgalaxytext' + " ", "")
				const response = Host + "/galaxytext?text=" + vhani + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
				
			} else if (txt.startsWith("pornlogo")) {
				const vhani = txt.replace('pornlogo' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/pornlogo?text1=" + fox + "&text2=" + vez + "&apikey=" + PremiumKey
				VHsendImageUrl(VH, to, response, "*PORN LOGO*")
			} else if (txt.startsWith("spornlogo")) {
				const vhani = txt.replace('spornlogo' + " ", "")
				pemisah = vhani.split("|")
				const fox = pemisah[0]
				const vez = pemisah[1]
				const response = Host + "/pornlogo?text1=" + fox + "&text2=" + vez + "&apikey=" + PremiumKey
				VHsendStickerUrl(VH, to, response)
					
			} else if (txt.startsWith("hartatahta")) {
				const vhani = txt.replace('hartatahta' + " ", "")
				const response = Host + "/hartatahta?text=" + vhani + "&apikey=" + PremiumKey
				await VHsendImageUrl(VH, to, response, "*_HARTA TAHTA_*")
			} else if (txt.startsWith("shartatahta")) {
				const vhani = txt.replace('shartatahta' + " ", "")
				const response = Host + "/hartatahta?text=" + vhani + "&apikey=" + PremiumKey
				await VHsendStickerUrl(VH, to, response)
			
			} else if (txt.startsWith("music")) {
				const vhani = txt.replace('music' + " ", "")
				const response = await Requests(Host + "/music?query=" + vhani + "&apikey=" + PremiumKey)
				const data = await response.json()
				const cok = data.result
				let dat = "*JOOX MUSIC*\n"
				for (var iu = 0; iu < cok.length; iu++) {
					dat += "\n*_Title_*: " + cok[iu].judul
					dat += "\n*_Artis_*: " + cok[iu].penyanyi
					dat += "\n*_Duration_*: " + cok[iu].duration
					dat += "\n*_Size_*: " + cok[iu].filesize
					dat += "\n\n*VHtear Selfbot*"
					VHsendImageUrl(VH, to, cok[iu].linkImg, dat)
					VHsendAudioUrl(VH, to, `${cok[iu].linkMp3}`, "joox")
				}
			}
		}

	})

	VH.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		console.log('battery level: ' + batterylevel)
	})
	VH.on('close', ({
		reason,
		isReVHecting
	}) => (
		console.log('oh no got disVHected: ' + reason + ', reVHecting: ' + isReVHecting)
	))
}

SBVHtear().catch((err) => console.log(`encountered error: ${err}`))
