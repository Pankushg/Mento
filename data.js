let userName;
let users;
let index;
let indexChat;
let chats

module.exports.getUserName = () => { 
    return this.userName 
}

module.exports.getUsers = () => { 
    if(this.users != undefined) {
        console.log(`${this.users.length-1} users found`);
        return {success : true, users : this.users };
    }
    else {
        console.log('No Users Found');
        return {success : false, msg : 'No Users registered'};
    }
}

module.exports.register = (userName) => {
    this.userName=userName;
    if(this.users==undefined) this.users=[{username:'User', index:0}]
    this.index = this.users.push({username : this.userName, index: this.users.length})-1;
    let count=0;
    for(let i=0;i<this.users.length;i++){
        if(this.users[i]==this.userName) count++;
        if(count>1) {
            duplicateUser = this.users.pop();
            console.log(`${duplicateUser} already present`);
            return {success: false, msg: 'User Already Registered'};
        } 
    }
    console.log(`${this.userName} registered successfully at index ${this.index}`);
    return {success: true, index: this.index};
}

module.exports.getChats = (id) => { 
    if(this.chats != undefined) {
        console.log(`${this.chats.length-1} users found`);
        return {success : true, users : this.chats };
    }
    else {
        console.log('No Chats Found');
        return {success : false, msg : 'No Chats found'};
    }
}