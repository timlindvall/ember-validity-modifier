import { modifier } from 'ember-modifier';
import installModifier from 'ember-validity-modifier/utils/install-modifier';

export default modifier(function validity() {
  const onUninstall = installModifier(...arguments);
  return onUninstall;
});
