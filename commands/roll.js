module.exports = {
    name: 'roll',
    description: "rolls dice",
    execute(message, args){
        // Take the first argument which should be of the form #d#
        const command = args.shift();
        // Split into an array of before and after the d
        const values = command.split("d");

        // Convert strings into numbers
        var number_of_dice = +values[0];
        var die_size = +values[1];

        // Verify that the numbers aren't NaN
        if (isNaN(number_of_dice) || isNaN(die_size)){
            message.channel.send("Do not waste my time with your foolish commands");
            return;
        }

        // Remove any decimals if a float was passed
        number_of_dice = Math.floor(number_of_dice);
        die_size = Math.floor(die_size);

        // Perform the rolls
        var results = new Array();
        var roll = 0;
        var total = 0;
        for (var i = 0; i < number_of_dice; i++){
            roll = Math.floor(Math.random() * die_size) + 1;
            results.push(roll);
            total += roll;
        }

        // Send the individual results and the total, bolding the total
        message.channel.send(results + " = **" + total + "**");
    }
}