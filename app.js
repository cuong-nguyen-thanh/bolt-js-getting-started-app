const { App } = require('@slack/bolt');
const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN || 'xoxb-1564172303667-1578673961893-0kEfc51gPuan5yGddv3f3lDl';
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET || '7bac532792e95a6f98a39a44cdfbd1bd';
// Initializes your app with your bot token and signing secret
const app = new App({
  token: SLACK_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  console.log('adadadadada')
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
