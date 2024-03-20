import { Injectable } from '@angular/core';
import { GraphQLSubscription, generateClient } from 'aws-amplify/data';
import * as AmplifyTypes from './API.service';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

import { ObservableInput, Subscription } from 'rxjs';

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
    return client.graphql({
      query: subscriptions.onCreateTodo,
      variables: {
        filter: filter ? filter : null,
        owner: owner ? owner : null,
      },
    });
  }

  OnUpdateTodoListener(
    filter?: AmplifyTypes.ModelSubscriptionTodoFilterInput,
    owner?: string
  ) {
    return client.graphql({
      query: subscriptions.onUpdateTodo,
      variables: {
        filter: filter ? filter : null,
        owner: owner ? owner : null,
      },
    });
  }

  OnDeleteTodoListener(
    filter?: AmplifyTypes.ModelSubscriptionTodoFilterInput,
    owner?: string
  ) {
    return client.graphql({
      query: subscriptions.onDeleteTodo,
      variables: {
        filter: filter ? filter : null,
        owner: owner ? owner : null,
      },
    });
  }
}
