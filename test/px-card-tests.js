/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('px-card', () => {
  let cardEl;

  beforeEach((done) => {
    cardEl = fixture('DefaultCardFixture');
    flush(done);
  });

  it('shows the header text', () => {
    const headerTextEl = Polymer.dom(cardEl.root).querySelector('#headerText');
    expect(headerTextEl.innerText).to.match(/Sample header text/i);
  });

  it('shows the header icon', () => {
    const headerTextEl = Polymer.dom(cardEl.root).querySelector('#headerText');
    const iconEl = headerTextEl.querySelector('px-icon');
    expect(iconEl.icon).to.equal('px-nav:home');
  });

  it('distributes all px-icon elements with attribute `slot="actions"` in the actions slot', () => {
    const actions = Polymer.dom(cardEl).queryDistributedElements('px-icon');
    expect(actions.length).to.equal(3);
  });

  it('distributes the rest of its content in the default slot', () => {
    const child1 = Polymer.dom(cardEl).queryDistributedElements('#child1')[0];
    const child2 = Polymer.dom(cardEl).queryDistributedElements('#child2')[0];
    expect(child1).to.be.instanceOf(HTMLElement);
    expect(child2).to.be.instanceOf(HTMLElement);
  });
});


describe('px-card header behaviors', () => {
  let noHeaderTextCardEl;
  let hideHeaderCardEl;

  beforeEach((done) => {
    noHeaderTextCardEl = fixture('NoHeaderTextFixture');
    hideHeaderCardEl = fixture('HideHeaderFixture');
    flush(done);
  });

  it('shows the header when no header text is provided', () => {
    const headerEl = Polymer.dom(noHeaderTextCardEl.root).querySelector('header');
    expect(headerEl).to.be.instanceOf(HTMLElement);
  });

  it('hides the header when `hideHeader` is true', () => {
    const headerEl = Polymer.dom(hideHeaderCardEl.root).querySelector('header');
    expect(headerEl).to.be.null;
  });
});
