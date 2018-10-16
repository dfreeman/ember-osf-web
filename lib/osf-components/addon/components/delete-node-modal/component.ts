import { computed } from '@ember-decorators/object';
import Component from '@ember/component';
import defaultTo from 'ember-osf-web/utils/default-to';
import randomScientist from 'ember-osf-web/utils/random-scientist';
import styles from './styles';
import layout from './template';

export default class DeleteNodeModal extends Component {
    layout = layout;
    styles = styles;

    nodeType: string = defaultTo(this.nodeType, 'project');
    scientistName: string = '';
    scientistInput: string = '';

    @computed('nodeType')
    get nodeTypeKey(): string {
        return `general.${this.nodeType}`;
    }

    didReceiveAttrs() {
        this.set('scientistInput', '');
        this.set('scientistName', randomScientist());
    }
}
