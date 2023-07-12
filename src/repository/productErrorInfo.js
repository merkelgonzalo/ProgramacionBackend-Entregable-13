export const generateProductErrorInfo = (product) =>{
    return `
    Some fields for create a product are invalid:
    List of required fields:
    title: Must be a string, but received ${product.title}
    price: Must be a number, but received ${product.price}
    code: Must be a string, but received ${product.code}
    category: Must be a string, but received ${product.category}
    `
}