export class Utils {
    static random(from, to) {
        return Math.floor(Math.random() * (to - from)) + from;
    }
    static currentDateString() {
        const date = new Date();
        const currentDateString = date.toLocaleDateString("he-IL", {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            fractionalSecondDigits: 3,
        });
        return currentDateString;
    }
    static bubbleSort(arr) {
        //bubble sort
        let numbers = [10, 2, 5, 1];
        for (let j = 0; j < numbers.length; j++) {
            for (let i = 0; i < numbers.length - 1 - j; i++) {
                if (numbers[i] > numbers[i + 1]) {
                    let temp = numbers[i];
                    numbers[i] = numbers[i + 1];
                    numbers[i + 1] = temp;
                }
            }
        }
    }
}
