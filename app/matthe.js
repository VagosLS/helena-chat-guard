const Discord = require("discord.js")
const client = new Discord.Client();
const db = require("quick.db")
const jahky = require("./jahky.json")

client.on("ready", () => {
    client.user.setPresence({ activity: { name: jahky.durum }, status: jahky.status })
    console.log(`${client.user.username} Olarak Giriş Yapıldı Bot Aktif JAHKY x MATTHE`)
    client.channels.cache.get(jahky.seskanal).join()
})

client.login(process.env.token).catch(err => {
    console.error("Bot Giriş Yapamadı!")
    console.error("Token Girilmemiş!")
})

client.on('message', async (msg, member) => {



    if (msg.content === 'sa') {

        msg.reply('Aleyküm selam, hoş geldin!');
    }

    if (msg.content === 'sea') {

        msg.reply('Aleyküm selam, hoş geldin!');
    }

    if (msg.content === 'hi') {

        msg.reply('Hi welcome ');
    }


});

client.on('message', async message => {

    let reklamlar = ["discord.app", "discord.gg", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
    let kelimeler = message.content.slice(" ").split(/ +/g)

    if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {

        if (message.member.hasPermission("ADMINISTRATOR")) return; message.delete()

        message.reply('**Bu sunucuda reklamları engelliyorum dostum. Lütfen bir daha etme!**').then(jahkyxd => jahkyxd.delete(5000))
    }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {

    let reklamlar = ["discord.app", "discord.gg", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
    let kelimeler = newMsg.content.slice(" ").split(/ +/g)

    if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {

        if (newMsg.member.hasPermission("ADMINISTRATOR")) return; newMsg.delete()

        oldMsg.reply('**Bu sunucuda reklamları engelliyorum dostum. Lütfen bir daha etme!**').then(jahkyxd => jahkyxd.delete(5000))
    }
});

client.on("message", async msg => {

    const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
    if (kufur.some(word => msg.content.includes(word))) {
        try {
            if (!msg.member.permissions.has("ADMINISTRATOR")) {
                msg.delete();

                return msg.reply('Heey! Küfür Yasak.').then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
            }
        } catch (err) {
            console.log(err);
        }
    }


});

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;
    if (msg.content.length > 1) {
        let caps = msg.content.toUpperCase();
        if (msg.content == caps) {
          if (!msg.member.permissions.has("ADMINISTRATOR")) {
            if (!msg.mentions.users.first()) {
              msg.delete();
              return msg.channel.send(`${msg.member}, Capslock Kapat Lütfen!`).then(jahkyxd => jahkyxd.delete({timeout: 5000}))
                
            }
          }
        }
    }
  });

client.on("messageUpdate", async msg => {


    const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
    if (kufur.some(word => msg.content.includes(word))) {
        try {
            if (!msg.member.permissions.has("ADMINISTRATOR")) {
                msg.delete();

                return msg.reply('Yakaladım Seni! Küfür Yasak.').then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
            }
        } catch (err) {
            console.log(err);
        }
    }
});

const usersMap = new Map();
const LIMIT = 5;
const TIME = 10000;
const DIFF = 2000;


client.on('message', async message => {
    if (message.author.bot) return;
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    if (message.member.roles.cache.get(jahky.mutedrole)) return;
    if (usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if (difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            msgCount++;
            if (parseInt(msgCount) === LIMIT) {
                const mutedrole = message.guild.roles.cache.get(jahky.mutedrole)
                message.member.roles.add(mutedrole);
                message.channel.send("Spam  yaptığından dolayı 15 dakika boyunca susturuldun.").then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))

                setTimeout(() => {
                    if (!message.member.roles.cache.get(jahky.mutedrole)) return;
                    message.member.roles.remove(mutedrole);
                    message.channel.send("Muten açıldı lütfen tekrar spam yapma.").then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
                }, 900000);//9000000
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData)
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id)
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        })
    }
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.member.hasPermission('ADMINISTRATOR')) return;

    if (message.mentions.users.size >= 3) {
        const mutedrole = message.guild.roles.cache.get(jahky.mutedrole)
        message.member.roles.add(mutedrole);
        message.channel.send("Birden çok kişiyi etiketlediğin için 15 dakika boyunca susturuldun.");
        setTimeout(() => {
            message.member.roles.remove(mutedrole);
            message.channel.send("Muten açıldı lütfen tekrar insanları etiketleme.")
        }, 900000);//9000000
        if (message.deletable) message.delete({ timeout: 5000 }).catch(console.error);
    }
});
