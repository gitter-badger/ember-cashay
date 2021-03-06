import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import connect from 'ember-redux/components/connect';
import { cashay } from 'cashay';

const { Component, Logger } = Ember;

const projectQuery = `
  {
    project (id: $project_id) @live {
      id
      name
      projectTodos @live {
        id
        createdAt
        description
      }
    }
  }
`;

const stateToComputed = (state, attrs) => {
  Logger.debug(`Recomputing project detail stateToComputed for id: ${attrs.project_id}`);
  const { data: { project } } = cashay.query(projectQuery, {
    op: 'ProjectDetail',
    key: attrs.project_id,
    mutationHandlers: {
      updateProject(optimisticVariables, queryResponse, currentResponse) {
        Logger.debug('ProjectDetail updateProject mutation handler firing');
        if (optimisticVariables) {
          currentResponse.project = Object.assign({},
            currentResponse.project, optimisticVariables
          );
          return currentResponse;
        }
      }
    },
    variables: { project_id: attrs.project_id }
  });
  return { project };
};

const ProjectDetailComponent = Component.extend({
  layout: hbs`
    <h2 class="project-name">{{project.name}}</h2>

    {{edit-project-form project=project updateProject=(action update)}}

    <h3>Todos</h3>
    <ul class="project-todos">
      {{#each project.projectTodos as |todo|}}
        <li class="todo">
          <p>{{todo.description}}</p>
          <div><small>{{todo.createdAt}}</small></div>
        </li>
      {{/each}}
    </ul>

    {{create-todo-form project=project}}
  `
});

export default connect(stateToComputed)(ProjectDetailComponent);
