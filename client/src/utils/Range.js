export default function range(start, end) {
    let result = [];

    if (start > end) {
        for (let i = start; i >= end; i--) {
            result.push(i);
        }
    }
    else {
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
    }

    return result;
}