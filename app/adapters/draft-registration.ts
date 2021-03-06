import DS from 'ember-data';

import OsfAdapter from './osf-adapter';

export default class DraftRegistration extends OsfAdapter {
    urlForCreateRecord(_: string, snapshot: DS.Snapshot) {
        return snapshot.record.belongsTo('branchedFrom').value()
            .links.relationships.draft_registrations.links.related.href;
    }
}

declare module 'ember-data' {
    interface AdapterRegistry {
        'draft-registration': DraftRegistration;
    }
}
