module.exports = {
    name: 'roll',
    description: "rolls dice",
    execute(message, args){
        // Take the first argument which should be of the form #d#
        const command = args.shift();
        // Split into an array of before and after the d
        const values = command.split("d");

        // Convert strings into numbers (absolute value if a negative is passed)
        var number_of_dice = Math.abs(+values[0]);
        var die_size = Math.abs(+values[1]);

        // If no number of dice is given, assume it is a single roll
        if (number_of_dice == 0) {
            number_of_dice = 1;
        }

        // Verify that the results aren't Not a Number
        if (isNaN(number_of_dice) || isNaN(die_size)){
            throw "The concept of numbers seems beyond you...I am not surprised";
            return;
        }

        // Remove any decimals if a float was passed
        number_of_dice = Math.floor(number_of_dice);
        die_size = Math.floor(die_size);

        // Perform the rolls
        var results = new Array();
        var minus = 0;
        var roll = 0;
        var total = 0;
        for (var i = 0; i < number_of_dice; i++){
            minus = Math.floor(Math.random() * die_size);   // Gets a value between 0 and (die_size - 1) (inclusive)
            roll = die_size - minus;                        // die_size - minus to be inclusive of die_size of 0
            results.push(roll);
            total += roll;
        }

        // Send the individual results and the total, bolding the total
        message.channel.send(results + " = **" + total + "**");
    }
}