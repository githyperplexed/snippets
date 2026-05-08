class DeckStore {
	selected = $state<Set<number>>(new Set())
	order = $state<number[]>([])

	isSelected(index: number) {
		return this.selected.has(index)
	}

	add(index: number) {
		if (this.selected.has(index)) return
		this.selected.add(index)
		this.selected = new Set(this.selected)
		this.order = [index, ...this.order]
	}

	remove(index: number) {
		if (!this.selected.has(index)) return
		this.selected.delete(index)
		this.selected = new Set(this.selected)
		this.order = this.order.filter(i => i !== index)
	}
}

export const deck = new DeckStore()
