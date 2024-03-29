import type { PrecheckinStatus } from './../types/precheckin.d';
import { type Alert } from '../types/types.d';
import { AlertTypes, ReservationStatus } from '../types/enums';

const DEFAULT_ALERT: Alert = {
  type: AlertTypes.NO_ALERT,
  message: '',
};

export const useAlert = () => {
  const { t } = useI18n();

  const alert = ref<Alert>(DEFAULT_ALERT);

  const setAlert = (alertValue: Alert) => {
    alert.value = alertValue;
  };

  const checkAlertType = (status: PrecheckinStatus) => {
    if (status === ReservationStatus.PAYED) {
      setAlert({
        type: AlertTypes.ALERT,
        message: t('home.alertMessages.payed'),
      });
      return;
    }
    if (status === ReservationStatus.CANCELED) {
      setAlert({
        type: AlertTypes.ERROR,
        message: t('home.alertMessages.canceled'),
      });
      return;
    }
  };

  const checkAlertIsActive = () => {
    return alert.value.type !== AlertTypes.NO_ALERT;
  };

  const flushAlert = (duration: number) => {
    setTimeout(() => {
      setAlert(DEFAULT_ALERT);
    }, duration);
  };

  return {
    alert,
    flushAlert,
    setAlert,
    checkAlertType,
    checkAlertIsActive,
  };
};
