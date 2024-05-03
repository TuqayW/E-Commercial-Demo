const loadListFromStorage = () => {
    const storedList = localStorage.getItem('globalList');
    return storedList ? JSON.parse(storedList) : [];
};

let globalList = loadListFromStorage();

const saveListToStorage = () => {
    localStorage.setItem('globalList', JSON.stringify(globalList));
};

export const addItem = (item) => {
    const existingItem = globalList.find((listItem) => listItem.id === item);

    if (existingItem) {
        existingItem.times++;
    } else {
        globalList.push({ id: item, times: 1 });
    }

    saveListToStorage();
};

export const removeItem = (index) => {
    if (index >= 0 && index < globalList.length) {
        globalList.splice(index, 1);
        saveListToStorage();
    }
};

export const clearList = () => {
    globalList = [];
    localStorage.removeItem('globalList');
};

export const getList = () => {
    return globalList;
};
