import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIService } from './AmplifyAPI.service';
import { signIn } from 'aws-amplify/auth';
import { Observable } from 'rxjs';
import { OnCreateTodoSubscription } from './API.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public title = 'angular-amplified-services';
  // private subscription: Observable<OnCreateTodoSubscription> | null = null;
  private api = new APIService();

  async ngOnInit() {
    this.api.OnCreateTodoListener().subscribe({
      next: (e) => console.log('next', e),
      // complete: e => console.log('complete',e),
      // error: console.log('Error')
    });
  }

  public async getData() {
    try {
      const result = await this.api.ListTodos();
      console.log(result);
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  public async createData() {
    try {
      const result = await this.api.CreateTodo({
        name: 'A todo' + Date.now(),
      });
      console.log('Created', result);
    } catch (e) {
      console.log('SOme error creating', e);
    }
  }

  public async signIn() {
    try {
      const user = await signIn({
        username: 'dkkiuna11@gmail.com',
        password: 'abcd1234',
      });

      console.log(user);
    } catch (error) {
      console.log('sign in error:', error);
    }
  }
}
