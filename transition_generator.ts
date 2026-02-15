const MAX_HEIGHT = 554
const MAX_WIDTH = 2842
const BOX_PER_MAX_HEIGHT = 3
const HEIGHT = MAX_HEIGHT / BOX_PER_MAX_HEIGHT
const WIDTH = HEIGHT
const BOX_PER_MAX_WIDTH = Math.ceil(MAX_WIDTH / WIDTH)

function create_rect(x: number, y: number, animation: string): string {
	return `<rect fill="white" x="${x}" y="${y}" width="0" height="${HEIGHT}">${animation}</rect>`
}

/**
 * Index = rowIndex + colIndex
 * Calculates the value for a specific index in the master sequence.
 * Logic:
 * - Index 0 -> 1
 * - Odd indices -> index + 2
 * - Even indices -> index
 */
function get_cell(rowIndex: number, colIndex: number): number {
	const i = rowIndex + colIndex
	if (i === 0) {
		return 1
	}

	return i % 2 !== 0? i + 2 : i
}

// 1,3,2,5,4,7,6
// 3,2,5,4,7,6,9
// 2,5,4,7,6,9,8
// first (small) => last (big)
function generate_transition(): void {
	const rects: string[] = []
	for (let i = 0; i < BOX_PER_MAX_HEIGHT; i++) {
		for (let j = 0; j < BOX_PER_MAX_WIDTH; j++) {
			const v = get_cell(i, j)
			const duration = BOX_PER_MAX_WIDTH * 0.005
			const begin = v * (duration / 2)
			const animation = [
				`<animate attributeName="width" dur="${begin + duration}s" values="${WIDTH};${WIDTH}"/>`,
				`<animate attributeName="opacity" begin="${begin}s" dur="${duration}s" values="1;0"/>`
			].join('')
			const x = j * WIDTH
			const y = i * HEIGHT
			rects.push(create_rect(x, y, animation))
		}
	}

	console.log(rects.join(""))
}

generate_transition()
