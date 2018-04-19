export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string = "Гость";


}
export class currentUser {
    user: User;
    isAdmin: boolean = false;
    isModerator: boolean = false;
    isUser: boolean = false;
}