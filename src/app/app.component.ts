import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmplifyAPIService } from './AmplifyAPI.service';
import { signIn } from 'aws-amplify/auth';
import { Observable, Subscription, filter } from 'rxjs';
// import { OnCreateTodoSubscription } from './API.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'angular-amplified-services';
  // private subscription
  private createsub: Subscription | null = null;
  private api = new AmplifyAPIService();

  ngOnInit() {
    this.createsub = this.api.OnCreateTodoListener().subscribe({
      next: (data) => {
        console.log('next', data.data.onCreateTodo);
      },
      complete: () => console.log('Done'),
      error: (e) => {
        console.log('Error', e), this.createsub?.unsubscribe();
      },
    });
  }

  ngOnDestroy() {
    if (this.createsub) {
      this.createsub.unsubscribe();
    }
    this.createsub = null;
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
