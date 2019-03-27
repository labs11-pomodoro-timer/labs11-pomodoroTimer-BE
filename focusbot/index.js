const SlackBot = require('slackbots');

module.exports = {
    createBot,
};

function createBot() {
    const bot = new SlackBot({
        token: 'xoxb-586899066608-580615337281-uMcxycdeJGC2gccWT6My2KQ0',
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
        // console.log(data) // to see full response 
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

