
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('slackUsers').del()
    .then(function () {
      // Inserts seed entries
      return knex('slackUsers').insert([
        {
          id: 1,
          accessToken: 'xoxp-581894126608-581481478633-481579596384-231576421f422489k5c0669d3710b18a',
          userId: 'UNY8FLMJM',
          teamName: 'Labs11 Pomodoro WS',
          teamId: 'TH8SF1YHW',
          botUserId: 'UH2J39X89',
          botAccessToken: 'xoxb-000000000000-000000000000-aAaaa00AAA0AAAaaaaaAaA0A',
          userEmail: 'homullen0@last.fm',
          channelId: 'CH8SF269E'
        },
        {
          id: 2,
          accessToken: 'xoxp-259741685492-584815972633-254981567925-232564815f42889f27c0669d3710b18a',
          userId: 'UH2MJ5D0M',
          teamName: 'Labs11 Pomodoro WS',
          teamId: 'TH8SF1YHW',
          botUserId: 'UH2J39X89',
          botAccessToken: 'xoxb-000000000000-000000000000-aAaaa00AAA0AAAaaaaaAaA0A',
          userEmail: 'gsambals1@merriam-webster.com',
          channelId: 'CH8SF269E'
        },
        {
          id: 3,
          accessToken: 'xoxp-586154987625-580157495268-586911548792-154978221f42889f27c0669d3710b18a',
          userId: 'K9MBJLMJM',
          teamName: 'Labs11 Pomodoro WS',
          teamId: 'TH8SF1YHW',
          botUserId: 'UH2J39X89',
          botAccessToken: 'xoxb-000000000000-000000000000-aAaaa00AAA0AAAaaaaaAaA0A',
          userEmail: 'kerie2@desdev.cn',
          channelId: 'CH8SF269E'
        },
        {
          id: 4,
          accessToken: 'xoxp-154976285608-514569824533-145698219384-154932621f42889f27c1679d3746b18f',
          userId: 'UH2HPN9W',
          teamName: 'Labs11 Pomodoro WS',
          teamId: 'TH8SF1YHW',
          botUserId: 'UH2J39X89',
          botAccessToken: 'xoxb-000000000000-000000000000-aAaaa00AAA0AAAaaaaaAaA0A',
          userEmail: 'dbleaden3@cnn.com',
          channelId: 'CH8SF269E'
        },
        {
          id: 5,
          accessToken: 'xoxp-581697824608-580591569723-586911478529-546876148f42499f27c0669d3710b18r',
          userId: 'O8HHJLN6G',
          teamName: 'Labs11 Pomodoro WS',
          teamId: 'TH8SF1YHW',
          botUserId: 'UH2J39X89',
          botAccessToken: 'xoxb-000000000000-000000000000-aAaaa00AAA0AAAaaaaaAaA0A',
          userEmail: 'boris4@hibu.com',
          channelId: 'CH8SF269E'
        }
      ]);
    });
};
