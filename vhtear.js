const {
    default: makeWASocket,
    useSingleFileAuthState,
    DisconnectReason,
    MessageType,
    getContentType

} = require('@adiwajshing/baileys')

const request = require('request');
const fs = require('fs')
const P = require('pino')
const qrcode = require('qrcode-terminal')
const axios = require('axios').default;
const util = require('util')
const {
    state,
    saveState
} = useSingleFileAuthState('./vhtear.json')

const sname = '.'
const owner = ['6281238552767']
const Host = "https://api.vhtear.com"
const Apikey = "your_apikey"


var downloadFile = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function _0x5557(_0x5e240f,_0x1fdcdd){const _0x23446e=_0x2344();return _0x5557=function(_0x55572e,_0x405d2e){_0x55572e=_0x55572e-0x135;let _0x3f3f85=_0x23446e[_0x55572e];return _0x3f3f85;},_0x5557(_0x5e240f,_0x1fdcdd);}function _0x2344(){const _0x2dc342=['2580718QzUCMe','361177CfFKvK','4710KbiNFd','1258887IUSQhB','20074280JeIjdI','3145494ZvDLiC','24669FaYFTQ','2lbUYAj','1436tYPjNP','1208tMYLqu'];_0x2344=function(){return _0x2dc342;};return _0x2344();}(function(_0x239eb4,_0x558425){const _0x519e12=_0x5557,_0x4c6791=_0x239eb4();while(!![]){try{const _0x569445=parseInt(_0x519e12(0x137))/0x1*(parseInt(_0x519e12(0x13d))/0x2)+-parseInt(_0x519e12(0x139))/0x3+-parseInt(_0x519e12(0x13e))/0x4*(parseInt(_0x519e12(0x138))/0x5)+-parseInt(_0x519e12(0x13b))/0x6+-parseInt(_0x519e12(0x136))/0x7+-parseInt(_0x519e12(0x135))/0x8*(parseInt(_0x519e12(0x13c))/0x9)+parseInt(_0x519e12(0x13a))/0xa;if(_0x569445===_0x558425)break;else _0x4c6791['push'](_0x4c6791['shift']());}catch(_0x345b49){_0x4c6791['push'](_0x4c6791['shift']());}}}(_0x2344,0x4a370));const {VHsendButtonMessage,VHsendTemplateButton,VHsendVideoWithUrl,VHsendAudioWithUrl,VHsendImageWithUrl,VHreactionMessage,VHsendSections,VHsendMessage,VHsendMention,VHgetGroup,VHsendReply}=require('./Lib/VH.js');
function _0x7116(_0x567c0a,_0x591899){const _0xad5fa7=_0xad5f();return _0x7116=function(_0x711631,_0x951553){_0x711631=_0x711631-0x92;let _0x3705fb=_0xad5fa7[_0x711631];return _0x3705fb;},_0x7116(_0x567c0a,_0x591899);}const _0x4575e2=_0x7116;(function(_0x4df725,_0x4e1af0){const _0x368b0a=_0x7116,_0x4cffed=_0x4df725();while(!![]){try{const _0x13b9e8=parseInt(_0x368b0a(0x94))/0x1*(-parseInt(_0x368b0a(0x9a))/0x2)+parseInt(_0x368b0a(0x98))/0x3+parseInt(_0x368b0a(0x99))/0x4*(-parseInt(_0x368b0a(0x92))/0x5)+-parseInt(_0x368b0a(0x96))/0x6+-parseInt(_0x368b0a(0x9d))/0x7*(parseInt(_0x368b0a(0x97))/0x8)+parseInt(_0x368b0a(0x9c))/0x9*(-parseInt(_0x368b0a(0x9b))/0xa)+parseInt(_0x368b0a(0x93))/0xb*(parseInt(_0x368b0a(0x95))/0xc);if(_0x13b9e8===_0x4e1af0)break;else _0x4cffed['push'](_0x4cffed['shift']());}catch(_0x26dfc0){_0x4cffed['push'](_0x4cffed['shift']());}}}(_0xad5f,0xe711a));function _0xad5f(){const _0x1f581d=['\x20\x0aConnected\x0a\x20_\x20\x20\x20\x20____\x20\x20____\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a|\x20|\x20\x20/\x20/\x20/\x20/\x20/\x20/____\x20\x20____\x20______\x0a|\x20|\x20/\x20/\x20/_/\x20/\x20__/\x20_\x20/\x20__\x20\x27/\x20___/\x0a|\x20|/\x20/\x20__\x20\x20/\x20/_/\x20\x20__/\x20/_/\x20/\x20/\x20\x20\x20\x20\x0a|___/_/\x20/_/__/___/__,_/_/\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a|>_<|\x20VHtear-V2\x202022\x20|>_<|','35sZdrOy','64064wFnCka','304927tcPwGa','8076FMLbey','2656194EiIaLv','8uTEhKP','2150169wSwXhR','278444DZmfZG','6tWebLr','50930RFhyMM','1251anwCze','7959931lctwNi'];_0xad5f=function(){return _0x1f581d;};return _0xad5f();}const MessageTerminal=_0x4575e2(0x9e);


const VHtearConnect = () => {
    const VHclient = makeWASocket({
        logger: P({
            level: 'silent'
        }),
        printQRInTerminal: true,
        auth: state,
    })

    VHclient.ev.on('connection.update', (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        if (connection === 'close') {
            if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
                VHtearConnect()
            }
        } else if (connection === 'open') {
            console.log(MessageTerminal)
        }
    })

    VHclient.ev.on('creds.update', saveState)

    VHclient.ev.on('messages.upsert', async (fckV) => {
        try {
            fckV = fckV.messages[0]
            if (!fckV.message) return

            fckV.message = (getContentType(fckV.message) === 'ephemeralMessage') ? fckV.message.ephemeralMessage.message : fckV.message
            if (fckV.key && fckV.key.remoteJid === 'status@broadcast') return
            const type = getContentType(fckV.message)
            const content = JSON.stringify(fckV.message)
            const from = fckV.key.remoteJid

            const quoted = type == 'extendedTextMessage' && fckV.message.extendedTextMessage.contextInfo != null ? fckV.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
            const body = (type === 'conversation') ? fckV.message.conversation : (type === 'extendedTextMessage') ? fckV.message.extendedTextMessage.text : (type == 'imageMessage') && fckV.message.imageMessage.caption ? fckV.message.imageMessage.caption : (type == 'videoMessage') && fckV.message.videoMessage.caption ? fckV.message.videoMessage.caption : ''

            const isCmd = body.startsWith(sname)
            const txt = isCmd ? body.slice(sname.length).trim().toLowerCase() : ''

            const args = body.trim().split(/ +/).slice(1)
            const q = args.join(' ')
            const isGroup = from.endsWith('@g.us')
            const sender = fckV.key.fromMe ? (VHclient.user.id.split(':')[0] + '@s.whatsapp.net' || VHclient.user.id) : (fckV.key.participant || fckV.key.remoteJid)
            const senderNumber = sender.split('@')[0]
            const botNumber = VHclient.user.id.split(':')[0]
            const pushname = fckV.pushName || 'FCKVEZA'
            const isMe = botNumber.includes(senderNumber)
            const isowner = owner.includes(senderNumber) || isMe
            if (!fckV.key.fromMe || !isowner) {
                return
            }
            if (txt == "me") {
                VHsendReply(VHclient, from, 'Hallo ' + pushname, fckV)
            } else if (txt == "mention") {
                VHsendMention(VHclient, from, "Hey @VHtears" + fckV.key.participant, [fckV.key.participant])
            } else if (txt == "tagall") {
                var vz = await VHgetGroup(VHclient, from)
                var memB = vz.participants
                let mids = []
                let ve_ = "*Tag All Groups*\n"
                let no = 0
                for (let vh of memB) {
                    no += 1
                    ve_ += "\n" + no + ". @VHtears" + vh.id
                    mids.push(vh.id)
                }
                VHsendMention(VHclient, from, ve_, mids)
            } else if (txt == "react") {
                VHreactionMessage(VHclient, from, fckV.key)
            } else if (txt == "myname") {
                VHsendMessage(VHclient, from, '*' + pushname + '*')
            } else if (txt == "sendimage") {
                VHsendImageWithUrl(VHclient, from, "https://vhtear.com/static/assets/img/brand/new_blue_vhtear.png", "this is for quote msg")
            } else if (txt == "sendaudio") {
                VHsendAudioWithUrl(VHclient, from, "https://api.vhtear.com/1JQU4vcqmCSM")
            } else if (txt == "sendvideo") {
                VHsendVideoWithUrl(VHclient, from, "https://api.vhtear.com/49Ah_X1w-Qpe", "this is for quote msg")
            } else if (txt == "button") {
                VHsendButtonMessage(VHclient, from, "Hi it's button message")
            } else if (txt == "templatebutton") {
                VHsendTemplateButton(VHclient, from, "Hi it's button message")
            } else if (txt == "sections") {
                VHsendSections(VHclient, from, "Hi it's button message")
            } else if (txt.startsWith("chord")) {
                const vhani = txt.replace('chord' + " ", "")
                axios.get(Host + "/chordguitar?query=" + vhani + "&apikey=" + Apikey).then(async function(response) {
                    const datas = await response.data.result.result
                    VHsendMessage(VHclient, from, datas)
                }).catch(function(error) {
                    console.log(error);
                })
            } else if (txt.startsWith("music")) {
                const vhani = txt.replace(sname + 'music' + " ", "")
                console.log(vhani)
                axios.get(Host + "/music?query=" + vhani + "&apikey=" + Apikey).then(async function(response) {
                    const datas = await response.data;
                    const cok = datas.result
                    let dat = "*JOOX MUSIC*\n"
                    for (var iu = 0; iu < cok.length; iu++) {
                        dat += "\n*_Title_*: " + cok[iu].judul
                        dat += "\n*_Artis_*: " + cok[iu].penyanyi
                        dat += "\n*_Duration_*: " + cok[iu].duration
                        dat += "\n*_Size_*: " + cok[iu].filesize
                        dat += "\n\n*VHtear Selfbot*"
                        VHsendImageWithUrl(VHclient, from, cok[iu].linkImg, dat)
                        VHsendAudioWithUrl(VHclient, from, `${cok[iu].linkMp3}`)
                    }
                }).catch(function(error) {
                    console.log(error);
                })

            }

        } catch (e) {
            const isError = String(e)

            console.log(isError)
        }
    })
}

VHtearConnect()
