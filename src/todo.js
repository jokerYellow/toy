const key = {
    focus: "com.pipasese.focus",
    items: "com.pipasese.focus.items"
}

function TodoManager() {
    this.items = JSON.parse(localStorage.getItem(key.items)) ?? []
    this.add = function (item) {
        this.items = [item, ...this.items]
        localStorage.setItem(key.items, JSON.stringify(this.items))
    }
    this.refresh = null
}

const todoManager = new TodoManager()

export {todoManager}