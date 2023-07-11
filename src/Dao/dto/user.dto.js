export class CreateUserDto {
    constructor(user){}
}
export class GetUserDto{
    constructor(userDB){
        this.name = userDB.name;
        this.email = userDB.email.replace(/^(.)(.*)(@.*)$/, function(match, initial, secret, domain) {
            return initial + '*'.repeat(10) + domain;
        });
        this.age = userDB.age;
        this.role = userDB.role;
        this.cart = userDB.cart;
    }
}