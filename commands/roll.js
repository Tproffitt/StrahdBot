module.exports = {
    name: 'roll',
    description: "rolls dice",
    call: "!roll or !r",
    arguments: "",
    execute(message, args){
        var total = 0;              // total: holds the running total of all rolls
        var results = new String(); // results: holds the string built from the roll results

        var op = null;              // op: holds the operator passed to an argument, null otherwise
        var curr_total = 0;         // curr_total: hold the total of the iteration's roll results

        var first = true;           // first: flag inticating if this is the first argument
        var roll_needed = true;     // roll_needed: flag inticating if makeRoll needs to be called

        // Repeat until all arguments have been handled
        while (command = args.shift()){
            if (!first && op == null){  // operators can't be accepted as a first argument or following another operator
                if (command == "+"){
                    op = '+';
                    continue;
                } else if (command == "-"){
                    op = '-';
                    continue;
                } else if (command == "*"){
                    op = '*';
                    continue;
                } else if (command == "/"){
                    op = '/';
                    continue;
                } else {                // if it's not first, the previous arg wasn't an operator (op == null), and the argument isn't an operator,
                    break;              // then the input is two consecutive args of the form (#d# or #) which is invalid
                }
            }

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
            if (isNaN(number_of_dice) && isNaN(die_size)){
                if (first){
                    throw "The concept of numbers seems beyond you...I am not surprised";
                    return;
                } else {
                    break;      // if an argument other than the first is bad, stop reading arguments and return the result up to that point
                }
            } else if (!isNaN(number_of_dice) && isNaN(die_size)){      // If only a number is passed, return that number: !r 2 => 2
                //total += number_of_dice;
                //results += number_of_dice;
                output = number_of_dice;
                curr_total = number_of_dice;
                roll_needed = false;
            }

            if (roll_needed){
                // Remove any decimals if a float was passed
                number_of_dice = Math.floor(number_of_dice);
                die_size = Math.floor(die_size);

                // Perform the rolls
                output = this.makeRoll(number_of_dice, die_size);

                if (op != null){
                    results += ' ' + op + ' [' + output + ']';
                } else {
                    results += '[' + output + ']';
                }

                while (roll = output.shift()){
                    curr_total += roll;
                }

            } else {
                if (op != null){
                    results += ' ' + op + ' ' + output;
                } else {
                    results += output;
                }
            }

            switch(op){
                case '-':
                    total -= curr_total;
                    break;
                case '*':
                    total *= curr_total;
                    break;
                case '/':
                    total /= curr_total;
                    break;
                case '+':
                default:
                    total += curr_total;
            }

            // Reset flags and curr_total for subsequent iterations
            first = false;
            roll_needed = true;
            op = null;
            curr_total = 0;
        }

        // Send the individual results and the total, bolding the total
        message.channel.send(results + "\n**" + total + "**");
    },
    makeRoll(number_of_dice, die_size){
        var rolls = new Array();
        var minus = 0;
        var roll = 0;

        for (var i = 0; i < number_of_dice; i++){
            minus = Math.floor(Math.random() * die_size);   // Gets a value between 0 and (die_size - 1) (inclusive)
            roll = die_size - minus;                        // die_size - minus to be inclusive of die_size of 0
            rolls.push(roll);
        }

        return rolls;
    }
}