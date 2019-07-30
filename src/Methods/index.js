//Categories
const findCategories = (data) => {

    let newData = {};
    data.forEach(meal => {
        if (meal.category in newData) {
            newData = { ...newData, [meal.category]: newData[meal.category] + 1 }
        }
        else {
            newData = { ...newData, [meal.category]: 1 }
        }
    })
    return newData;
}
//Filter data based on categories

const filterCategoryBasedData = (data, categories) => {
    return data.filter(meal => {
        if (Object.values(categories).every(data => data === false)) { //Check item is false then return rest one
            return true
        }
        else if (meal.category in categories && categories[meal.category]) { //Check if filter is true
            return true;
        }

        return false;
    })
}
//Price low to high or vice versa
const filterPrice = (data, type) => {
    if (type === "lowToHigh") {
        return data.sort((a, b) => a.price - b.price)
    }
    if (type === "highToLow") {
        return data.sort((a, b) => b.price - a.price)
    }
}

//Calculation
const calculation = (data) => {
    let qty = Object.keys(data).length;
    let totalPrice = 0;
    for (let i in data) {

        let { qty, price, discounts } = data[i];
        totalPrice = (totalPrice + Number(qty) * price) - (discounts ? Number(qty) * discounts : 0)

    }
    return { qty, totalPrice }
}

export {
    findCategories,
    filterCategoryBasedData,
    filterPrice,
    calculation,
}