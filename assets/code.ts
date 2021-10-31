const addButton = <HTMLButtonElement>document.querySelector(".addButton");
// can either use the <> to typecast like above, or 'as' like below
var input = document.querySelector(".input") as HTMLInputElement;
const container = <HTMLDivElement>document.querySelector(".container");
class item {
	constructor(itemName: string) {
		this.createDiv(itemName);
	}
	createDiv(itemName: string) {
		let item = document.createElement("input");
		item.value = itemName;
		item.disabled = true;
		item.classList.add("item_input");
		item.type = "text";

		let itemBox = document.createElement("div");
		itemBox.classList.add("item");

		let editButton = document.createElement("button");
		editButton.innerHTML = "EDIT";
		editButton.classList.add("editButton");

		let removeButton = document.createElement("button");
		removeButton.innerHTML = "REMOVE";
		removeButton.classList.add("removeButton");

		container.appendChild(itemBox);

		itemBox.appendChild(item);
		itemBox.appendChild(editButton);
		itemBox.appendChild(removeButton);

		editButton.addEventListener("click", () => this.edit(item));

		removeButton.addEventListener("click", () =>
			this.remove(itemBox, item.value)
		);
	}

	async edit(input: HTMLInputElement) {
		const newInput = prompt("Enter new msg:", input.value);
		if (newInput === null) {
			return;
		}
		input.value = newInput;
		await fetch(`/api/modify`, {
			method: "POST",
			body: JSON.stringify({ old: input, new: newInput }),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async remove(item: HTMLDivElement, value: string) {
		container.removeChild(item);
		await fetch(`/api/delete`, {
			method: "POST",
			body: JSON.stringify({ record: value }),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}

async function check() {
	if (input.value != "") {
		new item(input.value);

		await fetch(`/api/create`, {
			method: "POST",
			body: JSON.stringify({ record: input.value }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		input.value = "";
	}
}

async function boot() {
	const records = await fetch(`/api/get`).then((t) => t.json());
	records.forEach(({ record }: { record: string }) => {
		new item(record);
	});
}
boot();

addButton.addEventListener("click", check);

window.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		check();
	}
});
