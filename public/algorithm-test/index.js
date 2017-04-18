// longest increase sequence
// 5, 3, 4, 8, 6
// 5, 6, 3, 4, 8, 6
function lis (arr) {
	var d = []
	let len = 1;
	let target = [];
	for (let i = 0; i < arr.length; i++) {
		d[i] = [arr[i]];
		for (let j = i - 1; j >= 0; j--) {
			if (d[j][0] <= d[i] && j < i) {
				d[j].forEach(item => {
					d[i].push(item)
				})
				break;
			}
		}
		if (d[i].length > len) {
			len = d[i].length;
			target = d[i]
		}
	}
	return target.reverse();
}

lis([5, 3, 4, 8, 6])