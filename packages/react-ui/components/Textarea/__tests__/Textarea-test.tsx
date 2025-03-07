import React from 'react';
import { mount } from 'enzyme';

import { Textarea } from '../Textarea';
import { buildMountAttachTarget, getAttachedTarget } from '../../../lib/__tests__/testUtils';

describe('Textarea', () => {
  buildMountAttachTarget();
  afterEach(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });

  it('render without crash', () => {
    const wrapper = mount<Textarea>(<Textarea />);

    expect(wrapper).toHaveLength(1);
  });

  it('setSelectionRange works', () => {
    const wrapper = mount<Textarea>(<Textarea value={'text here'} />, { attachTo: getAttachedTarget() });
    const SELECTION_START = 0;
    const SELECTION_END = 4;

    wrapper.instance().setSelectionRange(SELECTION_START, SELECTION_END);

    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(SELECTION_START);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(SELECTION_END);
  });

  it('selectAll works by method', () => {
    const VALUE = 'Text for test';
    const wrapper = mount<Textarea>(<Textarea value={VALUE} />, { attachTo: getAttachedTarget() });

    wrapper.instance().selectAll();

    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(VALUE.length);
  });

  it('selectAllOnFocus prop works', () => {
    const VALUE = 'selectAllOnFocus prop works';
    const wrapper = mount<Textarea>(<Textarea value={VALUE} selectAllOnFocus />, { attachTo: getAttachedTarget() });

    wrapper.find('textarea').simulate('focus');

    expect((document.activeElement as HTMLTextAreaElement).selectionStart).toBe(0);
    expect((document.activeElement as HTMLTextAreaElement).selectionEnd).toBe(VALUE.length);
  });

  it('manual focus', () => {
    const wrapper = mount<Textarea>(<Textarea />, { attachTo: getAttachedTarget() });

    expect(document.activeElement).toBeInstanceOf(HTMLBodyElement);

    wrapper.instance().focus();

    expect(wrapper.find('textarea').instance()).toHaveFocus();
  });
});
