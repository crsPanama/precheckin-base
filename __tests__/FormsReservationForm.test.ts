import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ReservationForm from '../components/Forms/ReservationForm.vue';

describe('FormsReservationForm', async () => {
  test('"Cancelar" btn should emit and event called "cancel" and return the value of true', async () => {
    const wrapper = mount(ReservationForm);

    const cancelBtn = wrapper.get('[data-test="cancel-btn"]');

    await cancelBtn.trigger('click');
    const emmitedEvent = wrapper.emitted();

    expect(emmitedEvent).toHaveProperty('cancel');
    expect(emmitedEvent.cancel[0]).toEqual([true]);
  });
});
