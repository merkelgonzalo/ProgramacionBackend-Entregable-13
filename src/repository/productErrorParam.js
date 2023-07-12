export const generateProductErrorParam = (pid) => {
    return `
    Product ID is invalid, must be an integer, but received: ${pid}
    `
}