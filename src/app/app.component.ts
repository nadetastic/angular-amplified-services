import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIService } from './API.service';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-amplified-services';

  api = new APIService();

  public async getData() {
    try {
      const result = await this.api.ListTodos();
      console.log(result);
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  public async signIn() {
    try {
      const user = await Auth.signIn({
        username: 'dkkiuna11@gmail.com',
        password: 'abcd1234',
      });

      console.log(user);
    } catch (error) {
      console.log('sign in error:', error);
    }
  }
}
