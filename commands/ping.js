module.exports = {
    name:'ping',
    description:'commande ping',
    execute(message){
        message.channel.send('... Pong !');
    }
};