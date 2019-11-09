let userName;

module.exports.getUserName = () => { 
    return this.userName 
}

module.exports.register = (userName) => {
    this.userName=userName;
    console.log(`${this.userName} registered successfully`);
    return true;
}