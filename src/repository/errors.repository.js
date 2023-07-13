export class ErrorRepository{

    constructor(){}

    customError({ name="Error", cause, message, errorCode }){
        const error = new Error(message, { cause });
        error.name = name;
        error.code = errorCode;
        console.log("error", error.cause)
        throw error;
    }

    generateProductErrorInfo = (product) =>{
        return `
        Some fields for create/update a product are invalid:
        List of required fields:
        title: Must be a string, but received ${product.title}
        price: Must be a number, but received ${product.price}
        code: Must be a string, but received ${product.code}
        category: Must be a string, but received ${product.category}
        `
    }

    generateProductErrorParam = (pid) => {
        return `
        Product ID is invalid, must be an integer and an existing ID, but received: ${pid}
        `
    }

    generateCartErrorParam = (cid) => {
        return `
        Cart ID is invalid, must be an integer and an existing ID, but received: ${cid}
        `
    }

    generateCartProductErrorParam = (cid, pid) => {
        let result = this.generateCartErrorParam(cid);
        result = result + this.generateProductErrorParam(pid);
        return result
    }


}
