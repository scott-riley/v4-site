export const desktopState = $state({
	showMusic: false,
	miniPlayer: false
});

let topZ = $state(10);

export function getNextZ() {
	topZ += 1;
	console.log('NEW Z', topZ);
	return topZ;
}
