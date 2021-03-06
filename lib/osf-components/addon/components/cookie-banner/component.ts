import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import Component from '@ember/component';
import Cookies from 'ember-cookies/services/cookies';
import config from 'ember-get-config';
import Session from 'ember-simple-auth/services/session';
import moment from 'moment';

import styles from './styles';
import layout from './template';

const {
    OSF: {
        cookies: {
            cookieConsent: consentCookie,
        },
    },
} = config;

export default class CookieBanner extends Component {
    @service cookies!: Cookies;
    @service session!: Session;

    layout = layout;
    styles = styles;

    showBanner = !this.session.isAuthenticated && !this.cookies.exists(consentCookie);

    @action
    accept(this: CookieBanner) {
        this.cookies.write(consentCookie, 1, {
            expires: moment().add(10, 'years').toDate(),
            path: '/',
        });
        this.set('showBanner', false);
    }
}
