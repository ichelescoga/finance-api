const convertArrayInObject = (data = [], principalKey = "", principalValue) => {
    const convertedObject = {};

    data.forEach(item => {
        const key = item["dataValues"][principalKey].toLowerCase().replaceAll(" ", "");
        const value = item[principalValue];
        convertedObject[key] = value;
    });

    return convertedObject;
}

module.exports = {
    convertArrayInObject
}