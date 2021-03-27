import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked matchTo = 'foo';

  @action
  validateMatch(match, { value }) {
    return value === match ? [] : ['Must match exactly'];
  }

  @action
  updateMatch({ target }) {
    this.matchTo = target.value;
  }
}
