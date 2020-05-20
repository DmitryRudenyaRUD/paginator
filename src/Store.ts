import { observable, action, decorate, computed } from "mobx";

export const C = {
    border: 3.188,
    margin: 8,
    padding: 16,
    body: 28.031,
    word: 12,
    FORWARD: 'FORWARD',
    BACKWARD: 'BACKWARD'
};

export class Store {
    list = [
        { id: 1, name: 'ALL', selected: true },
        { id: 2, name: 'NEW', selected: false },
        { id: 3, name: 'POPULAR', selected: false },
        { id: 4, name: 'KENO', selected: false },
        { id: 5, name: 'TABLE', selected: false },
        { id: 6, name: 'LOTTERY', selected: false },
        { id: 7, name: 'NOVOMATIC', selected: false },
        { id: 8, name: 'NETENT', selected: false },
        { id: 9, name: 'PLAYTECH', selected: false },
        { id: 10, name: 'ARISTOCRAT', selected: false },
        { id: 11, name: 'EGT', selected: false },
        { id: 12, name: 'IGT', selected: false },
    ];

    set setList(list: { id: number; name: string; selected: boolean }[]) {
        this.list = list
    }

    resize() {
        this.list = this.list.concat()
    }

    select(target: string) {
        const list = this.list.concat();
        list.forEach(item => item.selected = target === item.name);
        //this.setList = list
    }

    toggle(orientation: string) {
        const list = this.list.concat();
        let idSelected = list.find(i => i.selected)!.id;

        switch(orientation) {
            case C.FORWARD:
                idSelected = idSelected === list.length ? 1 : ++idSelected;
                list.forEach(item => item.selected = item.id === idSelected);
                break;
            case C.BACKWARD:
                idSelected = idSelected === 1 ? list.length : --idSelected;
                list.forEach(item => item.selected = item.id === idSelected);
                break
        }
       this.setList = list
    }

    get view() {
        const list = this.list.slice();
        const toggle: number = C.body + C.border * 2 + C.padding * 2;
        const widthArea: number = window.innerWidth / 2 -  toggle * 2;
        const containerForItem: number = (C.margin + C.padding + C.border) * 2;
        const idSelected = list.find(i => i.selected)!.id;
        for (let k = 12; k > 0; k--) {
            const size = list.reduce((result, item) => {
                result += item.name.length * C.word + containerForItem;
                return result
            }, 0);

            const isFits = size < widthArea;
            if (isFits || list.length === 1) {
                break
            } else if (list.length <= idSelected) {
                list.shift()
            } else { list.pop() }
        }
        return list
    }
}

decorate(Store, {
    list: observable,
    select: action,
    toggle:action,
    view: computed,
    setList: action
});

