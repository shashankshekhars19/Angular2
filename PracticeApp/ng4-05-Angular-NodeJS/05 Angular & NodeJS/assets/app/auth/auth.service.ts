import { User } from "./user.model";
import { Http , Headers ,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
 
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService{

    constructor(private http : Http ){

    }
    signup(user : User){
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type' : 'application/json'})
        return this.http.post('/user' , body , {headers : headers})
            .map((response : Response ) => response.json())
            .catch((error : Response ) => Observable.throw(error.json()))
    }

    signin(user : User){
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type' : 'application/json'})
        return this.http.post('/user/signin' , body , {headers : headers})
            .map((response : Response ) => response.json())
            .catch((error : Response ) => Observable.throw(error.json()))
    }
}