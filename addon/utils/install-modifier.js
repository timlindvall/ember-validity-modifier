import { validate, registerValidatable } from 'ember-validity-modifier/utils/validate';

const commaSeperate = s => s.split(',').map(i => i.trim()).filter(Boolean);
const reduceValidators = async (validators, ...args) => {
  let errors = await Promise.all(validators.map(validator => validator(...args)));
  return errors.reduce((a, b) => [...a, ...b], []);
};

/**
 * Common code for validity modifiers. Handles attaching auto-validation events based
 * on the list of events named in the `on` argument, responds to the validate event by
 * invoking validators, and fires the custom `validated` event afterwards.
 *
 * @param {HTMLElement} element - The element the modifier is being installed on.
 * @param {Function[]} validators - Array of validation functions to invoke.
 * @param {Object} args - Incoming named arguments. The only named arg is `on`.
 * @returns Function to invoke when uninstalling the modifier.
 */
export default function installModifier(
  element,
  validators,
  { on: eventNames = 'change,input,blur' }
) {
  let autoValidationEvents = commaSeperate(eventNames);
  let autoValidationHandler = () => validate(element);
  let validateHandler = async () => {
    let [error = ''] = await reduceValidators(validators, element);
    element.checkValidity();
    element.setCustomValidity(error);
    element.dispatchEvent(new CustomEvent('validated'));
  };

  element.addEventListener('validate', validateHandler);
  autoValidationEvents.forEach(eventName => {
    element.addEventListener(eventName, autoValidationHandler);
  });
  registerValidatable(element);

  return () => {
    element.removeEventListener('validate', validateHandler);
    autoValidationEvents.forEach(eventName => {
      element.removeEventListener(eventName, autoValidationHandler);
    });
  };
}
