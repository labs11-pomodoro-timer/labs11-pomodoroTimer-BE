// const SlackBot = require('slackbots');
// const request = require('request');

// module.exports = {
//     createBot,
// };

// function createBot() {
//     const bot = new SlackBot({
//         token: process.env.BOT_TOKEN,
//         name: 'focus-timer'
//     });
    
//     // start the bot
//     bot.on('start', () => {
//         const params = {
//             icon_emoji: ':tomato:'
//         }
//         const help = bot.getChannels();
//         help._value.channels.map(data=>{
//             let exists = data.is_member;
//             let id = data.id;
//             let name = data.name;
//             let botName = 'UH2J39X89';
//             console.log({exists, id, name });
//             if(!exists) {
//                 inviteToChannel(data.id, botName);
//             }
//         });
//         // console.log(help._value.channels);
//     });

//     bot.on('message', data => {
//         if (data.type !== 'message') {
//             return;
//         }
//         console.log(data) // to see full response 
//         handleMessage(data);
//     });

//     function handleMessage(message) {
//         const messageText = message.text;
//         if (messageText.includes(' hello')) {
//             const params = {
//                 icon_emoji: ':wave:'
//             }
//             bot.postMessageToChannel('general', `Hello <@${message.team}>`, params);
//         }
//     }

//     function inviteToChannel(channel, botUser) {
//         const params = {
//             uri: `https://slack.com/api/conversations.invite?token=${process.env.USER_TOKEN}&channel=${channel}&users=${botUser}&pretty=1`,
//             method: "POST"
//         }
//         request.post(params, (error, response, body) => {
//             let reqResponse = JSON.parse(body);
//             console.log(reqResponse);
//         })
//     }
// }

