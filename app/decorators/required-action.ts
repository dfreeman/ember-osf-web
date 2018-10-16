import { assert } from '@ember/debug';

/**
 * Property decorator for required action arguments in components.
 * Provides a default action method that raises a useful error.
 *
 * Usage:
 *
 * ```ts
 *  import requiredAction from 'ember-osf-web/utils/required-action';
 *
 *  class MyComponent extends Component {
 *      // Required arguments
 *      @requiredAction doTheThing: (arg: number) => void;
 *  }
 * ```
 */
export default function requiredAction(
    classPrototype: any,
    propertyName: string,
    /* tslint:disable-next-line trailing-comma */
    ...additional: any[]
): any {
    const className = classPrototype.constructor.name;

    // TypeScript's decorator signature doesn't include the property initializer,
    // but Babel's actual implementation will overwrite a preexisting passed-in
    // value unless we set an initializer that defaults to that existing value.
    if (!additional[0].initializer) {
        // eslint-disable-next-line no-param-reassign
        additional[0].initializer = function() {
            return this[propertyName];
        };
    }

    // eslint-disable-next-line no-param-reassign
    classPrototype[propertyName] = () => {
        assert(`Missing required action in ${className}: ${propertyName}`);
    };
}
