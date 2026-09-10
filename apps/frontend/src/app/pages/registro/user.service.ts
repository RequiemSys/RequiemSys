import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {
    private http = inject(HttpClient);

    registerUser(data: any) {
        return this.http.post('http://localhost:8000/api/usuarios', data);
    }
}
