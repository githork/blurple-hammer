module.exports = {
  description: "Toggle the Blurple User 2020-role.",
  usage: {
    "<user(s ...)>": "The user(s) you'd like to toggle the role for."
  },
  examples: {},
  aliases: [ "tb" ],
  permissionRequired: 1, // 0 All, 1 Helper, 2 JR.Mod, 3 Mod, 4 SR.Mod, 5 Exec, 6 Admin, 7 Promise#0001
  checkArgs: (args) => args.length >= 1
}

const { getMember } = require("../utils/resolvers.js"), constants = require("../constants")

module.exports.run = async (client, message, args) => {
  let members = args.map(search => getMember(search, message.guild)).filter(m => m);
  if (!members.length) return message.channel.send(`${constants.emojis.tickno} No users were found with your query.`)

  const diff = {};
  for (const member of members) {
    let success;
    if (member.roles.cache.get(constants.roles.blurple)) {
      diff[member.user.tag] = "-";
      success = await member.roles.remove(constants.roles.blurple).catch(() => null)
    } else {
      diff[member.user.tag] = "+";
      success = await member.roles.add(constants.roles.blurple).catch(() => null)
    }

    if (!success) diff[member.user.tag] = "?";
  }

  message.channel.send(`${constants.emojis.tickyes} Blurple User members has been changed: \`\`\`diff\n${Object.keys(diff).map(tag => diff[tag] + " " + tag).join("\n")}\`\`\``)
}