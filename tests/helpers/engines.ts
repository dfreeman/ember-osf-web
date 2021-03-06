import EngineInstance from '@ember/engine/instance';
import engineResolverFor from 'ember-engines/test-support/engine-resolver-for';
import { setupApplicationTest, setupRenderingTest, setupTest } from 'ember-qunit';
import { TestContext } from 'ember-test-helpers';

export function setupEngineTest(hooks: any, engine: string) {
    setupTest(hooks, { resolver: engineResolverFor(engine) });
}

export function setupEngineRenderingTest(hooks: any, engine: string) {
    setupRenderingTest(hooks, { resolver: engineResolverFor(engine) });
}

export function setupEngineApplicationTest(hooks: any, engine: string, mountPoint?: string) {
    setupApplicationTest(hooks);
    hooks.beforeEach(async function(this: TestContext) {
        // Engine construction happens in/on the router of the application
        // Engines use the application registry as a fallback, which means
        // any mocked services, etc that are injected won't get picked up.
        const router = this.owner.lookup('router:main');

        // Idempotent router setup, would otherwise be triggered by calling `visit()`
        router.setupRouter();

        // Create the engine instance using the engineInfo loaded by calling `setupRouter`
        const instance: EngineInstance = await router._loadEngineInstance(
            router._engineInfoByRoute[mountPoint || engine],
        );

        // Boot the engine up, to mitigte potential race conditions
        await instance.boot();

        // Add the engine to the application registry for later use
        this.owner.register(
            `-engine-instance:${engine}-${mountPoint || engine}`,
            instance,
            { instantiate: false },
        );
    });
}
