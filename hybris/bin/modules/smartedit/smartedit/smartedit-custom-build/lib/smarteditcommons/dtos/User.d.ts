/**
 * @ngdoc object
 * @name User.object:User
 * @description
 * An object containing information about a user in SmartEdit.
 */
export interface User {
    uid: string;
    displayName: string;
    readableLanguages: string[];
    writeableLanguages: string[];
}
