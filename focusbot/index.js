const SlackBot = require('slackbots');

module.exports = {
    createBot,
};

function createBot() {
    const bot = new SlackBot({
        token: process.env.BOT_TOKEN,
        name: 'focus-timer'
    });
    
    // start the bot
    bot.on('start', () => {
        const params = {
            icon_emoji: ':tomato:'
        }
    
        bot.postMessageToChannel('general', 'Time to Focus', params);
    });
    
    bot.on('message', data => {
        if (data.type !== 'message') {
            return;
        }
        console.log(data) // to see full response 
        handleMessage(data);
    });

    function handleMessage(message) {
        const messageText = message.text;
        if (messageText.includes(' hello')) {
            const params = {
                icon_emoji: ':wave:'
            }
    
            bot.postMessageToChannel('general', `Hello <@${message.user}>`, params);
        }
    }
}

