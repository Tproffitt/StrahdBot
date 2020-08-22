module.exports = {
    name: 'roll',
    description: "rolls dice",
    execute(message, args){
        // Take the first argument which should be of the form #d#
        const command = args.shift();
        // Split into an array of before and after the d
        const values = command.split("d");

        // TODO: validate input

        // Convert the strings into base-10 integers
        const number_of_dice = parseInt(values[0], 10);
        const die_size = parseInt(values[1], 10);

        var result = 0;
        for (var i = 0; i < number_of_dice; i++){
            result += Math.floor(Math.random() * die_size) + 1;
        }

        message.channel.send("Rolling " + values[0] + " d" + values[1] + "s" + '\n' + result);
    }
}