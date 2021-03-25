import { modifier } from 'ember-modifier';
import installModifier from 'ember-validity-modifier/utils/install-modifier';
import { validate } from 'ember-validity-modifier/utils/validate';

export default modifier(function validityReactive(element) {
  const onUninstall = installModifier(...arguments);
  validate(element);
  return onUninstall;
});