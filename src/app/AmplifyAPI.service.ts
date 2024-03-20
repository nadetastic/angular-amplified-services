import { Injectable } from '@angular/core';
import { GraphQLSubscription, generateClient } from 'aws-amplify/data';
import * as AmplifyTypes from './API.service';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

import { ObservableInput } from 'rxjs';

const client = generateClient();

@Injectable({
  providedIn: 'root',
})
export class AmplifyAPIService {
  async CreateTodo(
    input: AmplifyTypes.CreateTodoInput, //CreateTodoInput,
    condition?: AmplifyTypes.ModelTodoConditionInput
  ): Promise<AmplifyTypes.CreateTodoMutation> {
    const result = await client.graphql({
      query: mutations.createTodo,
      variables: {
        input: input,
        condition: condition ? condition : null,
      },
    });

    return result.data;
  }

  async UpdateTodo(
    input: AmplifyTypes.UpdateTodoInput,
    condition?: AmplifyTypes.ModelTodoConditionInput
  ): Promise<AmplifyTypes.UpdateTodoMutation> {
    const result = await client.graphql({
      query: mutations.updateTodo,
      variables: {
        input: input,
        condition: condition ? condition : null,
      },
    });
    return result.data;
  }
  async DeleteTodo(
    input: AmplifyTypes.DeleteTodoInput,
    condition?: AmplifyTypes.ModelTodoConditionInput
  ): Promise<AmplifyTypes.DeleteTodoMutation> {
    const result = await client.graphql({
      query: mutations.deleteTodo,
      variables: {
        input: input,
        condition: condition ? condition : null,
      },
    });
    return result.data;
  }

  async GetTodo(id: string): Promise<AmplifyTypes.GetTodoQuery> {
    const result = await client.graphql({
      query: queries.getTodo,
      variables: {
        id: id,
      },
    });
    return result.data;
  }
  async ListTodos(
    filter?: AmplifyTypes.ModelTodoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<AmplifyTypes.ListTodosQuery> {
    const result = await client.graphql({
      query: queries.listTodos,
      variables: {
        filter: filter ? filter : null,
        limit: limit ? limit : null,
        nextToken: nextToken ? nextToken : null,
      },
    });
    return result.data;
  }
  OnCreateTodoListener(
    filter?: AmplifyTypes.ModelSubscriptionTodoFilterInput,
    owner?: string
  ) {
    //ObservableInput<AmplifyTypes.OnCreateTodoSubscription> {
    return client.graphql({
      query: subscriptions.onCreateTodo,
      variables: {
        filter: filter ? filter : null,
        owner: owner ? owner : null,
      },
    }); //as Observable<AmplifyTypes.OnCreateTodoSubscription>;
    // .subscribe({
    //   next: (event: any) => {
    //     console.log('event', event);
    //   },
    //   complete: () => console.log('complete', event),
    // });
  }

  // OnUpdateTodoListener(
  //   filter?: ModelSubscriptionTodoFilterInput,
  //   owner?: string
  // ): Observable<
  //   SubscriptionResponse<Pick<__SubscriptionContainer, 'onUpdateTodo'>>
  // > {
  //   const statement = `subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput, $owner: String) {
  //       onUpdateTodo(filter: $filter, owner: $owner) {
  //         __typename
  //         id
  //         name
  //         description
  //         createdAt
  //         updatedAt
  //         owner
  //       }
  //     }`;
  //   const gqlAPIServiceArguments: any = {};
  //   if (filter) {
  //     gqlAPIServiceArguments.filter = filter;
  //   }
  //   if (owner) {
  //     gqlAPIServiceArguments.owner = owner;
  //   }
  //   return API.graphql(
  //     graphqlOperation(statement, gqlAPIServiceArguments)
  //   ) as Observable<
  //     SubscriptionResponse<Pick<__SubscriptionContainer, 'onUpdateTodo'>>
  //   >;
  // }

  // OnDeleteTodoListener(
  //   filter?: ModelSubscriptionTodoFilterInput,
  //   owner?: string
  // ): Observable<
  //   SubscriptionResponse<Pick<__SubscriptionContainer, 'onDeleteTodo'>>
  // > {
  //   const statement = `subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput, $owner: String) {
  //       onDeleteTodo(filter: $filter, owner: $owner) {
  //         __typename
  //         id
  //         name
  //         description
  //         createdAt
  //         updatedAt
  //         owner
  //       }
  //     }`;
  //   const gqlAPIServiceArguments: any = {};
  //   if (filter) {
  //     gqlAPIServiceArguments.filter = filter;
  //   }
  //   if (owner) {
  //     gqlAPIServiceArguments.owner = owner;
  //   }
  //   return API.graphql(
  //     graphqlOperation(statement, gqlAPIServiceArguments)
  //   ) as Observable<
  //     SubscriptionResponse<Pick<__SubscriptionContainer, 'onDeleteTodo'>>
  //   >;
  // }
}
