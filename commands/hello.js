module.exports = {
    name: 'hello',
    description: "greets the server",
    execute(message, args){
        message.channel.send('Good Evening');
    }
}